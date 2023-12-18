<template>
  <div class="node-type-wrap">
    <div class="node-type"
         :key="index"
         @click="onClick(item)"
         v-for="(item, index) in TYPE_LIST_MAP">
      <a-icon type="down-circle"
              :style="{'font-size': item.size, color: item.color}"
              theme="filled" />
      <div>{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import { TYPE_LIST_MAP } from '../utils/config'
export default {
  name: 'NodeType',
  data () {
    return {
      TYPE_LIST_MAP: TYPE_LIST_MAP
    }
  },
  methods: {
    onClick (node) {
      this.$emit('select', node)
    }
  }
}
</script>

<style lang="less" scoped>
.node-type-wrap {
  display: grid;
  grid-template-columns: auto auto auto;
  .node-type {
    margin: 5px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.3s;
    padding: 5px;
    box-sizing: border-box;
    &:hover {
      box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
        rgba(17, 17, 26, 0.1) 0px 0px 8px;
    }
  }
}
</style>