<template>
  <div class="design-render">
    <div class="render-layout-wrap">
      <RenderLayout :key="item.id"
                    v-for="item in data"
                    :node="item" />
    </div>
  </div>
</template>

<script>
import { addListener } from './utils/emits'
import { uuid } from './utils/server'
import RenderLayout from './render/RenderLayout.vue'
export default {
  name: 'Design',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  provide () {
    return {
      getEdit: this.getEdit
    }
  },
  data () {
    return {
      _isEdit: true
    }
  },
  watch: {
    isEdit: {
      handler: function (newVal) {
        this._isEdit = newVal
      },
      immediate: true
    }
  },
  components: {
    RenderLayout
  },
  created () {
    addListener('add-node', this.bindAddNode)
    addListener('click-node', this.bindClickNode)
  },
  methods: {
    getEdit () {
      return this._isEdit
    },
    bindAddNode (data) {
      this.addNodeHandle(data)
    },
    bindClickNode (node) {
      this.$emit('select', node)
    },
    getNodeParent (list, tragetNode, parentNode) {
      let _parentNode = null
      const isFind = list.some((node) => {
        return node.id === tragetNode.id
      })
      if (isFind) {
        _parentNode = parentNode
      } else {
        for (const item of list) {
          if (item.children) {
            _parentNode = this.getNodeParent(item.children, tragetNode, item)
            if (_parentNode) {
              break
            }
          }
        }
      }
      return _parentNode
    },
    addNodeHandle ({ targetNode, newNode }) {
      let node = null
      if (newNode.type === 1) {
        node = {
          id: uuid(),
          isConditionNode: true,
          children: [
            {
              id: uuid(),
              children: [
                {
                  id: uuid(),
                  type: 1,
                  data: {
                    title: '条件1'
                  }
                }
              ]
            },
            {
              id: uuid(),
              children: [
                {
                  id: uuid(),
                  type: 1,
                  data: {
                    title: '条件2'
                  }
                }
              ]
            }
          ]
        }
      } else {
        node = {
          id: uuid(),
          type: newNode.type,
          data: {
            title: newNode.name
          }
        }
      }
      const parentNode = this.getNodeParent(this.data, targetNode, null)
      const operateList = parentNode ? parentNode.children : this.data
      const index = operateList.findIndex((item) => {
        return item.id === targetNode.id
      })
      operateList.splice(index + 1, 0, node)
    }
  }
}
</script>

<style lang="less" scoped>
.design-render {
  flex: 1;
  overflow: auto;
  border: 1px solid #ededed;
  background: rgba(0, 0, 0, 0.03);
  &::-webkit-scrollbar {
    width: 4px;
  }
}
.render-layout-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
}
</style>