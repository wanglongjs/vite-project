<template>
<!-- 路由渲染出口 -->
 <router-view></router-view>
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ref, onMounted } from 'vue'
const msg = 'Hello Vue 3 + TypeScript + Vite1111111'
const reference = ref<InstanceType<typeof HelloWorld>|null>(null)
onMounted(() => {
  // console.log(hellword.value)
})
</script>
<style>
#app {
}
</style>
