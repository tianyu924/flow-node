<template>
  <div class="layout-condition-wrap">
    <div class="condition-wrap">
      <div class="add-condition"
           @click="onAddNode"
           v-if="isEdit">添加条件</div>
      <template v-for="(item, index) in (node.children || [])">
        <LayoutListNode :class="getClass(index, node.children.length)"
                        :key="item.id"
                        :node="item" />
      </template>
    </div>
    <ArrowLine :node="node" />
    <!-- 条件判断 -->
    <ConditionJudge v-model="visible" />
  </div>
</template>

<script>
import ArrowLine from '../components/ArrowLine.vue'
import ConditionJudge from '../config-node/condition-judge/index.vue'
import { uuid } from '../utils/server'
export default {
  name: 'LayoutConditionNode',
  components: {
    LayoutListNode: () => import('./LayoutListNode.vue'),
    ArrowLine,
    ConditionJudge
  },
  props: {
    node: {
      type: Object,
      default: () => { }
    }
  },
  inject: ['getEdit'],
  data () {
    return {
      visible: false
    }
  },
  computed: {
    isEdit: function () {
      return this.getEdit()
    }
  },
  methods: {
    getClass (index, count) {
      if (index === 0) {
        return 'first-node'
      }
      if (index === count - 1) {
        return 'last-node'
      }
      return ''
    },
    onAddNode () {
      this.visible = true
      return false;
      const newNode = {
        id: uuid(),
        children: [
          {
            id: uuid(),
            type: 1,
            data: {
              title: `条件${this.node.children.length + 1}`
            }
          }
        ]
      }
      this.node.children.push(newNode)
    }
  }
}
</script>

<style lang="less">
.layout-condition-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .condition-wrap {
    display: flex;
  }
  .open-wrap {
    width: 220px;
  }
  .add-condition {
    position: absolute;
    top: -17px;
    width: 97px;
    height: 34px;
    line-height: 34px;
    border-radius: 6px;
    background-color: #e8f3ff;
    text-align: center;
    border: 1px solid #aad2ff;
    z-index: 9;
    transition: all 0.3s;
    cursor: pointer;
    left: 50%;
    transform: translateX(-50%);
    &:hover {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
  }
}
</style>