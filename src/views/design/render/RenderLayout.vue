<template>
  <div class="render-layout">
    <LayoutConditionNode v-bind="$props"
                         v-if="node.isConditionNode" />
    <LayoutBaseNode v-bind="$props"
                    v-else />
  </div>
</template>

<script>
import LayoutBaseNode from '../layout/LayoutBaseNode.vue'
import LayoutListNode from '../layout/LayoutListNode.vue'
import LayoutConditionNode from '../layout/LayoutConditionNode.vue'
export default {
  name: 'RenderLayout',
  components: {
    LayoutBaseNode,
    LayoutListNode,
    LayoutConditionNode
  },
  props: {
    node: {
      type: Object,
      default: () => { }
    }
  },
}
</script>

<style lang="less" scoped>
.render-layout {
  position: relative;
}
</style>