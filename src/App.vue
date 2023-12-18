<template>
    <ConfigProvider :locale="zhCN">
    <div id="app">
      <router-view />
    </div>
    </ConfigProvider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { ConfigProvider } from 'ant-design-vue'
export default {
  components: { ConfigProvider },
  data () {
    return {
      zhCN
    }
  }
}
</script>

<style>

</style>
