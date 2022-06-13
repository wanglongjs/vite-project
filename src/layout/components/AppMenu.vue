<template>
  <div>
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- <el-col :span="24"> -->
        <el-menu :default-active="activeMenu" :isCollapse="isCollapse" background-color="#ccccccc" text-color="#ffffff"
          active-text-color="red" :unique-opened="false" :collapse-transition="false" mode="vertical">
          <MenuItem v-for="route in routes" :item="route" :key="route.path" :base-path="route.path"
            :is-collapse="isCollapse" />
        </el-menu>
      <!-- </el-col> -->
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useStore from '@/store'
import variables from '@/styles/index.scss'
import MenuItem from './MenuItem.vue'
const { app } = useStore()
// 获取路由表
const { permission } = useStore()
const routes = computed(() => permission.routes)
const route = useRoute()
const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string
  }
  return path
})

const isCollapse = computed(() => !app.sidebar.opened)
onMounted(() => {

})
</script>

<style lang="scss">

</style>