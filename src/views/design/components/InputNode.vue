<template>
  <div class="node-container">
    <div class="node-wrap input-node active"
         @click.stop="onClickNode">
      <div class="title">
        <span class="text">{{ computedNode.title }}</span>
        <span class="type">{{ computedNode.method }}</span>
      </div>
      <RunStatus nodeType="输入"
                 :status="1">
        <template slot="custom">
          <a-row type="flex"
                 align="top">
            <a-col flex="80px">连接器：</a-col>
            <a-col :span="8">数字重庆中台系统</a-col>
            <a-col flex="80px">连接项：</a-col>
            <a-col :span="8">机构用户数据同步</a-col>
          </a-row>
          <a-row type="flex"
                 align="top">
            <a-col flex="80px">提供方：</a-col>
            <a-col :span="8">南华中天</a-col>
            <a-col flex="80px">连接方式：</a-col>
            <a-col :span="8">KAFKA</a-col>
          </a-row>
        </template>
      </RunStatus>
    </div>
    <ArrowLine :node="node" />
  </div>
</template>

<script>
import ArrowLine from './ArrowLine.vue'
import RunStatus from './RunStatus.vue'
import { emitListener } from '../utils/emits'
export default {
  name: 'InputNode',
  components: {
    ArrowLine,
    RunStatus
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
  },
  methods: {
    onClickNode () {
      emitListener('click-node', this.node)
    }
  }
}
</script>

<style lang="less" scoped>
.input-node {
  display: flex;
  flex-direction: column;
  .title {
    padding: 10px;
    border-bottom: 1px solid #dedede;
    display: flex;
    justify-content: space-between;
    .type {
      color: #50aedf;
    }
  }
  .content {
    flex: 1;
    text-align: center;
  }
}
</style>