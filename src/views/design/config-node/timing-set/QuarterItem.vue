<template>
  <div class="quarter-item-wrap">
    <a-form-model-item label="填报时间">
      <a-row type="flex"
             justify="center"
             :gutter="10">
        <a-col :span="4">
          <a-select style="width: 100%"
                    placeholder="请选择"
                    v-model="form.quarterStart">
            <a-select-option value="1"> 第一个月 </a-select-option>
            <a-select-option value="2"> 第二个月 </a-select-option>
            <a-select-option value="3"> 第三个月 </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-select style="width: 100%"
                    placeholder="请选择"
                    v-model="form.monthStart">
            <a-select-option :value="item.value"
                             :key="item.value"
                             v-for="item in monthDays">{{item.label}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="3">
          <a-time-picker style="width: 100%"
                         v-model="form.startTime"
                         format="HH:mm" />
        </a-col>
        <a-col :span="2"
               style="text-align:center;">至</a-col>
        <a-col :span="4">
          <a-select style="width: 100%"
                    placeholder="请选择"
                    v-model="form.quarterEnd">
            <a-select-option value="1"> 第一个月 </a-select-option>
            <a-select-option value="2"> 第二个月 </a-select-option>
            <a-select-option value="3"> 第三个月 </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-select style="width: 100%"
                    placeholder="请选择"
                    v-model="form.monthEnd">
            <a-select-option :value="item.value"
                             :key="item.value"
                             v-for="item in monthDays">{{item.label}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="3">
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
  name: 'QuarterItem',
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
        monthStart: undefined,
        monthEnd: undefined,
        quarterStart: undefined,
        quarterEnd: undefined
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