<template>
  <div class="input-config-wrap">
    <a-form-model :model="form"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol">
      <a-form-model-item label="标识">
        <a-input v-model="form.id"
                 disabled />
      </a-form-model-item>
      <a-form-model-item label="节点名称">
        <a-input v-model="form.title"
                 @change="onChange" />
      </a-form-model-item>
      <a-form-model-item label="连接器">
        <a-select @change="onChange"
                  placeholder="请选择"
                  v-model="form.connector">
          <a-select-option value="1">
            连接器1
          </a-select-option>
          <a-select-option value="2">
            连接器2
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="连接项">
        <a-select v-model="form.method"
                  placeholder="请选择"
                  @change="onChange">
          <a-select-option value="GET">
            GET
          </a-select-option>
          <a-select-option value="POST">
            POST
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="参数设置"
                         @click.native="onOpenSet">
        <a-input class="param-setting"
                 placeholder="请设置"
                 readOnly>
          <a-icon slot="suffix"
                  type="form" />
        </a-input>
      </a-form-model-item>
    </a-form-model>
    <!-- 参数设置 -->
    <ParamSet v-model="visible" />
  </div>
</template>

<script>
import ParamSet from './param-set/index.vue'
import { emitListener } from '../utils/emits'
export default {
  name: 'InputConfig',
  components: {
    ParamSet
  },
  props: {
    node: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
      visible: false,
      form: {
        id: this.node.id,
        title: undefined,
        connector: undefined,
        method: undefined,
        paramsSet: {}
      }
    }
  },
  created () {
    this.setForm()
  },
  methods: {
    setForm () {
      const extraData = this.node?.data || {}
      for (const [key, value] of Object.entries(extraData)) {
        this.form[key] = value
      }
    },
    onOpenSet () {
      this.visible = true
    },
    onChange () {
      emitListener('update-node', this.form)
    }
  }
}
</script>

<style lang="less" scoped>
.input-config-wrap {
  .param-setting,
  .param-setting ::v-deep input {
    cursor: pointer;
  }
}
</style>