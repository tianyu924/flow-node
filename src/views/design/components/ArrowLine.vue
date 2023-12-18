<template>
  <div class="arrow-line">
    <div class="add-btn">
      <a-popover placement="right"
                 arrow-point-at-center
                 v-model="visible"
                 trigger="click"
                 class="popover-wrap">
        <template slot="content">
          <NodeType @select="onSelect" />
        </template>
        <a-button type="primary"
                  shape="circle"
                  v-if="isEdit"
                  icon="plus" />
      </a-popover>
    </div>
  </div>
</template>

<script>
import NodeType from './NodeType.vue'
import { emitListener } from '../utils/emits'
export default {
  name: 'ArrowLine',
  components: {
    NodeType
  },
  inject: ['getEdit'],
  props: {
    node: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      visible: false,
    }
  },
  computed: {
    isEdit: function () {
      return this.getEdit()
    }
  },
  methods: {
    onSelect (node) {
      emitListener('add-node', {
        targetNode: this.node,
        newNode: node
      })
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.arrow-line {
  position: relative;
  width: 2px;
  height: 100px;
  user-select: none;
  .add-btn {
    position: absolute;
    right: 0;
    left: 0;
    top: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    // align-items: center;
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    transform: translateX(-50%);
    background-color: #dedede;
    content: "";
  }

  &:after {
    position: absolute;
    width: 0;
    height: 0;
    content: "";
    right: auto;
    bottom: 0;
    top: auto;
    border-top: 10px solid #dedede;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: none;
    transform: translateX(-50%);
  }
}
</style>