<template>
  <div class="end-node">
    {{ node.data.title }}
  </div>
</template>

<script>
export default {
  name: 'EndNode',
  props: {
    node: {
      type: Object,
      default: () => { }
    }
  }
}
</script>

<style lang="less" scoped>
.end-node {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: 0;
  background: #f44016;
}
</style>