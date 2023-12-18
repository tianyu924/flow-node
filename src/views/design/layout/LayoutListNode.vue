<template>
  <div class="node-container condition-node-wrap">
    <div class="condition-node-list">
      <RenderLayout :key="item.id"
                    v-for="item in (node.children || [])"
                    :node="item" />
    </div>
    <div class="left-line"></div>
    <div class="right-line"></div>
    <div class="horizontal-line"></div>
    <div class="node-cross-line"></div>
  </div>
</template>
<script>
import ArrowLine from '../components/ArrowLine.vue'
export default {
  name: "LayoutListNode",
  components: {
    RenderLayout: () => import('../render/RenderLayout.vue'),
    ArrowLine
  },
  props: {
    node: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
.condition-node-wrap {
  position: relative;
  .node-cross-line {
    width: 2px;
    flex-grow: 1;
    background-color: #dedede;
    transform: translateX(-1px);
  }
  .horizontal-line {
    position: absolute;
    width: 2px;
    height: 30px;
    top: 0;
    transform: translateX(-50%);
    background-color: #dedede;
  }
  .left-line {
    position: absolute;
    height: 2px;
    width: 100%;
    left: 0;
    top: 0px;
    background-color: #dedede;
  }
  .right-line {
    position: absolute;
    height: 2px;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #dedede;
  }
  &.first-node > .left-line,
  &.first-node > .right-line {
    left: 50%;
    width: 50%;
  }
  &.last-node > .left-line,
  &.last-node > .right-line {
    right: 50%;
    width: 50%;
  }
  .condition-node-list {
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    position: relative;
  }
}
</style>