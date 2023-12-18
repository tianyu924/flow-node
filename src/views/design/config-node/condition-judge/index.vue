<template>
  <div class="condition-judge-wrap">
    <!-- 条件判断组件 -->
    <a-modal v-model="visible"
             width="700px"
             title="条件判断"
             wrapClassName="condition-judge-modal"
             @cancel="onCancel"
             @ok="onOk">
      <div class="operate-top-wrap">
        <a-radio-group v-model="form.outerType"
                       @change="onChangeOuterType">
          <a-radio :value="item.value"
                   :key="item.value"
                   v-for="item in CONDITION_JUDGE_LIST">
            {{item.label}}
          </a-radio>
        </a-radio-group>
        <a-button type="primary"
                  style="margin-left: 20px;"
                  @click="onAddGroup">
          添加组
        </a-button>
      </div>
      <div class="scroll-wrap">
        <div class="group-wrap">
          <div :key="group.id"
               v-for="(group, index) in form.groupList">
            <div class="group-item">
              <div class="operate-top">
                <a-button type="primary"
                          style="margin-right: 30px;"
                          @click="onAddCondition(index)">
                  添加条件
                </a-button>
                <a-radio-group v-model="group.children[0].conditionType">
                  <a-radio :value="item.value"
                           :key="item.value"
                           v-for="item in CONDITION_JUDGE_LIST">
                    {{item.label}}
                  </a-radio>
                </a-radio-group>
              </div>
              <div class="condition-item-wrap">
                <div :key="child.id"
                     v-for="(child, childIndex) in group.children[0].children">
                  <div class="condition-item">
                    <a-tree-select v-model="child.code"
                                   :tree-data="treeData"
                                   placeholder="响应字段"
                                   allowClear
                                   class="condition-select-wrap">
                    </a-tree-select>
                    <a-input v-model="child.expression"
                             placeholder="EL表达式"
                             allowClear />
                    <a-icon type="minus-circle"
                            class="delete-icon"
                            @click="onDeleteCondition(childIndex, group.children[0].children, index)" />
                  </div>
                  <span class="divide"
                        v-if="!isEndDivide(childIndex, group.children[0].children.length - 1)">{{getType(group.children[0].conditionType)}}</span>
                </div>
              </div>
              <a-icon type="minus-circle"
                      class="delete-icon group"
                      @click="onDeleteGroup(index)" />
            </div>
            <span class="divide"
                  v-if="!isEndDivide(index, form.groupList.length - 1)">{{ getType(group.conditionType) }}</span>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { CONDITION_JUDGE_LIST } from '../../utils/config'
import { uuid } from '../../utils/server'
export default {
  name: 'ConditionJudge',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    treeData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      CONDITION_JUDGE_LIST: CONDITION_JUDGE_LIST,
      form: {
        outerType: 1,
        groupList: []
      },
      visible: false
    }
  },
  watch: {
    value: function (newVal) {
      this.visible = newVal
    }
  },
  computed: {
    // 是否最后一个分隔字符
    isEndDivide: function () {
      return (index, total) => {
        return index === total
      }
    },
    getType: function () {
      return (type) => {
        const conditionJudge = this.CONDITION_JUDGE_LIST.find(item => item.value === type)
        return conditionJudge ? conditionJudge.label : ''
      }
    }
  },
  methods: {
    onCancel () {
      this.$emit('input', false)
    },
    onOk () {

    },
    onDeleteGroup (index) {
      this.form.groupList.splice(index, 1)
    },
    onDeleteCondition (index, list, groupIndex) {
      list.splice(index, 1)
      if (list.length === 0) {
        this.onDeleteGroup(groupIndex)
      }
    },
    onAddCondition (index) {
      const group = this.form.groupList[index]
      group.children[0].children.push({
        id: uuid(),
        code: undefined,
        expression: undefined
      })
    },
    onAddGroup () {
      this.form.groupList.push({
        id: uuid(),
        conditionType: this.form.outerType,
        children: [{
          conditionType: 1,
          children: [{
            id: uuid(),
            code: undefined,
            expression: undefined
          }]
        }]
      })
    },
    onChangeOuterType () {
      for (const group of this.form.groupList) {
        this.$set(group, 'conditionType', this.form.outerType)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.condition-judge-modal {
  .operate-top-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 20px;
  }
  .delete-icon {
    color: #ff4d4f;
    cursor: pointer;
  }
  .divide {
    display: block;
    margin: 10px 0;
  }
  .group-item {
    position: relative;
    border-radius: 5px;
    border: 1px solid #ededed;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    .delete-icon.group {
      position: absolute;
      top: -9px;
      right: -9px;
      font-size: 18px;
      background-color: #fff;
    }
    .operate-top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
    }
    .condition-item-wrap {
      border-radius: 5px;
      border: 1px solid #ededed;
      padding: 10px 15px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
      .condition-select-wrap {
        width: 240px;
      }
      .condition-item {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  }
}
</style>