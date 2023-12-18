<template>
  <div class="translate-wrap">
    <a-form-model-item label="翻译">
      <div class="card-wrap">
        <div class="title">
          <div class="sub">元数据</div>
          <div class="sub">目标数据</div>
        </div>
        <div class="scroll-wrap">
          <a-row type="flex"
                 justify="center"
                 :key="item.id"
                 v-for="(item, index) in form.translates">
            <a-form-model-item :prop="`translates.${index}.metadataValue`"
                               class="input"
                               :rules="{
                          required: true,
                          message: '请输入',
                          trigger: 'blur',
                        }">
              <a-input placeholder="请输入"
                       allowClear
                       v-model="item.metadataValue" />
            </a-form-model-item>
            <div class="separator">=></div>
            <a-form-model-item :prop="`translates.${index}.targetValue`"
                               class="input"
                               style="margin-right: 8px;"
                               :rules="{
                          required: true,
                          message: '请输入',
                          trigger: 'blur',
                        }">
              <a-input placeholder="请输入"
                       allowClear
                       v-model="item.targetValue" />
            </a-form-model-item>
            <a-icon type="minus-circle"
                    @click="onDelete(index)"
                    class="delete-icon" />
          </a-row>
        </div>
        <a-row style="padding: 0 10px;">
          <a-button type="primary"
                    icon="plus"
                    @click="onAddItem"
                    block>
            添加数据项
          </a-button>
        </a-row>
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import { uuid } from '../../utils/server'
export default {
  name: 'TranslateItem',
  data () {
    return {
    }
  },
  props: {
    form: {
      type: Object,
      default: () => null
    }
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function (newForm) {
        this.$set(newForm, 'translates', newForm?.translates || [])
      }
    }
  },
  methods: {
    onAddItem () {
      this.form.translates.push({
        id: uuid(),
        targetValue: undefined,
        metadataValue: undefined
      })
    },
    onDelete (index) {
      this.form.translates.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.translate-wrap {
  .card-wrap {
    padding-bottom: 10px;
    border: 1px solid #e8e8e8;
    .title {
      display: flex;
      text-align: center;
      .sub {
        flex: 1;
      }
    }
    .scroll-wrap {
      padding: 0 10px;
    }
    .delete-icon {
      margin-top: 13px;
      cursor: pointer;
      color: #ff4d4f;
    }
    .separator {
      width: 60px;
      text-align: center;
    }
    .input {
      flex: 1;
    }
  }
}
</style>