<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <GroupList @roleClick="roleClick" />
      </el-col>
      <el-col :span="6">
        <ModuleQuery />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, toRefs } from 'vue'
import ModuleQuery from './components/ModuleQuery/index.vue'
import GroupList from './components/GroupList/index.vue'
import { gropFormData, groupModule } from '@/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserByGroup } from '@/api/system/role'

const state = reactive({
  tableGroupList: [],
  groupForm: {
    groupCode: '',// 角色编码
    groupName: '',// 角色名称
    tip: ''// 描述
  } as gropFormData
})

function roleClick(row: any) {
  getUserByGroup({ groupId: row.id, limit: 1, page: 10, name: '' }).then(res => {

  })
}

const {
  tableGroupList,
  groupForm
} = toRefs(state)

onMounted(() => {

})
</script>