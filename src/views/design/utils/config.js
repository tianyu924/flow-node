const CONDITION_NODE = 1  //  条件节点
const INPUT_NODE = 2      //  输入节点
const OUT_NODE = 3        //  输出节点
const PARSE_NODE = 4      //  解析节点
const COMPUTED_NODE = 5   //  计算节点
const START_NODE = 101    //  开始节点
const END_NODE = 102      //  结束节点

// 定义映射连线左右侧关键变量字符
export const LEFT_LINE_POINTS = 'leftLinePoints'
export const RIGHT_LINE_POINTS = 'rightLinePoints'

// 节点类型字典
export const TYPE_MAP = {
  [START_NODE]: {
    nodeName: 'StartNode',
    configName: 'StartConfig',
    nodeText: '开始'
  },
  [END_NODE]: {
    nodeName: 'EndNode',
    nodeText: '结束'
  },
  [CONDITION_NODE]: {
    nodeName: 'ConditionNode',
    nodeText: '条件分支'
  },
  [INPUT_NODE]: {
    nodeName: 'InputNode',
    configName: 'InputConfig',
    nodeText: '输入'
  },
  [OUT_NODE]: {
    nodeName: 'OutNode',
    nodeText: '输出'
  },
  [PARSE_NODE]: {
    nodeName: 'ParseNode',
    nodeText: '解析'
  },
  [COMPUTED_NODE]: {
    nodeName: 'ComputedNode',
    nodeText: '计算'
  }
}

// 添加节点列表类型字典
export const TYPE_LIST_MAP = [
  {
    name: TYPE_MAP[INPUT_NODE].nodeText,
    size: '30px',
    type: INPUT_NODE,
    color: '#E6A23C'
  },
  {
    name: TYPE_MAP[OUT_NODE].nodeText,
    size: '30px',
    type: OUT_NODE,
    color: '#E6A23C'
  },
  {
    name: TYPE_MAP[CONDITION_NODE].nodeText,
    size: '30px',
    type: CONDITION_NODE,
    color: '#E6A23C'
  },
  {
    name: TYPE_MAP[PARSE_NODE].nodeText,
    size: '30px',
    type: PARSE_NODE,
    color: '#E6A23C'
  }
]

// 映射类型定义
const BINDING_TYPE = 1  // 绑定
const TRANSLATE_TYPE = 2  // 翻译
const REGULAR_TYPE = 3  // 正则替换
const FIELD_SPLICE_TYPE = 4  // 字段拼接
const FIELD_SPLIT_TYPE = 5  // 字段拆分
const CUSTOM_TYPE = 6  // 自定义
const COMPUTED_TYPE = 7  // 计算
// 映射关系定义
export const ONE_FOR_ONE = 'ONE_FOR_ONE'  // 一对一
export const ONE_FOR_MANY = 'ONE_FOR_MANY'  // 一对多
export const MANY_FOR_ONE = 'MANY_FOR_ONE'  // 多对一
export const MANY_FOR_MANY = 'MANY_FOR_MANY'  // 多对多

// 数据映射配置数据
export const DATA_MAP_ITEM = {
  [BINDING_TYPE]: {
    componentName: 'BindingItem',
    text: '绑定'
  },
  [TRANSLATE_TYPE]: {
    componentName: 'TranslateItem',
    text: '翻译'
  },
  [REGULAR_TYPE]: {
    componentName: 'RegularItem',
    text: '正则替换'
  },
  [FIELD_SPLICE_TYPE]: {
    componentName: 'FieldSpliceItem',
    text: '字段拼接'
  },
  [FIELD_SPLIT_TYPE]: {
    componentName: 'FieldSplitItem',
    text: '拆分'
  },
  [COMPUTED_TYPE]: {
    componentName: 'ComputedItem',
    text: '计算'
  },
  [CUSTOM_TYPE]: {
    componentName: 'CustomItem',
    text: '自定义'
  }
}
// 数据映射列表配置
export const DATA_MAP_LIST = [
  {
    label: DATA_MAP_ITEM[BINDING_TYPE].text,
    value: BINDING_TYPE,
    optionaType: ONE_FOR_ONE
  },
  {
    label: DATA_MAP_ITEM[TRANSLATE_TYPE].text,
    value: TRANSLATE_TYPE,
    optionaType: ONE_FOR_ONE
  },
  {
    label: DATA_MAP_ITEM[REGULAR_TYPE].text,
    value: REGULAR_TYPE,
    optionaType: ONE_FOR_ONE
  },
  {
    label: DATA_MAP_ITEM[FIELD_SPLICE_TYPE].text,
    value: FIELD_SPLICE_TYPE,
    optionaType: MANY_FOR_ONE
  },
  {
    label: DATA_MAP_ITEM[FIELD_SPLIT_TYPE].text,
    value: FIELD_SPLIT_TYPE,
    optionaType: ONE_FOR_MANY
  },
  {
    label: DATA_MAP_ITEM[COMPUTED_TYPE].text,
    value: COMPUTED_TYPE,
    optionaType: MANY_FOR_ONE
  },
  {
    label: DATA_MAP_ITEM[CUSTOM_TYPE].text,
    value: CUSTOM_TYPE,
    optionaType: MANY_FOR_ONE
  }
]

// 条件判断列表配置
export const CONDITION_TYPE_LIST = [
  {
    label: '大于',
    value: '大于'
  },
  {
    label: '大于等于',
    value: '大于等于'
  },
  {
    label: '等于',
    value: '等于'
  },
  {
    label: '小于',
    value: '小于'
  },
  {
    label: '小于等于',
    value: '小于等于'
  },
  {
    label: '包含',
    value: '包含'
  },
  {
    label: '不包含',
    value: '不包含'
  },
  {
    label: '属于',
    value: '属于'
  },
  {
    label: '不属于',
    value: '不属于'
  }
]
// 条件关系配置
export const CONDITION_JUDGE_LIST = [
  {
    label: '且',
    value: 1
  },
  {
    label: '或',
    value: 2
  }
]

// 重复周期列表配置
export const REPEAT_CYCLE_TYPE_LIST = [
  {
    label: '不重复',
    value: 0
  },
  {
    label: '每天重复',
    value: 1,
    componentName: 'DayItem'
  },
  {
    label: '每周重复',
    value: 2,
    componentName: 'WeekItem'
  },
  {
    label: '每月重复',
    value: 3,
    componentName: 'MonthItem'
  },
  {
    label: '每季重复',
    value: 4,
    componentName: 'QuarterItem'
  },
  {
    label: '每年重复',
    value: 5,
    componentName: 'YearItem'
  },
  {
    label: '工作日重复',
    value: 6,
    componentName: 'DayItem'
  },
  {
    label: '自定义重复',
    value: 7,
    componentName: 'CustomItem'
  }
]