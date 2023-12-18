<template>
  <div class="param-set-wrap">
    <a-modal v-model="visible"
             width="700px"
             title="参数设置"
             :getContainer="mountEle"
             @cancel="onCancel"
             @ok="onOk">
      <div class="field-set-wrap"
           :class="[drawing ? 'drawing' : '']"
           @mousemove="onMouseMove"
           @mouseup="onMouseUp">
        <div class="field-left-wrap">
          <div class="title">数据来源</div>
          <div class="tree-wrap"
               :data-key="LEFT_LINE_POINTS">
            <a-tree defaultExpandAll
                    blockNode
                    :tree-data="fieldLeftData">
              <template slot="custom"
                        slot-scope="record">
                <span>
                  {{ record.title }}
                  <a-tag color="#f50"
                         v-if="record.hideCount > 0"
                         style="line-height:13px;padding: 0 3px;">
                    {{ record.hideCount }}
                  </a-tag>
                </span>
                <div class="point start"
                     :class="[computedIsConnect(record, false)?'connect':'']"
                     :data-key="record.key"
                     :data-title="record.title"
                     @mousedown="onMouseDown"></div>
              </template>
            </a-tree>
          </div>
        </div>
        <div class="field-right-wrap">
          <div class="title">
            <span>参数</span>
            <a-icon type="plus-circle"
                    class="icon-add"
                    @click="onAddField()" />
          </div>
          <div class="tree-wrap"
               :data-key="RIGHT_LINE_POINTS">
            <a-tree defaultExpandAll
                    blockNode
                    :tree-data="fieldRightData">
              <template slot="custom"
                        slot-scope="record">
                <span>
                  {{ record.title }}
                  <a-tag color="#f50"
                         v-if="record.hideCount > 0"
                         style="line-height:13px;padding: 0 3px;">
                    {{ record.hideCount }}
                  </a-tag>
                </span>
                <div class="point end"
                     :class="[computedIsConnect(record, true)?'connect':'']"
                     :style="{left: `-${(record.level - 1) * 18 + 5}px`}"
                     :data-key="record.key"
                     :data-title="record.title"></div>
                <div class="operate-wrap">
                  <a-icon type="plus-circle"
                          @click="onAddField(record)"
                          class="icon-add" />
                  <a-icon type="minus-circle"
                          class="icon-delete"
                          @click="onDeleteField(record)" />
                </div>
              </template>
            </a-tree>
          </div>
        </div>
        <div class="field-line-svg-wrap">
          <svg style="width: 100%; height: 100%;"
               id="render-svg"
               @click="clearKeys()"
               xmlns="http://www.w3.org/2000/svg">
            <template v-if="drawing">
              <g>
                <line :x1="drawLine.startPoint.x"
                      :y1="drawLine.startPoint.y"
                      :x2="drawLine.targetPoint.x"
                      :y2="drawLine.targetPoint.y"
                      class="map-line" />
              </g>
            </template>
            <g v-for="(item, index) in svgLineMapList"
               :class="`svg-map-${index}`"
               :key="index">
              <!-- 渲染左侧连接线 -->
              <g :key="leftLine.domKey"
                 class="line-wrap"
                 :id="leftLine.domKey"
                 :class="[activeKeys.includes(leftLine.domKey) ? 'active' : '', selectKeys.includes(leftLine.domKey) ? 'select' : '']"
                 @click.stop="onSelectLine(leftLine.domKey, item, index)"
                 v-for="(leftLine, lineIndex) in item[LEFT_LINE_POINTS]">
                <line :x1="leftLine.x1"
                      :y1="leftLine.y1"
                      :x2="leftLine.x2"
                      :y2="leftLine.y2"
                      v-show="!leftLine.hide"
                      class="map-line" />
                <foreignObject width="18"
                               height="18"
                               :x="getMidpoint(leftLine).x"
                               :y="getMidpoint(leftLine).y">
                  <div class="delete-icon"
                       @click.stop="onDeleteLine(lineIndex, index, item[LEFT_LINE_POINTS])">
                    <a-icon type="scissor"
                            style="font-size:12px;color:#fff;" />
                  </div>
                </foreignObject>
              </g>
              <!-- 渲染右侧连接线 -->
              <g :key="rightLine.domKey"
                 class="line-wrap"
                 :id="rightLine.domKey"
                 :class="[activeKeys.includes(rightLine.domKey) ? 'active' : '', selectKeys.includes(rightLine.domKey) ? 'select' : '']"
                 @click.stop="onSelectLine(rightLine.domKey, item, index)"
                 v-for="(rightLine, lineIndex) in item[RIGHT_LINE_POINTS]">
                <line :x1="rightLine.x1"
                      :y1="rightLine.y1"
                      :x2="rightLine.x2"
                      :y2="rightLine.y2"
                      v-show="!rightLine.hide"
                      class="map-line" />
                <foreignObject width="18"
                               height="18"
                               :x="getMidpoint(rightLine).x"
                               :y="getMidpoint(rightLine).y">
                  <div class="delete-icon"
                       @click.stop="onDeleteLine(lineIndex, index, item[RIGHT_LINE_POINTS])">
                    <a-icon type="scissor"
                            style="font-size:12px;color:#fff;" />
                  </div>
                </foreignObject>
              </g>
              <!-- 渲染中间映射节点 -->
              <foreignObject :id="item.middleNodePoint.key"
                             :x="item.middleNodePoint.x"
                             :y="item.middleNodePoint.y"
                             :width="middleNodeStyle.width"
                             :height="middleNodeStyle.height"
                             style="overflow: visible;"
                             stroke-width="1">
                <div xmlns="http://www.w3.org/1999/xhtml"
                     class="middle-node-wrap"
                     :class="[drawPassNode && drawPassNode.middleNodePoint.key === item.middleNodePoint.key ? 'draw-pass' : '', drawing ? 'drawing' : '']"
                     @mouseover="onOverMiddleNodePoint(item, index)"
                     @mouseout="onOutMiddleNodePoint()"
                     @click="onOpenDataMap(index)">
                  <div class="flex">
                    {{item.dataMap ? item.dataMap.mapTypeText : '请选择'}}<a-icon type="minus-circle"
                            @click.stop="onDeleteMapNode(index)"
                            theme="twoTone"
                            two-tone-color="#d9363e"
                            :class="[drawing ? 'drawing' : '']"
                            class="delete" />
                  </div>
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>
      </div>
    </a-modal>
    <!-- 添加参数字段 -->
    <a-modal v-model="fieldVisible"
             width="400px"
             title="添加字段"
             @cancel="onCancelField"
             @ok="onOkField">
      <a-form-model :model="form"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item label="父级字段">
          {{ form.parentNode ? form.parentNode.title : '无' }}
        </a-form-model-item>
        <a-form-model-item label="字段名称">
          <a-input v-model="form.name" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 数据映射 -->
    <DataMap v-model="dataMapVisible"
             @change="onDataMapChange" />
  </div>
