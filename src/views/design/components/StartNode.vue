<template>
  <div class="node-container">
    <div class="node-wrap start-node active clear-defalut"
         @click.stop="onClickNode">
      {{ node.data.title }}
    </div>
    <ArrowLine :node="node" />
  </div>
</template>

<script>
import ArrowLine from './ArrowLine.vue'
import { emitListener } from '../utils/emits'
export default {
  name: 'StartNode',
  components: {
    ArrowLine
  },
  props: {
    node: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    onClickNode () {
      emitListener('click-node', this.node)
    }
  }
}
</script>

<style lang="less" scoped>
.start-node {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 4px solid #3995fb;
  background: #fff;
  cursor: pointer;
  position: relative;
}
</style>