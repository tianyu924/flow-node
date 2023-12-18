<template>
  <div class="custom-item-wrap">
    <a-row>
      <a-form-model-item label="每"
                         :colon="false"
                         prop="">
        <a-col :span="11">
          <a-input-number placeholder="请输入间隔时间"
                          style="width: 100%"
                          v-model="form.intervalTime"
                          :min="1"
                          :max="10000" />
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="12">
          <a-select style="width: 100%"
                    placeholder="请选择"
                    v-model="form.intervalUnit"
                    @change="onChangeUnit">
            <a-select-option :value="item.value"
                             :key="item.value"
                             v-for="item in unitList">{{item.label}}</a-select-option>
          </a-select>
        </a-col>
      </a-form-model-item>
      <a-form-model-item label=" "
                         :colon="false">
        <a-alert :message="intervalPrompt"
                 type="info"
                 show-icon />
        <div class="calendar-wrap"
             v-if="form.intervalUnit !== 'day'">
          <div class="week-wrap">
            <div class="week"
                 :key="item.value"
                 :class="[selectWeeks.includes(item.value) ? 'select' : '', form.intervalUnit !== 'week' ? 'disable':'']"
                 @click="onSelectWeek(item.value)"
                 v-for="item in weeks">
              <span>{{item.label}}</span>
            </div>
          </div>
          <div class="month-day-wrap">
            <div class="month-day"
                 :key="item.value"
                 :class="[selectMonthDays.includes(item.value) ? 'select' : '', form.intervalUnit !== 'month' ? 'disable':'']"
                 @click="onSelectMonthDay(item.value)"
                 v-for="item in monthDays">
              <span>{{item.label}}</span>
            </div>
          </div>
        </div>
      </a-form-model-item>
      <a-form-model-item label="跳过法定节假日"
                         prop="">
        <a-switch v-model="form.isSkipHoliday"
                  checked-children="是"
                  un-checked-children="否" />
      </a-form-model-item>
      <a-form-model-item label="跳过双休日"
                         prop=""
                         v-show="form.intervalUnit !== 'week'">
        <a-switch v-model="form.isSkipWeekEnd"
                  checked-children="是"
                  un-checked-children="否" />
      </a-form-model-item>
    </a-row>
  </div>
</template>

<script>
import { getWeekList, getMonthDaysList } from '../../utils/server'
export default {
  name: 'CustomItem',
  props: {
    form: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      unitList: [
        {
          label: '天',
          value: 'day'
        },
        {
          label: '周',
          value: 'week'
        },
        {
          label: '月',
          value: 'month'
        }
      ],
      selectWeeks: [],
      selectMonthDays: []
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
  computed: {
    weeks: function () {
      return getWeekList()
    },
    monthDays: function () {
      return getMonthDaysList(false).map(item => { return { ...item, label: item.value } })
    },
    intervalPrompt: function () {
      const weeksChars = this.weeks.filter(item => this.selectWeeks.includes(item.value)).map(item => item.label).join('、')
      const monthDayChars = this.monthDays.filter(item => this.selectMonthDays.includes(item.value)).map(item => item.label).join('、')
      if (this.form.intervalUnit === 'day') {
        return `每隔 ${this.form.intervalTime}天 重复`
      } else if (this.form.intervalUnit === 'week') {
        return `每隔 ${this.form.intervalTime}周${weeksChars.length > 0 ? `，${weeksChars}` : ''} 重复`
      } else {
        return `每隔 ${this.form.intervalTime}个月${monthDayChars.length > 0 ? `，${monthDayChars}号` : ''} 重复`
      }
    }
  },
  beforeDestroy () {
    this.setForm()
  },
  methods: {
    setForm (formData = null) {
      const initData = {
        intervalTime: 1,
        intervalUnit: 'day',
        isSkipHoliday: false,
        isSkipWeekEnd: false
      }
      for (const key in initData) {
        this.$set(this.form, key, formData?.[key] || initData[key])
      }
    },
    onChangeUnit () {
      this.selectWeeks = []
      this.selectMonthDays = []
    },
    onSelectWeek (value) {
      if (this.form.intervalUnit === 'week') {
        const index = this.selectWeeks.indexOf(value)
        if (index === -1) {
          this.selectWeeks.push(value)
        } else {
          this.selectWeeks.splice(index, 1)
        }
        this.selectWeeks.sort((a, b) => a - b)
      }
    },
    onSelectMonthDay (value) {
      if (this.form.intervalUnit === 'month') {
        const index = this.selectMonthDays.indexOf(value)
        if (index === -1) {
          this.selectMonthDays.push(value)
        } else {
          this.selectMonthDays.splice(index, 1)
        }
        this.selectMonthDays.sort((a, b) => a - b)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.calendar-wrap {
  margin-top: 20px;
  .week-wrap,
  .month-day-wrap {
    display: grid;
    grid-template-columns: repeat(7, 40px);
    grid-row-gap: 5px;
    grid-column-gap: 5px;
    margin-bottom: 5px;
    .week,
    .month-day {
      text-align: center;
      &.disable {
        cursor: not-allowed;
        span,
        span:hover {
          color: rgba(0, 0, 0, 0.25);
          background: transparent;
          cursor: not-allowed;
        }
      }
      span {
        display: block;
        width: 40px;
        height: 40px;
        margin: 0 auto;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        background: transparent;
        border-radius: 2px;
        transition: all 0.3s;
        &:hover {
          background: #e6f7ff;
          cursor: pointer;
        }
      }
      &.select span {
        color: #fff;
        background: #1890ff;
      }
    }
  }
}
</style>