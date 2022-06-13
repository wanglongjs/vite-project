<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="分销设置">
        <distributionSetting></distributionSetting>
      </el-tab-pane>
      <el-tab-pane label="分销员管理">
        <distributionManage></distributionManage>
      </el-tab-pane>
      <el-tab-pane label="分销员等级">
        <distributionLave></distributionLave>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import distributionSetting from './components/distributionSetting/index.vue'
import distributionManage from './components/distributionManage/index.vue'
import distributionLave from './components/distributionLave/index.vue'
</script>