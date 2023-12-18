<template>
  <div class="timing-set-wrap">
    <!-- 定时设置 -->
    <a-modal v-model="visible"
             width="1050px"
             title="定时设置"
             wrapClassName="timing-set-modal"
             @cancel="onCancel"
             @ok="onOk">
      <a-form-model :model="form"
                    ref="ruleForm"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">

        <a-form-model-item label="重复周期"
                           prop="repeatCycleType">
          <a-select v-model="form.repeatCycleType"
                    placeholder="请选择"
                    @change="onChangeRepeat">
            <a-select-option :value="item.value"
                             :key="item.value"
                             v-for="item in REPEAT_CYCLE_TYPE_LIST">{{item.label}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="开始时间"
                           prop="startDate">
          <a-date-picker v-model="form.startDate"
                         style="width: 100%;"
                         @change="onChangeStartTime"
                         show-time
                         clearable
                         format="YYYY-MM-DD HH:mm" />
        </a-form-model-item>
        <a-form-model-item label="结束重复"
                           v-if="form.repeatCycleType !== 0">
          <a-select v-model="form.endRepeatType"
                    placeholder="请选择"
                    @change="onEndRepeatChange">
            <a-select-option value="0"> 一直重复 </a-select-option>
            <a-select-option value="1"> 按日期结束 </a-select-option>
            <a-select-option value="2"> 按次数结束 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="截止时间"
                           prop="endDate"
                           v-if="form.repeatCycleType === 0 || form.endRepeatType == 1">
          <a-date-picker style="width: 100%"
                         v-model="form.endDate"
                         @change="onEndTimeChange"
                         show-time
                         clearable
                         format="YYYY-MM-DD HH:mm" />
        </a-form-model-item>
        <a-form-model-item label="重复次数"
                           prop="endNumber"
                           v-if="form.repeatCycleType !== 0 && form.endRepeatType == 2">
          <a-input-number placeholder="请输入"
                          style="width: 100%"
                          v-model="form.endNumber"
                          :min="1"
                          :max="10000" />
        </a-form-model-item>
        <!-- 动态加载组件 -->
        <component v-if="form.repeatCycleType !== 0 && componentName"
                   :form="form"
                   :is="componentName"></component>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { REPEAT_CYCLE_TYPE_LIST } from '../../utils/config'
import DayItem from './DayItem.vue'
import WeekItem from './WeekItem.vue'
import MonthItem from './MonthItem.vue'
import QuarterItem from './QuarterItem.vue'
import YearItem from './YearItem.vue'
import CustomItem from './CustomItem.vue'
export default {
  name: 'TimingSet',
  components: {
    DayItem,
    WeekItem,
    MonthItem,
    QuarterItem,
    YearItem,
    CustomItem
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 17 },
      visible: false,
      REPEAT_CYCLE_TYPE_LIST: REPEAT_CYCLE_TYPE_LIST,
      form: {
        repeatCycleType: 0,
        startDate: undefined,
        endDate: undefined,
        endRepeatType: '0',
        endNumber: undefined
      }
    }
  },
  computed: {
    componentName: function () {
      const option = REPEAT_CYCLE_TYPE_LIST.find(item => item.value === this.form.repeatCycleType)
      return option ? option.componentName : null
    }
  },
  watch: {
    value: function (newVal) {
      this.visible = newVal
    }
  },
  methods: {
    onCancel () {

    },
    onOk () {

    },
    onChangeRepeat () {

    },
    onChangeStartTime () {

    },
    onEndRepeatChange () {

    },
    onEndTimeChange () {

    }
  }
}
</script>

<style>
</style>