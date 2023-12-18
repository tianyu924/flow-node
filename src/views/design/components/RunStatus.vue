<template>
  <div class="run-status-wrap"
       v-if="!isEdit">
    <a-popover placement="right"
               v-model="visible"
               trigger="click"
               overlayClassName="run-info-wrap"
               destroyTooltipOnHide>
      <template slot="title">
        <div class="title">
          <div>
            <span>节点名称</span><a-tag color="blue"
                   style="margin-left: 5px;">{{nodeType}}</a-tag>
          </div>
          <a-button type="link"
                    size="small"
                    @click="onHide"
                    icon="close">
          </a-button>
        </div>
      </template>
      <template slot="content">
        <slot name="custom"></slot>
        <a-row type="flex"
               align="top">
          <a-col flex="80px">日志记录：</a-col>
          <a-col flex="auto">
            <div class="log-wrap">
              11-20 22:54 字段userName解析失败... </br>
              11-21 16:25 字段userName解析失败... </br>
              11-22 08:35 字段userName解析失败... </br>
              11-23 22:00 字段userName解析失败... </br>
              11-23 22:00 字段userName解析失败... </br>
              11-23 22:00 字段userName解析失败... </br>
              11-23 22:00 字段userName解析失败... </br>
            </div>
          </a-col>
        </a-row>
      </template>
      <a-icon type="check-circle"
              v-if="status === 1"
              theme="filled"
              style="color: #87d068" />
      <a-icon type="close-circle"
              v-else-if="status === 2"
              theme="filled"
              style="color: #f50" />
    </a-popover>
  </div>
</template>

<script>
export default {
  name: 'RunStatus',
  props: {
    nodeType: {
      type: String,
      default: ''
    },
    status: {
      type: Number,
      default: 0
    }
  },
  inject: ['getEdit'],
  data () {
    return {
      visible: false
    }
  },
  computed: {
    isEdit: function () {
      return this.getEdit()
    }
  },
  methods: {
    onHide () {
      this.visible = false
    }
  }
}
</script>

<style lang="less">
.run-status-wrap {
  position: absolute;
  right: -5px;
  top: -10px;
  z-index: 9;
}
.run-info-wrap {
  width: 550px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ant-row-flex {
    margin-bottom: 10px;
  }
  .log-wrap {
    height: 100px;
    overflow: auto;
    padding: 5px;
    border: 1px solid #ededed;
    background-color: #151515;
    color: #c2c2c2;
    border-radius: 5px;
    &::-webkit-scrollbar {
      width: 4px;
      background-color: #999999;
    }
  }
}
</style>