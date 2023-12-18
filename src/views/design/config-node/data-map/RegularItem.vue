<template>
  <div class="regular-wrap">
    <a-form-model-item label="正则表达式"
                       prop="regularValue"
                       :rules="[{
                          required: true,
                          message: '请输入',
                          trigger: 'change',
                        }]"
                       extra="例:字段数据为'现在时间是2023-11-10 10:14:16，请注意休息'，正则表达式为'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'，匹配结果为'2023-11-10 10:14:16'">
      <a-input placeholder="请输入"
               v-model="form.regularValue"
               allowClear />
    </a-form-model-item>
  </div>
</template>

<script>
export default {
  name: 'RegularItem',
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
        this.$set(newForm, 'regularValue', newForm?.regularValue || undefined)
      }
    }
  },
  methods: {
  }
}
</script>

<style>
</style>