</template>

<script>
import DataMap from '../data-map/index.vue'
import { fieldRightData, fieldLeftData } from '../../utils/mock'
import { LEFT_LINE_POINTS, RIGHT_LINE_POINTS, DATA_MAP_LIST, MANY_FOR_MANY } from '../../utils/config'
import { findNode, getParentNode, uuid, getChildrenNode, getClientRect, computeMapRelation } from '../../utils/server'
export default {
  name: 'ParamSet',
  components: {
    DataMap
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  provide () {
    return {
      mapData: {
        getMapData: this.provideCommon
      }
    }
  },
  data () {
    return {
      visible: false,
      dataMapVisible: false,
      fieldVisible: false,
      fieldRightData: fieldRightData,
      fieldLeftData: fieldLeftData,
      DATA_MAP_LIST: DATA_MAP_LIST,
      activeKeys: [],
      selectKeys: [],
      overlapMenu: {
        nodes: [],
        index: 0
      },
      drawing: false,
      drawPassNode: null, // 画线经过时的映射中间节点
      drawPassTimer: null, // 延迟执行函数timer
      drawLine: {
        startPoint: {
          x: 0,
          y: 0
        },
        targetPoint: {
          x: 0,
          y: 0
        }
      },
      rootClient: null,
      middleNodeStyle: {
        key: '',
        width: 60,
        height: 25,
        x: 0,
      },
      svgLineMap: [],
      selectLineMapNode: null,
      mapKey: '',
      mutationObserver: null,
      LEFT_LINE_POINTS: LEFT_LINE_POINTS,
      RIGHT_LINE_POINTS: RIGHT_LINE_POINTS,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      recordHideNodes: [],
      hideCountList: [],
      form: {
        parentNode: null,
        name: ''
      },
    }
  },
  watch: {
    value: function (newVal) {
      this.visible = newVal
      if (newVal) {
        this.$nextTick(() => {
          this.rootClient = document.querySelector('.field-set-wrap').getBoundingClientRect()
          this.initEventListener()
        })
      }
    }
  },
  computed: {
    mountEle: function () {
      return () => document.querySelector('.param-set-wrap')
    },
    svgLineMapList: function () {
      return this.svgLineMap.filter(item => !item.hide)
    },
    isRight: function () {
      return this.mapKey === RIGHT_LINE_POINTS
    },
    getMidpoint: function () {
      // 线性插值方法
      return (record) => {
        const t = 0.5
        const interpolatedX = record.x1 + t * (record.x2 - record.x1);
        const interpolatedY = record.y1 + t * (record.y2 - record.y1);
        return {
          x: interpolatedX - 9,
          y: interpolatedY - 9,
        }
      }
    },
    // 计算节点是否连接
    computedIsConnect: function () {
      return (record, isRight) => {
        let isConnect = false
        for (const item of this.svgLineMap) {
          isConnect = item[isRight ? RIGHT_LINE_POINTS : LEFT_LINE_POINTS].some(line => line.key === record.key)
          if (isConnect) {
            break
          }
        }
        return isConnect
      }
    }
  },
  destroyed () {
    this.mutationObserver?.disconnect()
  },
  methods: {
    // 父子、祖孙组件通讯通用方法
    provideCommon () {
      return {
        rightTreeData: this.fieldRightData,
        leftTreeData: this.fieldLeftData,
        selectLineMapNode: this.selectLineMapNode
      }
    },
    onDataMapChange (mapType) {
      this.$set(this.selectLineMapNode, 'dataMap', { ...mapType })
    },
    onAddField (parentNode = null) {
      this.fieldVisible = true
      this.form.parentNode = parentNode
    },
    // 删除映射节点连接线
    onDeleteLine (lineIndex, index, linePoints) {
      linePoints.splice(lineIndex, 1)
      if (linePoints.length === 0) {
        this.svgLineMap.splice(index, 1)
      } else {
        // 更新中间映射节点类型
        this.updateMiddleNodeMapType(this.svgLineMap[index])
      }
    },
    // 更新映射节点的映射类型
    updateMiddleNodeMapType (mapNode) {
      const mapType = computeMapRelation(mapNode)
      const dataMap = this.DATA_MAP_LIST.find(item => item.optionaType === mapType)
      if (dataMap) {
        this.$set(mapNode, 'dataMap', {
          mapTypeValue: dataMap.value,
          mapTypeText: dataMap.label
        })
      }
    },
    // 删除树结构字段事件
    onDeleteField (record) {
      const parentNode = getParentNode(record.key, this.fieldRightData) // 父级节点
      const operateList = parentNode ? parentNode.children : this.fieldRightData // 当前要操作的节点集合
      const index = operateList.findIndex(node => node.key === record.key)
      const currentNode = operateList[index] // 缓存记录下当前节点
      const childrenNodes = getChildrenNode(currentNode) // 当前节点下所有子级节点
      if (index > -1) {
        operateList.splice(index, 1)
      }
      // 同步删除 svgLineMap 中对应的节点
      const deleteKeys = [record.key, ...childrenNodes.map(item => item.key)] // 要删除的key，包含自身及其所有子级key集合
      const deleteIndexs = [] // 将要删除的索引集合
      for (const [index, node] of this.svgLineMap.entries()) {
        for (let i = node[RIGHT_LINE_POINTS].length - 1; i >= 0; i--) {
          if (deleteKeys.includes(node[RIGHT_LINE_POINTS][i].key)) {
            node[RIGHT_LINE_POINTS].splice(i, 1)
            // 映射节点右侧节点全部删除，则需要删除当前映射节点，记录要删除节点索引到 deleteIndexs
            if (node[RIGHT_LINE_POINTS].length === 0) {
              deleteIndexs.push(index)
            }
          }
        }
      }
      // 根据 deleteIndexs 开始删除 svgLineMap 中的元素
      for (let i = this.svgLineMap.length - 1; i >= 0; i--) {
        if (deleteIndexs.includes(i)) {
          this.svgLineMap.splice(i, 1)
        }
      }
    },
    onCancelField () {
      this.fieldVisible = false
      this.form = {
        parentNode: null,
        name: ''
      }
    },
    onOkField () {
      const parentNode = this.form.parentNode
      if (parentNode) {
        const targetNode = findNode(parentNode.key, this.fieldRightData)
        const newNode = {
          title: this.form.name,
          key: uuid(),
          level: parentNode.level + 1,
          scopedSlots: {
            title: 'custom',
          }
        }
        if (!targetNode.children) {
          this.$set(targetNode, 'children', [newNode])
        } else {
          targetNode.children.push(newNode)
        }
      } else {
        this.fieldRightData.push({
          title: this.form.name,
          key: uuid(),
          level: 1,
          scopedSlots: {
            title: 'custom',
          }
        })
      }
      this.onCancelField()
    },
    onOk () {
      this.onCancel()
    },
    onCancel () {
      this.$emit('input', false)
      this.mutationObserver?.disconnect()
    },
    onOpenDataMap (index) {
      this.selectLineMapNode = this.svgLineMap[index]
      this.dataMapVisible = true
    },
    // 选中映射线事件
    onSelectLine (lineKey, node, index) {
      this.selectKeys = [lineKey]
      this.activeKeys = [lineKey]
      this.onOverMiddleNodePoint(node, index, false)
    },
    // 当鼠标移入映射中间节点时，对应左右连接线处于激活状态
    onOverMiddleNodePoint (node, index, isHighlightAll = true) {
      if (this.drawing) {
        // 鼠标在节点上停留1秒，记录下需要合并的中间节点，连线成功后合并到该中间节点
        this.drawPassTimer = setTimeout(() => {
          this.drawPassNode = node
        }, 1000)
        return false
      }
      if (isHighlightAll) {
        const leftPointKeys = node[LEFT_LINE_POINTS].map(item => item.domKey)
        const rightPointKeys = node[RIGHT_LINE_POINTS].map(item => item.domKey)
        this.activeKeys = [...leftPointKeys, ...rightPointKeys]
      }
      this.moveTopLevel([...this.activeKeys, node.middleNodePoint.key], index)
    },
    // 当鼠标从映射中间节点移开时，选中节点保存激活状态
    onOutMiddleNodePoint () {
      clearTimeout(this.drawPassTimer)
      this.activeKeys = this.selectKeys
    },
    // 清理选中节点key和激活节点key
    clearKeys () {
      this.activeKeys = []
      this.selectKeys = []
    },
    // 移动 svg line 节点到指定元素最后面，保证当前图形显示在最上层，样式不被覆盖
    moveTopLevel (keys, index) {
      const svg = document.querySelector("#render-svg");
      const listWrapElem = document.querySelector(`.svg-map-${index}`)
      for (const key of keys) {
        const lineElem = document.querySelector(`[id='${key}']`)
        if (lineElem) {
          listWrapElem.appendChild(lineElem)
        }
      }
      svg.appendChild(listWrapElem)
    },
    // 判断元素是否包含指定className
    isPointDom (event, className) {
      return typeof event.target.className === 'string' ? event.target.className.includes(className) : false
    },
    onMouseDown (event) {
      const position = getClientRect(event, this.rootClient)
      this.drawLine.startPoint = position
      this.drawLine.targetPoint = position
      this.drawLine.startPoint.key = event.target.getAttribute('data-key')
      this.drawLine.startPoint.codeName = event.target.getAttribute('data-title')
      this.drawing = true
    },
    onMouseMove (event) {
      if (!this.drawing) {
        return
      }
      if (this.isPointDom(event, 'point end')) {
        event.target.classList.add('highlight')
      } else {
        this.clearHighlight()
      }
      this.drawLine.targetPoint = { x: event.pageX - this.rootClient.left, y: event.pageY - this.rootClient.top }
    },
    // 清除节点高亮样式
    clearHighlight () {
      const hignlightDom = document.querySelector('.point.highlight')
      if (hignlightDom) {
        hignlightDom.classList.remove('highlight')
      }
    },
    onMouseUp (event) {
      if (this.drawing) {
        this.drawing = false
        // 是否连接到右侧目标点
        if (this.isPointDom(event, 'point end')) {
          this.drawLine.targetPoint = getClientRect(event, this.rootClient)
          this.drawLine.targetPoint.key = event.target.getAttribute('data-key')
          this.drawLine.targetPoint.codeName = event.target.getAttribute('data-title')
          this.addLine()
        }
        this.clearHighlight()
        this.drawPassNode = null
      }
    },
    onDeleteMapNode (index) {
      this.svgLineMap.splice(index, 1)
    },
    // 添加线到画布中
    addLine () {
      // 获取中间映射节点可显示的空白距离
      const middleMoveDistance = (this.drawLine.targetPoint.x - this.drawLine.startPoint.x) / 2
      // 获取中间映射节点的X轴位置
      const middlePointX = this.drawLine.targetPoint.x - middleMoveDistance - this.middleNodeStyle.width / 2
      // 获取第一次连线时，映射节点的X坐标，后续连线坐标都使用相同值，保证映射节点水平方向对齐
      if (this.middleNodeStyle.x === 0) {
        this.middleNodeStyle.x = middlePointX
      }
      const middleNodePoint = {
        key: uuid(),
        x: this.middleNodeStyle.x,
        y: this.drawLine.targetPoint.y - this.middleNodeStyle.height / 2,
      }
      // 新增映射节点左边连线节点
      const leftLinePoint = { key: this.drawLine.startPoint.key, domKey: `${this.drawLine.startPoint.key}-${middleNodePoint.key}`, codeName: this.drawLine.startPoint.codeName, x1: this.drawLine.startPoint.x, y1: this.drawLine.startPoint.y, x2: middleNodePoint.x, y2: middleNodePoint.y + this.middleNodeStyle.height / 2 }
      // 映射节点右边连线集合
      const rightLinePoint = { key: this.drawLine.targetPoint.key, domKey: `${this.drawLine.targetPoint.key}-${middleNodePoint.key}`, codeName: this.drawLine.targetPoint.codeName, x1: middleNodePoint.x + this.middleNodeStyle.width, y1: middleNodePoint.y + this.middleNodeStyle.height / 2, x2: this.drawLine.targetPoint.x, y2: this.drawLine.targetPoint.y }
      const lineInfo = this.getLineInfo()
      if (!lineInfo.isExist) {
        this.upDataLineMap({ lineInfo, leftLinePoint, rightLinePoint, middleNodePoint })
      } else {
        this.message.warn('已存在该数据映射')
      }
    },
    // 新增更新数据映射节点
    upDataLineMap ({ lineInfo, leftLinePoint = null, rightLinePoint = null, middleNodePoint }) {
      if (this.drawPassNode) {
        // 合并到指定映射类型节点
        this.mergeMapNode({ mapNode: this.drawPassNode, leftLinePoint, rightLinePoint })
      } else if (!lineInfo.rightNodeForMapNode) {
        // 右侧没有节点连接过，新增映射节点
        const mapNode = { [LEFT_LINE_POINTS]: [leftLinePoint], middleNodePoint, [RIGHT_LINE_POINTS]: [rightLinePoint], alignKey: rightLinePoint.key }
        this.mergeMapNode({ mapNode })
      } else {
        // 右侧节点连线已存在，直接合并到左侧连接线集合
        this.mergeMapNode({ mapNode: lineInfo.rightNodeForMapNode, leftLinePoint })
      }
    },
    // 合并连接线到指定的映射节点
    mergeMapNode ({ mapNode, leftLinePoint = null, rightLinePoint = null }) {
      if (!leftLinePoint && !rightLinePoint) {
        this.svgLineMap.push(mapNode)
      }
      if (this.isMatchManyToMany({ mapNode, leftLinePoint, rightLinePoint })) {
        return false
      }
      if (leftLinePoint) {
        const leftLinePoints = mapNode[LEFT_LINE_POINTS]
        const isExistLeft = leftLinePoints.some(item => item.key === leftLinePoint.key)
        if (!isExistLeft) {
          // 设置新加入节点Y轴上跟之前的映射节点 middleNodePoint Y轴对齐
          leftLinePoint.y2 = mapNode.middleNodePoint.y + this.middleNodeStyle.height / 2
          leftLinePoints.push(leftLinePoint)
        }
      }
      if (rightLinePoint) {
        const rightLinePoints = mapNode[RIGHT_LINE_POINTS]
        const isExistRight = rightLinePoints.some(item => item.key === rightLinePoint.key)
        if (!isExistRight) {
          // 同上
          rightLinePoint.y1 = mapNode.middleNodePoint.y + this.middleNodeStyle.height / 2
          rightLinePoints.push(rightLinePoint)
        }
      }
      this.updateMiddleNodeMapType(mapNode)
    },
    // 是否满足多对多映射，目前暂不支持该类型映射
    isMatchManyToMany ({ mapNode, leftLinePoint, rightLinePoint }) {
      const tempMapNode = JSON.parse(JSON.stringify(mapNode))
      tempMapNode[LEFT_LINE_POINTS].push(leftLinePoint)
      tempMapNode[RIGHT_LINE_POINTS].push(rightLinePoint)
      if (computeMapRelation(tempMapNode) === MANY_FOR_MANY) {
        this.message.warn('目前不支持多对多映射类型')
        return true
      }
      return false
    },
    // 获取数据映射字段是否连线过
    getLineInfo () {
      let rightNodeForMapNode = null // 已连接的右侧节点
      let isExist = false // 判断在同一个映射节点里同时是否已经同时存在左侧节点和右侧节点
      for (const item of this.svgLineMap) {
        if (!isExist) {
          isExist = item[LEFT_LINE_POINTS].some(item => this.drawLine.startPoint.key === item.key)
            &&
            item[RIGHT_LINE_POINTS].some(item => this.drawLine.targetPoint.key === item.key)
        }
        if (!rightNodeForMapNode) {
          const rightNode = item[RIGHT_LINE_POINTS].find(line => line.key === this.drawLine.targetPoint.key)
          if (rightNode) {
            rightNodeForMapNode = item
          }
        }
      }
      return {
        rightNodeForMapNode,
        isExist
      }
    },
    initEventListener () {
      const rightTarget = document.querySelector(`[data-key='${RIGHT_LINE_POINTS}']`)
      const leftTarget = document.querySelector(`[data-key='${LEFT_LINE_POINTS}']`)
      this.initMutationObserver([leftTarget, rightTarget])
      this.initScrollObserver([leftTarget, rightTarget])
    },
    // 监听DOM滚动事件
    initScrollObserver (targets = []) {
      for (const elem of targets) {
        elem.addEventListener('scroll', (event) => {
          this.domChange([event])
        })
      }
    },
    // 监听DOM树变化事件
    initMutationObserver (targets = []) {
      this.mutationObserver = new MutationObserver(this.domChange)
      for (const elem of targets) {
        this.mutationObserver.observe(elem, {
          childList: true,
          subtree: true,
        })
      }
    },
    domChange (mutations) {
      let rootNode = mutations[0].target
      while (rootNode && rootNode.getAttribute('class') !== 'tree-wrap') {
        rootNode = rootNode.parentNode
      }
      this.mapKey = rootNode.getAttribute('data-key')
      this.$nextTick(() => {
        this.updateAllNodePoint()
      })
    },
    // 是否超出元素区域可视范围内，并返回显示状态和元素
    getVisibleInfo (key, prefixClass) {
      const nodeElem = document.querySelector(`${prefixClass}[data-key='${key}']`)
      const containerElem = document.querySelector(`[data-key='${this.mapKey}']`)
      if (!nodeElem || !containerElem) {
        return {
          visible: false,
          elem: null
        }
      }
      const nodePoint = nodeElem.getBoundingClientRect()
      const containerPoint = containerElem.getBoundingClientRect()
      return {
        visible: nodePoint.y >= containerPoint.y && nodePoint.y <= containerPoint.y + containerPoint.height,
        elem: nodeElem
      }
    },
    // 获取出现在可视范围内的节点
    getVisibleNodes (linePoints, prefixClass) {
      const visibleNodes = [] // 记录可视范围内显示的节点
      for (const line of linePoints) {
        const visibleObj = this.getVisibleInfo(line.key, prefixClass)
        if (visibleObj.visible) {
          visibleNodes.push({
            line: line,
            elem: visibleObj.elem
          })
        }
      }
      return visibleNodes
    },
    /**
     * 更新所有节点连接线坐标 , 重新计算连接线节点隐藏数
     * 当某个映射节点左右任意一边连线被全部隐藏，则该映射节点也隐藏
     * 隐藏的判断条件：节点删除，节点超出可视范围内 
     *  
     */
    updateAllNodePoint () {
      for (const item of this.svgLineMap) {
        // 获取 item 左侧可视节点
        const leftVisibleNodes = this.getVisibleNodes(item[LEFT_LINE_POINTS], '.point.start')
        // 获取 item 右侧可视节点
        const rightVisibleNodes = this.getVisibleNodes(item[RIGHT_LINE_POINTS], '.point.end')
        const visibleNodes = this.isRight ? rightVisibleNodes : leftVisibleNodes
        // 更新映射节点连线显示隐藏状态
        for (const node of item[this.isRight ? RIGHT_LINE_POINTS : LEFT_LINE_POINTS]) {
          const isVisible = visibleNodes.some(item => item.line.key === node.key)
          this.$set(node, 'hide', !isVisible)
        }
        // 获取对齐节点, 如果对齐节点消失，则重新设置一个对齐节点
        let alignNode = visibleNodes.find(node => node.line.key === item.alignKey)
        if (!alignNode) {
          alignNode = visibleNodes[0]
        }
        // 当映射节点左右任意一边连线被全部隐藏，则该映射节点也隐藏
        const isVisibleNodes = leftVisibleNodes.length === 0 || rightVisibleNodes.length === 0
        this.$set(item, 'hide', isVisibleNodes)
        // 重新设置可视范围内节点连线坐标
        for (const node of visibleNodes) {
          const alignNodeClient = getClientRect(alignNode?.elem, this.rootClient)
          const nodePoint = getClientRect(node?.elem, this.rootClient)
          // 右侧树滚动或DOM发生变化
          if (this.isRight) {
            // 映射节点跟随右侧菜单树对齐节点Y轴方向上变动
            const y = alignNodeClient.y - this.middleNodeStyle.height / 2
            this.$set(item.middleNodePoint, 'y', y)
            this.$set(node.line, 'y1', alignNodeClient.y)
            this.$set(node.line, 'y2', nodePoint.y)
            for (const leftLine of item[LEFT_LINE_POINTS]) {
              this.$set(leftLine, 'y2', alignNodeClient.y)
            }
          } else {
            // 左侧树滚动或DOM发生变化
            this.$set(node.line, 'x1', nodePoint.x)
            this.$set(node.line, 'y1', nodePoint.y)
          }
        }
        // 设置当前可视范围内节点对应的连线隐藏节点个数
        if (this.isRight) {
          // 计算左侧隐藏节点个数
          this.computedHideCount({
            mapNode: item,
            visibleNodes: leftVisibleNodes,
            key: RIGHT_LINE_POINTS,
            originaData: this.fieldLeftData
          })
        } else {
          // 计算右侧隐藏节点个数
          this.computedHideCount({
            mapNode: item,
            visibleNodes: rightVisibleNodes,
            key: LEFT_LINE_POINTS,
            originaData: this.fieldRightData
          })
        }
      }
      // 重置hideCount
      if (this.isRight) {
        this.resetHideNodeCount(this.fieldLeftData)
      } else {
        this.resetHideNodeCount(this.fieldRightData)
      }
      this.recordHideNodes = []
      this.hideCountList = []
    },
    // 计算当前可视范围内节点对应的连线隐藏节点个数
    computedHideCount ({ mapNode, visibleNodes, key, originaData }) {
      const hideNumber = mapNode[key].reduce((total, line) => {
        if (line.hide) {
          total++
        }
        return total
      }, 0)
      for (const node of visibleNodes) {
        const hideNode = this.hideCountList.find(item => item.key === node.line.key)
        if (hideNode) {
          hideNode.count = hideNode.count + hideNumber
        } else {
          this.hideCountList.push({
            key: node.line.key,
            count: hideNumber
          })
        }
      }
      this.setHideCount(originaData)
    },
    // 设置隐藏节点个数
    setHideCount (dataList) {
      for (const hideNode of this.hideCountList) {
        const node = findNode(hideNode.key, dataList)
        if (node) {
          this.$set(node, 'hideCount', hideNode.count)
          this.recordHideNodes.push(node)
        }
      }
    },
    // 重置hideCount，不在当前可视范围内 recordHideNodes 中的节点hideCount设置为0
    resetHideNodeCount (list) {
      const process = (_list) => {
        for (const node of _list) {
          const isExist = this.recordHideNodes.some(item => item.key === node.key)
          if (!isExist) {
            this.$set(node, 'hideCount', 0)
          }
          if (node.children) {
            process(node.children)
          }
        }
      }
      process(list)
    }
  }
}
</script>

<style lang="less" scoped>
.param-set-wrap {
  .field-set-wrap {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    &.drawing {
      user-select: none;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #ededed;
    }
    ::v-deep .ant-tree-node-content-wrapper:hover {
      background-color: #fff;
    }
    ::v-deep .ant-tree-treenode-switcher-open,
    ::v-deep .ant-tree-treenode-switcher-close {
      position: relative;
      .point {
        position: absolute;
        // margin-top: -17px;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background-color: #1677ff;
        padding: 4px;
        right: -5px;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
        cursor: crosshair;
        box-sizing: border-box;
        transition: all 0.3s;
        z-index: 9;
        &.highlight {
          background-color: #ff4d4f;
        }
        &.end {
          left: 0px;
          user-select: none;
        }
        &::before {
          content: " ";
          display: inline-block;
          position: absolute;
          background-color: #fff;
          width: 6px;
          height: 6px;
          border-radius: 6px;
          box-shadow: 0px 0.5px 1.5px rgba(0, 0, 0, 0.22) inset;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &.connect::before {
          background-color: #1677ff;
        }
      }
    }
  }
  .field-line-svg-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .line-wrap {
      cursor: pointer;
      .delete-icon {
        width: 100%;
        height: 100%;
        padding: 5px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #ff4d4f;
        display: none;
        transition: all 0.3s;
      }
      &.select .delete-icon {
        display: flex;
      }
      &.active .map-line {
        stroke: #ff4d4f;
      }
    }
    .map-line {
      stroke: #1677ff;
      fill: none;
      stroke-width: 2px;
      transition: all 0.3s;
    }
    .middle-node-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      color: #1890ff;
      background-color: #e6f7ff;
      border: 1px solid #91d5ff;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      user-select: none;
      @keyframes linearGradientMove {
        100% {
          background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
        }
      }
      &.draw-pass {
        border: 0px;
        background: linear-gradient(90deg, #ff4d4f 50%, transparent 0) repeat-x,
          linear-gradient(90deg, #ff4d4f 50%, transparent 0) repeat-x,
          linear-gradient(0deg, #ff4d4f 50%, transparent 0) repeat-y,
          linear-gradient(0deg, #ff4d4f 50%, transparent 0) repeat-y;
        background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
        background-position: 0 0, 0 100%, 0 0, 100% 0;
        background-color: #e6f7ff;
        animation: linearGradientMove 0.3s infinite linear;
      }
      &.drawing {
        cursor: crosshair;
      }
      .flex {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .delete {
        position: absolute;
        right: -13px;
        top: 5px;
        transition: all 0.3s;
        opacity: 0;
      }
      &:hover .delete:not(.drawing) {
        opacity: 1;
      }
    }
  }
  .field-left-wrap,
  .field-right-wrap {
    z-index: 3;
    width: 200px;
    border: 1px solid #ededed;
    border-radius: 5px;
    box-sizing: border-box;
    margin: 0 20px;
    background-color: transparent;
    ::v-deep .ant-tree-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .icon-add {
      color: #1677ff;
      font-size: 12px;
      cursor: pointer;
    }
    .icon-delete {
      color: #ff4d4f;
      margin-left: 4px;
      font-size: 12px;
      cursor: pointer;
    }
    .tree-wrap {
      height: 300px;
      padding: 0 10px;
      overflow-y: scroll;
      overflow-x: visible;
      &::-webkit-scrollbar {
        width: 2px;
      }
    }
  }
}
</style>