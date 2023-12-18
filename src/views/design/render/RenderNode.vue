<template>
  <component :key="node.id"
             v-bind="$props"
             :is="TYPE_MAP[node.type].nodeName">
  </component>
</template>

<script>
import StartNode from '../components/StartNode.vue'
import EndNode from '../components/EndNode.vue'
import InputNode from '../components/InputNode.vue'
import OutNode from '../components/OutNode.vue'
import ConditionNode from '../components/ConditionNode.vue'
import ParseNode from '../components/ParseNode.vue'
import ComputedNode from '../components/ComputedNode.vue'
import { TYPE_MAP } from '../utils/config'
export default {
  name: 'RenderNode',
  components: {
    StartNode,
    EndNode,
    InputNode,
    OutNode,
    ConditionNode,
    ParseNode,
    ComputedNode
  },
  props: {
    node: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      TYPE_MAP: TYPE_MAP
    }
  },
  methods: {

  }
}
</script>

<style lang="less">
.condition-node-list {
  display: flex;
  padding-top: 30px;
}

.node-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  .node-wrap:not(.clear-defalut) {
    width: 200px;
    height: 110px;
    position: relative;
    background: #fff;
    border-radius: 8px;
    margin: 0 20px;
    cursor: pointer;
  }
}
</style>