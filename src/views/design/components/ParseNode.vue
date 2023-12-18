<template>
  <div class="node-container">
    <div class="node-wrap parse-node  clear-defalut">
      {{ node.data.text }}
      <RunStatus nodeType="解析"
                 :status="2" />
    </div>
    <ArrowLine :node="node" />
  </div>
</template>

<script>
import ArrowLine from './ArrowLine.vue'
import RunStatus from './RunStatus.vue'
export default {
  name: "ParseNode",
  components: {
    ArrowLine,
    RunStatus
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
.parse-node {
  position: relative;
  width: 70px;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
}
.parse-node:before {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  right: 70px;
  border-width: 30px 35px;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
}
.parse-node:after {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  left: 70px;
  border-width: 30px 35px;
  border-style: solid;
  border-color: transparent transparent transparent #fff;
  top: 0;
}
</style>