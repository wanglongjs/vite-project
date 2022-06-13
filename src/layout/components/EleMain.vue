<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <transition name="router-fade" mode="out-in">
        <!-- :include="cachedViews" -->
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
// import { computed } from "vue"

</script>