<template>
  <div class="menu-wrap">
    <!-- 编辑器右键菜单组件 -->
    <ul class="ant-dropdown-menu">
      <li role="menuitem"
          :key="item.value"
          v-for="item in menus"
          @click="onClickMenu(item.fn)"
          class="ant-dropdown-menu-item">{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  data () {
    return {
      menus: []
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    data: {
      handler: function (newVal) {
        this.menus = newVal
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    this.initEvent()
  },
  methods: {
    initEvent () {
      const editorElem = document.querySelector('#editor')
      const editorClient = editorElem.getBoundingClientRect()
      const menuElem = document.querySelector('.menu-wrap')
      editorElem.addEventListener('contextmenu', (event) => {
        event.preventDefault()
        menuElem.style.display = 'block'
        menuElem.style.left = `${event.pageX - editorClient.x + 5}px`
        menuElem.style.top = `${event.pageY - editorClient.y + 5}px`
      })
      editorElem.addEventListener('click', () => {
        menuElem.style.display = 'none'
      })
    },
    onClickMenu (fn) {
      fn && fn()
      this.hideMenu()
    },
    hideMenu () {
      const menuElem = document.querySelector('.menu-wrap')
      menuElem.style.display = 'none'
    },
  }
}
</script>

<style lang="less" scoped>
.menu-wrap {
  display: none;
  position: absolute;
  z-index: 999;
}
</style>