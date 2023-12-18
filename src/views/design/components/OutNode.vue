<template>
  <div class="node-container">
    <div class="node-wrap out-node">
      <div class="title">
        <span class="text">{{ computedNode.title }}</span>
        <span class="type">{{ computedNode.method }}</span>
      </div>
    </div>
    <ArrowLine :node="node" />
  </div>
</template>

<script>
import ArrowLine from './ArrowLine.vue'
export default {
  name: 'OutNode',
  components: {
    ArrowLine,
  },
  props: {
    node: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    computedNode: function () {
      return {
        title: '',
        method: '',
        ...(this.node?.data || {})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.out-node {
  display: flex;
  flex-direction: column;
  .title {
    padding: 10px;
    border-bottom: 1px solid #dedede;
    display: flex;
    justify-content: space-between;
    .type {
      color: #dc8651;
    }
  }
  .content {
    flex: 1;
    text-align: center;
  }
}
</style>