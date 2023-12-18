<template>
  <div class="start-config-wrap">
    <a-form-model :model="form"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol">
      <a-form-model-item label="标识">
        <a-input v-model="form.id"
                 disabled />
      </a-form-model-item>
      <a-form-model-item label="触发条件">
        <a-radio-group v-model="form.trigger">
          <a-radio value="1">
            手动触发
          </a-radio>
          <a-radio value="2">
            定时器
          </a-radio>
          <a-radio value="3">
            被动触发
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="定时设置"
                         v-if="form.trigger === '2'">
        <a-input v-model="form.time"
                 class="time-setting"
                 @click.native="onTimingSet"
                 placeholder="请选择"
                 readOnly>
          <a-icon slot="suffix"
                  type="form" />
        </a-input>
      </a-form-model-item>
    </a-form-model>
    <!-- 定时设置 -->
    <TimingSet v-model="timingSetVisible" />
  </div>
</template>

<script>
import TimingSet from './timing-set/index.vue'
export default {
  name: 'StartConfig',
  components: {
    TimingSet
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
      timingSetVisible: false,
      form: {
        id: this.node.id,
        trigger: '1',
        time: ''
      }
    }
  },
  methods: {
    onTimingSet () {
      console.log('onTimingSet');
      this.timingSetVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.start-config-wrap {
  .time-setting,
  .time-setting ::v-deep input {
    cursor: pointer;
  }
}
</style>