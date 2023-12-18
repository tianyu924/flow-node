<template>
  <div class="field-splice-wrap">
    <a-form-model-item label="字段拼接">
      <div class="flex-wrap scroll-wrap">
        <template v-for="item in fieldList">
          <a-input :key="item.key"
                   placeholder="连接字符"
                   class="input-wrap"
                   v-model="item.spliceChar"
                   allowClear />
          <a-select :key="item.key"
                    v-model="item.codeName"
                    class="input-wrap"
                    placeholder="请选择"
                    allowClear>
            <a-select-option :value="option.codeName"
                             :key="subIndex"
                             v-for="(option, subIndex) in optionalFields">
              {{option.codeName}}
            </a-select-option>
          </a-select>
        </template>
        <a-input placeholder="连接字符"
                 class="input-wrap"
                 v-model="endChar"
                 allowClear />
      </div>
    </a-form-model-item>
    <a-form-model-item label="效果预览">
      <a-tag color="green">
        {{targetFields.codeName}}
      </a-tag>
      =
      <template v-for="item in fieldList">
        <span :key="item.key"
              v-if="item.spliceChar">{{item.spliceChar}}</span>
        <a-tag :key="item.key"
               style="margin: 0 5px;"
               v-if="item.codeName"
               color="green">
          {{item.codeName}}
        </a-tag>
      </template>
      <span>{{endChar}}</span>
    </a-form-model-item>
  </div>
</template>

<script>
import { LEFT_LINE_POINTS, RIGHT_LINE_POINTS } from '../../utils/config'
import { uuid } from '../../utils/server'
export default {
  name: 'FieldSpliceItem',
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
      endChar: '',
    }
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function (newForm) {
        this.$set(newForm, 'spliceFields', newForm?.spliceFields || [])
        this.setField(newForm.spliceFields)
      }
    },
    fields: {
      deep: true,
      handler: function () {
        this.setField(this.form.spliceFields)
      }
    }
  },
  computed: {
    fields: function () {
      const mapNode = this.mapData.getMapData().selectLineMapNode
      return mapNode[LEFT_LINE_POINTS]
    },
    targetFields: function () {
      const mapNode = this.mapData.getMapData().selectLineMapNode
      if (Array.isArray(mapNode[RIGHT_LINE_POINTS]) && mapNode[RIGHT_LINE_POINTS].length > 0) {
        return mapNode[RIGHT_LINE_POINTS][0]
      } else {
        return ''
      }
    },
    optionalFields: function () {
      return this.fields.filter((item) => {
        return !this.fieldList.some(field => field.codeName === item.codeName)
      })
    }
  },
  methods: {
    setField (list = []) {
      this.fieldList = []
      if (list.length === 0) {
        this.fields.forEach(() => {
          this.fieldList.push({
            id: uuid(),
            spliceChar: undefined,
            codeName: undefined
          })
        })
      } else {
        this.fieldList = list
      }
    }
  }
}
</script>

<style lang="less" scoped>
.field-splice-wrap {
  .flex-wrap {
    display: flex;
    flex-wrap: nowrap;
    .input-wrap {
      width: 100px;
      margin: 0 8px 8px 0;
      flex-shrink: 0;
    }
  }
}
</style>