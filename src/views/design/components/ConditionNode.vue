<template>
  <div class="node-container">
    <div class="node-wrap condition-node active">
      <div class="title">
        {{ node.data.title }}
      </div>
      <div class="content">
        {{ node.data.text }}
      </div>
    </div>
    <ArrowLine :node="node" />
  </div>
</template>

<script>
import ArrowLine from './ArrowLine.vue'
export default {
  name: "ConditionNode",
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
.condition-node {
  display: flex;
  flex-direction: column;
  .title {
    padding: 10px;
    border-bottom: 1px solid #dedede;
  }
  .content {
    flex: 1;
    text-align: center;
  }
}
</style>