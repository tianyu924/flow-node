<template>
  <div class="node-container-wrap">
    <RenderNode v-bind="$props" />
  </div>
</template>

<script>
import { TYPE_MAP } from '../utils/config'
export default {
  name: "LayoutBaseNode",
  components: {
    RenderNode: () => import('../render/RenderNode.vue'),
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
  }
}
</script>

<style lang="less" scoped>
.node-container-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
}
</style>