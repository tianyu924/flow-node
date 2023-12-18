<template>
  <div class="binging-wrap">
    <a-form-model-item label="条件设置">
      <div class="scroll-wrap">
        <a-row :key="item.id"
               type="flex"
               v-for="(item, index) in form.conditions">
          <a-form-model-item :prop="`conditions.${index}.targetField`"
                             :rules="{
                          required: true,
                          message: '请选择',
                          trigger: 'change',
                        }">
            <a-tree-select v-model="item.targetField"
                           placeholder="目标字段"
                           :tree-data="targetTreeData"
                           allowClear
                           class="condition-select-wrap">
            </a-tree-select>
          </a-form-model-item>
          <a-form-model-item :prop="`conditions.${index}.condition`"
                             :rules="{
                          required: true,
                          message: '请选择',
                          trigger: 'change',
                        }">
            <a-select v-model="item.condition"
                      placeholder="条件"
                      allowClear
                      class="condition-select-wrap">
              <a-select-option :value="item.value"
                               :key="index"
                               v-for="(item, index) in CONDITION_TYPE_LIST">
                {{item.label}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item :prop="`conditions.${index}.metadataField`"
                             :rules="{
                          required: true,
                          message: '请选择',
                          trigger: 'change',
                        }">
            <a-tree-select v-model="item.metadataField"
                           :tree-data="metaTreeData"
                           placeholder="元数据字段"
                           allowClear
                           class="condition-select-wrap">
            </a-tree-select>
          </a-form-model-item>
          <a-icon type="minus-circle"
                  @click="onDelete(index)"
                  class="delete-icon" />
        </a-row>
      </div>
      <a-row>
        <a-button type="primary"
                  icon="plus"
                  @click="onAddCondition"
                  block>
          添加条件
        </a-button>
      </a-row>
    </a-form-model-item>
  </div>
</template>

<script>
import { CONDITION_TYPE_LIST } from '../../utils/config'
import { uuid } from '../../utils/server'
export default {
  name: 'BindingItem',
  inject: ['mapData'],
  data () {
    return {
      CONDITION_TYPE_LIST: CONDITION_TYPE_LIST,
    }
  },
  props: {
    form: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    targetTreeData: function () {
      return this.mapData.getMapData().rightTreeData
    },
    metaTreeData: function () {
      return this.mapData.getMapData().leftTreeData
    }
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function (newForm) {
        this.$set(newForm, 'conditions', newForm?.conditions || [])
      }
    }
  },
  methods: {
    onAddCondition () {
      this.form.conditions.push({
        id: uuid(),
        targetField: undefined,
        condition: undefined,
        metadataField: undefined
      })
    },
    onDelete (index) {
      this.form.conditions.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.binging-wrap {
  .condition-select-wrap {
    width: 130px;
    margin-right: 10px;
  }
  .delete-icon {
    margin-top: 13px;
    cursor: pointer;
    color: #ff4d4f;
  }
}
</style>