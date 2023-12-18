<template>
  <div class="field-split-wrap">
    <a-form-model-item label="拆分字符"
                       prop="splitChar"
                       :rules="{
                          required: true,
                          message: '请输入',
                          trigger: 'change',
                        }">
      <a-input placeholder="请输入"
               v-model="form.splitChar"
               allowClear />
    </a-form-model-item>
    <a-form-model-item label="字段拆分">
      <a-row :key="item.id"
             type="flex"
             align="middle"
             v-for="item in fieldList">
        <div class="field-wrap"
             :style="{width: `${maxWidth}px`}">
          <a-tag color="green"
                 :data-code="item.codeName">
            {{item.codeName}}
          </a-tag>
        </div>
        <span class="char">=</span>
        <span class="char">数组</span>
        <span class="char">[</span>
        <a-input-number v-model="item.index"
                        placeholder="索引"
                        :min="0"
                        :max="fieldList.length - 1" />
        <span class="char">]</span>
      </a-row>
    </a-form-model-item>
  </div>
</template>

<script>
import { RIGHT_LINE_POINTS } from '../../utils/config'
import { uuid } from '../../utils/server'
export default {
  name: 'FieldSplitItem',
  inject: ['mapData'],
  props: {
    form: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      fieldList: [],
      maxWidth: 0,
    }
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function (newForm) {
        this.$set(newForm, 'splitFields', newForm?.splitFields || [])
        this.$set(newForm, 'splitChar', newForm?.splitChar || undefined)
        this.setField(newForm.splitFields)
      }
    },
    fields: {
      deep: true,
      handler: function () {
        this.setField(this.form.splitFields)
      }
    },
  },
  computed: {
    fields: function () {
      const mapNode = this.mapData.getMapData().selectLineMapNode
      return mapNode[RIGHT_LINE_POINTS]
    },
    maxLengthWidth: function () {
      let maxLength = 0
      for (const item of this.fields) {
        if (item.codeName.length >= maxLength) {
          maxLength = item.codeName.length
        }
      }
      return maxLength * 5
    }
  },
  methods: {
    setField (list = []) {
      this.fieldList = []
      if (list.length === 0) {
        this.fields.forEach((item, index) => {
          this.fieldList.push({
            id: uuid(),
            index: index,
            codeName: item.codeName
          })
        })
      } else {
        this.fieldList = list
      }
      // 获取字段元素最大宽度值
      this.$nextTick(() => {
        for (const item of this.fields) {
          const elem = document.querySelector(`[data-code=${item.codeName}]`).getBoundingClientRect()
          if (elem.width >= this.maxWidth) {
            this.maxWidth = elem.width
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.field-split-wrap {
  .field-wrap {
    display: flex;
    justify-content: end;
  }
  .char {
    display: inline-block;
    margin: 0 10px;
  }
}
</style>