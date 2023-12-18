<template>
  <div class="design-config-wrap">
    <div class="title">{{ title }}</div>
    <template v-if="node">
      <component :key="node.id"
                 v-bind="$props"
                 :is="TYPE_MAP[node.type].configName">
      </component>
    </template>
  </div>
</template>

<script>
import { TYPE_MAP } from '../utils/config'
import StartConfig from './StartConfig.vue'
import InputConfig from './InputConfig.vue'
export default {
  name: 'ConfigNode',
  components: {
    StartConfig,
    InputConfig
  },
  props: {
    node: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      TYPE_MAP: TYPE_MAP,
      title: ''
    }
  },
  computed: {
    nodeId: function () {
      return this.node ? this.node.id : ''
    }
  },
  watch: {
    nodeId: function () {
      this.title = TYPE_MAP[this.node.type].nodeText
    }
  }
}
</script>

<style lang="less" scoped>
.design-config-wrap {
  .title {
    text-align: center;
    background-color: #556891;
    height: 40px;
    line-height: 40px;
    color: #fff;
    margin-bottom: 20px;
    font-size: 15px;
  }
}
</style>