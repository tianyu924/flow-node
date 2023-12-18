<template>
  <div class="node-container">
    <div class="node-wrap computed-node clear-defalut">
      <div class="icon"></div>
      <div class="wrap">
        {{ node.data.title }}
      </div>
    </div>
    <ArrowLine :node="node" />
  </div>
</template>

<script>
import ArrowLine from './ArrowLine.vue'
export default {
  name: "ComputedNode",
  components: {
    ArrowLine
  },
  props: {
    node: {
      type: Object,
      default: () => { }
    }
  }
}
</script>

<style lang="less" scoped>
.computed-node {
  position: relative;
  .icon {
    width: 0;
    height: 0;
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;
    border-bottom: 80px solid #fff;
  }
  .wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>