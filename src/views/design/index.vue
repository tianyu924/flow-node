<template>
  <div class="xh-design-wrap">
    <div class="top-operate-wrap"></div>
    <div class="design-body-wrap">
      <DesignLayout :data="flowData" />
      <div class="design-config-node">
        <ConfigNode :node="node" />
      </div>
    </div>
  </div>
</template>

<script>
import { mockData } from './utils/mock'
import { addListener } from './utils/emits'
import DesignLayout from './DesignLayout.vue'
import ConfigNode from './config-node/index.vue'
export default {
  name: 'XHDesigner',
  components: {
    DesignLayout,
    ConfigNode
  },
  data () {
    return {
      flowData: mockData,
      node: null
    }
  },
  created () {
    addListener('click-node', this.bindClickNode)
    addListener('update-node', this.bindUpdateNode)
  },
  methods: {
    bindClickNode (node) {
      this.node = node
    },
    bindUpdateNode (form) {
      this.$set(this.node, 'data', form)
    }
  }
}
</script>

<style lang="less" scoped>
.design-body-wrap {
  display: flex;
  gap: 10px;
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
  .design-config-node {
    width: 500px;
    border: 1px solid #ededed;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 4px;
    }
  }
}
</style>