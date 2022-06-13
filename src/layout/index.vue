<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <AppMenu />
        </el-aside>
        <el-container>
          <el-main>
            <!--子路由出口-->
            <EleMain />
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import AppMenu from './components/AppMenu.vue'
import EleMain from './components/EleMain.vue'
</script>
<style  scoped>
.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
}
.el-aside {
  background-color: #0ba4f0;
  color: #333;
  overflow: auto;
}

.el-main {
  background-color: #ffffff;
  color: #333;
}

.el-container {
  height: 100vh;
}
</style>