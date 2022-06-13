<template>
  <el-row>
    <el-col :span="24">
      <div class="search-ipt">
        <slot />
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.search-ipt {}
</style>