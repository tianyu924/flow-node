<template>
  <div class="data-map-wrap">
    <a-modal v-model="visible"
             width="700px"
             title="数据映射"
             wrapClassName="data-map-modal"
             @cancel="onCancel"
             @ok="onOk">
      <a-form-model :model="form"
                    ref="ruleForm"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label="映射关系">
          <div class="map-wrap">
            <div class="svg-wrap">
              <svg style="width: 100%; height: 100%;"
                   xmlns="http://www.w3.org/2000/svg">
                <g>
                  <line :x1="item.x1"
                        :y1="item.y1"
                        :x2="item.x2"
                        :y2="item.y2"
                        :key="item.key"
                        v-for="item in leftLinePoints"
                        class="map-line" />
                </g>
                <g>
                  <line :x1="item.x1"
                        :y1="item.y1"
                        :x2="item.x2"
                        :y2="item.y2"
                        :key="item.key"
                        v-for="item in rightLinePoints"
                        class="map-line" />
                </g>
              </svg>
            </div>
            <div class="start-wrap">
              <div class="field"
                   v-for="item in leftLinePoints"
                   :data-key="item.key"
                   :key="item.key">
                <a-tag color="green">
                  {{item.codeName}}
                </a-tag>
              </div>
            </div>
            <div class="middle-wrap">
              <a-select v-model="form.dataMapType"
                        @change="onChange"
                        placeholder="请选择"
                        style="width: 100px">
                <a-select-option :value="item.value"
                                 :key="index"
                                 v-for="(item, index) in optionalMapList">{{item.label}}</a-select-option>
              </a-select>
            </div>
            <div class="end-wrap">
              <div class="field"
                   v-for="item in rightLinePoints"
                   :data-key="item.key"
                   :key="item.key">
                <a-tag color="green">
                  {{item.codeName}}
                </a-tag>
              </div>
            </div>
          </div>
        </a-form-model-item>
        <!-- 动态加载组件 -->
        <component v-if="form.dataMapType"
                   :form="form"
                   :is="DATA_MAP_ITEM[form.dataMapType].componentName"></component>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { LEFT_LINE_POINTS, RIGHT_LINE_POINTS, DATA_MAP_ITEM, DATA_MAP_LIST } from '../../utils/config'
import { getClientRect, computeMapRelation } from '../../utils/server'
import BindingItem from './BindingItem.vue'
import TranslateItem from './TranslateItem.vue'
import RegularItem from './RegularItem.vue'
import FieldSpliceItem from './FieldSpliceItem.vue'
import FieldSplitItem from './FieldSplitItem.vue'
import CustomItem from './CustomItem.vue'
import ComputedItem from './ComputedItem.vue'
export default {
  name: 'DataMap',
  components: {
    BindingItem,
    TranslateItem,
    RegularItem,
    FieldSpliceItem,
    FieldSplitItem,
    CustomItem,
    ComputedItem
  },
  inject: ['mapData'],
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      visible: false,
      DATA_MAP_LIST: DATA_MAP_LIST,
      DATA_MAP_ITEM: DATA_MAP_ITEM,
      form: {
        key: '',
        dataMapType: undefined
      },
      leftLinePoints: [],
      rightLinePoints: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 17 },
      rootClient: null,
      middleClient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      }
    }
  },
  computed: {
    selectNode: function () {
      return this.mapData.getMapData().selectLineMapNode
    },
    // 可选映射类型
    optionalMapList: function () {
      if (!this.selectNode) {
        return false
      }
      const mapType = computeMapRelation(this.selectNode)
      return this.DATA_MAP_LIST.filter(item => item.optionaType === mapType)
    }
  },
  watch: {
    value: function (newVal) {
      this.visible = newVal
      if (newVal) {
        this.form.key = this.selectNode.middleNodePoint.key
        this.form.dataMapType = this.selectNode?.dataMap?.mapTypeValue
        this.leftLinePoints = this.getLinePoints(LEFT_LINE_POINTS)
        this.rightLinePoints = this.getLinePoints(RIGHT_LINE_POINTS)
        this.$nextTick(() => {
          this.rootClient = document.querySelector('.map-wrap').getBoundingClientRect()
          this.setMiddleWrapClient()
          this.setLeftLineCoordinate(this.leftLinePoints)
          this.setRightLineCoordinate(this.rightLinePoints)
        })
      }
    }
  },
  created () {

  },
  methods: {
    getLinePoints (key) {
      return JSON.parse(JSON.stringify(this.selectNode ? this.selectNode[key] : []))
    },
    onCancel () {
      this.form.dataMapType = undefined
      this.$emit('input', false)
    },
    onOk () {
      console.log('this.form-OK', JSON.parse(JSON.stringify(this.form)));
      this.$refs['ruleForm'].validate(valid => {
        console.log('valid', valid);
        if (valid) {
          const mapType = this.optionalMapList.find(item => item.value === this.form.dataMapType)
          this.$emit('change', { mapTypeValue: mapType.value, mapTypeText: mapType.label })
          this.onCancel()
        }
      })
    },
    onChange () {

    },
    setMiddleWrapClient () {
      const middleWrapElem = document.querySelector('.middle-wrap')
      const middleWrapClient = getClientRect(middleWrapElem, this.rootClient)
      this.middleClient = {
        x1: middleWrapClient.x - (middleWrapClient.width / 2),
        x2: middleWrapClient.x + (middleWrapClient.width / 2),
        y: middleWrapClient.y
      }
    },
    // 设置左侧线坐标
    setLeftLineCoordinate (linePoints = []) {
      for (const line of linePoints) {
        const lineElem = document.querySelector(`.field[data-key='${line.key}']`)
        const lineClient = getClientRect(lineElem, this.rootClient)
        line.x1 = lineClient.x + (lineClient.width / 2)
        line.y1 = lineClient.y
        line.x2 = this.middleClient.x1
        line.y2 = this.middleClient.y
      }
    },
    // 设置右侧线坐标
    setRightLineCoordinate (linePoints = []) {
      for (const line of linePoints) {
        const lineElem = document.querySelector(`.field[data-key='${line.key}']`)
        const lineClient = getClientRect(lineElem, this.rootClient)
        line.x1 = this.middleClient.x2
        line.y1 = this.middleClient.y
        line.x2 = lineClient.x - (lineClient.width / 2)
        line.y2 = lineClient.y
      }
    }
  }
}
</script>

<style lang="less">
.data-map-modal {
  .scroll-wrap {
    max-height: 300px;
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
  }
}
</style>
<style lang="less" scoped>
.data-map-modal {
  .map-wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    position: relative;
    .svg-wrap {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .map-line {
        stroke: #1677ff;
        fill: none;
        stroke-width: 2px;
        transition: all 0.3s;
      }
    }
    .start-wrap,
    .end-wrap {
      position: relative;
      z-index: 3;
      .ant-tag {
        margin-right: 0;
      }
    }
    .start-wrap {
      .field {
        text-align: right;
      }
    }
    .end-wrap {
      .field {
        text-align: left;
      }
    }
  }
}
</style>