<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>路由菜单</span>
          <el-button class="button" text type="primary" @click="saverole">保存</el-button>
        </div>
      </template>
      <!-- :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" -->
      <el-tree :data="queryMenu" show-checkbox node-key="id" :props="defaultProps" />
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, toRefs, reactive } from 'vue';
import { queryMenuList } from '@/api/system/jurisdiction'
const state = reactive({
  queryMenu: [],
  defaultProps: {
    label: 'name',
  }
})
function saverole() {

}

function querymenuList() {
  queryMenuList({ name: '' }).then(res => {
    if (res.code === 0) {
      state.queryMenu = res.data
    }
  })
}
const {
  queryMenu,
  defaultProps
} = toRefs(state)
onMounted(() => {
  querymenuList()
})
</script>