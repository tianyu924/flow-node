<template>
  <div class="computed-wrap">
    <a-form-model-item label="计算"
                       help="请输入JSON格式对象，鼠标右键可格式化">
      <div class="editor-wrap">
        <pre id="editor"
             style="height: 250px;"></pre>
        <!-- 右键菜单 -->
        <ContextMenu :data="menus" />
      </div>
    </a-form-model-item>
  </div>
</template>

<script>
import ace from "ace-builds"
import "ace-builds/webpack-resolver"
import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-min-noconflict/ext-beautify'
import ContextMenu from './ContextMenu.vue'
export default {
  name: 'ComputedItem',
  components: {
    ContextMenu
  },
  props: {
    form: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      beautify: null,
      menus: [
        {
          label: '格式化代码',
          fn: this.formatCode
        }
      ]
    }
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function (newForm) {
        this.$set(newForm, 'json', newForm?.json || '')
      }
    }
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      this.editor = ace.edit("editor", {
        theme: "ace/theme/twilight",
        mode: "ace/mode/json",
        enableSnippets: true,
        enableLiveAutocompletion: true, // 启用实时自动完成功能 （比如：智能代码提示）
        enableBasicAutocompletion: true, // 启用基本自动完成功能
      })
      this.beautify = ace.require("ace/ext/beautify")
    },
    formatCode () {
      this.beautify.beautify(this.editor.session);
    }
  }
}
</script>

<style lang="less" scoped>
.computed-wrap {
  .clear-comment ::v-deep.ace_comment {
    font-style: initial;
    color: #717790;
  }
}
</style>