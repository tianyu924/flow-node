<template>
  <div class="year-item-wrap">
    <a-form-model-item label="填报时间">
      <a-row type="flex"
             justify="center"
             :gutter="10">
        <a-col :span="6">
          <a-date-picker style="width: 100%"
                         v-model="form.yearStart"
                         clearable
                         format="MM-DD" />
        </a-col>
        <a-col :span="5">
          <a-time-picker style="width: 100%"
                         v-model="form.startTime"
                         format="HH:mm" />
        </a-col>
        <a-col :span="2"
               style="text-align:center;">至</a-col>
        <a-col :span="6">
          <a-date-picker style="width: 100%"
                         v-model="form.yearEnd"
                         clearable
                         format="MM-DD" />
        </a-col>
        <a-col :span="5">
          <a-time-picker style="width: 100%"
                         v-model="form.endTime"
                         format="HH:mm" />
        </a-col>
      </a-row>
    </a-form-model-item>
  </div>
</template>

<script>
import { getMonthDaysList } from '../../utils/server'
import moment from 'moment'
export default {
  name: 'MonthItem',
  props: {
    form: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    monthDays: function () {
      return getMonthDaysList()
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
  destroyed () {
    this.setForm()
  },
  methods: {
    setForm (formData = null) {
      const initData = {
        startTime: moment('00:00', 'HH:mm'),
        endTime: moment('23:59', 'HH:mm'),
        yearStart: undefined,
        yearEnd: undefined
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