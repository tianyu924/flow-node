<template>
  <div class="custom-item-wrap">
    <a-form-model-item label="自定义"
                       help="请输入JS代码，鼠标右键可格式化代码、校验代码">
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
import { LEFT_LINE_POINTS } from '../../utils/config'
import { uuid } from '../../utils/server'
import ace from "ace-builds"
import "ace-builds/webpack-resolver"
import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-min-noconflict/ext-beautify'
import ContextMenu from './ContextMenu.vue'
export default {
  name: 'CustomItem',
  inject: ['mapData'],
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
      value: '',
      editor: null,
      beautify: null,
      menus: [
        {
          label: '格式化代码',
          fn: this.formatCode
        },
        {
          label: '校验代码',
          fn: this.checkCode
        }
      ],
      MAP_FIELD: '$mapField'
    }
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function (newForm) {
        this.$set(newForm, 'code', newForm?.code || '')
      }
    }
  },
  computed: {
    fields: function () {
      const mapNode = this.mapData.getMapData().selectLineMapNode
      return mapNode[LEFT_LINE_POINTS]
    },
    mapField: function () {
      const data = {}
      for (const item of this.fields) {
        data[item.codeName] = item.value || undefined
      }
      return data
    },
    // 映射字段代码智能提示
    completions: function () {
      const list = []
      for (const item of this.fields) {
        list.push({
          name: `${this.MAP_FIELD}.${item.codeName}`,
          value: `${this.MAP_FIELD}.${item.codeName}`,
          score: 100,
          meta: `映射字段 ${item.codeName}`
        })
      }
      return list
    }
  },
  mounted () {
    this.initEditor()
  },
  beforeDestroy () {
    this.updateCompleter(true)
  },
  methods: {
    initEditor () {
      this.editor = ace.edit("editor", {
        theme: "ace/theme/twilight",
        mode: "ace/mode/javascript",
        enableSnippets: true,
        enableLiveAutocompletion: true, // 启用实时自动完成功能 （比如：智能代码提示）
        enableBasicAutocompletion: true, // 启用基本自动完成功能
      })
      this.beautify = ace.require("ace/ext/beautify")
      // 添加自定义代码提示
      this.updateCompleter()
      this.editor.setStyle('clear-comment')
      this.editor.setValue(`//可使用 ${this.MAP_FIELD} 变量访问当前的映射字段，例：${this.MAP_FIELD}.id\n//需要将处理好的结果使用return返回\n`)
      this.editor.gotoLine(this.editor.session.getLength())
    },
    // 更新映射字段代码智能提示
    updateCompleter (isRemove = false) {
      const completers = this.editor.completers
      const getCompletions = (editor, session, pos, prefix, callback) => {
        callback(null, this.completions)
      }
      const completer = completers.find(item => item.id === 'mapFieldCompleter')
      if (completer) {
        if (isRemove) {
          completer.getCompletions = () => { }
        } else {
          completer.getCompletions = getCompletions
        }
      } else {
        completers.push({
          id: 'mapFieldCompleter',
          getCompletions
        })
      }
    },
    formatCode () {
      this.beautify.beautify(this.editor.session);
    },
    isHasProperty (target, key) {
      if (!target.hasOwnProperty(key)) {
        throw new TypeError(`映射字段 ${key} 不存在`)
      }
    },
    checkCode () {
      const codeChar = this.editor.getValue()
      if (codeChar) {
        try {
          // 使用代理拦截，检查自定义代码中是否使用了未定义的映射字段
          const proxy = new Proxy(this.mapField, {
            get: (target, key, receiver) => {
              this.isHasProperty(target, key)
              return Reflect.get(target, key, receiver)
            },
            set: (target, key, receiver) => {
              this.isHasProperty(target, key)
              return Reflect.set(target, key, receiver)
            }
          })
          const checkChar = `${uuid()}`
          const tempCodeChars = `const checkChar = '${checkChar}';\n${codeChar}\nreturn checkChar`
          const result = new Function(this.MAP_FIELD, tempCodeChars)(proxy)
          if (result === checkChar) {
            throw new TypeError('无return返回值')
          }
          this.message.success('校验通过')
        } catch (error) {
          const message = error.name === 'TypeError' ? error.message : '代码片段不正确'
          this.$message.error(message)
          // console.error(error)
        }
      } else {
        this.message.warn('请输入代码片段')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.custom-item-wrap {
  .editor-wrap {
    position: relative;
    margin-top: 5px;
  }
  .clear-comment ::v-deep.ace_comment {
    font-style: initial;
    color: #717790;
  }
}
</style>