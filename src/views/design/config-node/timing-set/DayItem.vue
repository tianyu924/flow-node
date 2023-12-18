<template>
  <div class="day-item-wrap">
    <a-form-model-item label="填报时间">
      <a-row type="flex"
             justify="center">
        <a-col :span="11">
          <a-time-picker style="width: 100%"
                         v-model="form.startTime"
                         format="HH:mm" />
        </a-col>
        <a-col :span="2"
               style="text-align:center;">至</a-col>
        <a-col :span="11">
          <a-time-picker style="width: 100%"
                         v-model="form.endTime"
                         format="HH:mm" />
        </a-col>
      </a-row>
    </a-form-model-item>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'DayItem',
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
        this.setForm(newForm)
      }
    }
  },
  beforeDestroy () {
    this.setForm()
  },
  methods: {
    setForm (formData = null) {
      const initData = {
        startTime: moment('00:00', 'HH:mm'),
        endTime: moment('23:59', 'HH:mm')
      }
      for (const key in initData) {
        this.$set(this.form, key, formData?.[key] || initData[key])
      }
    }
  }
}
</script>

<style>
</style>