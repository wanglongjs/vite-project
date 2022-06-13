<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>角色用户管理</span>
          <el-button class="button" text type="primary" @click="addRole">新增角色</el-button>
        </div>
      </template>
      <el-table :data="tableGroupList" border stripe @row-click="rowGroup">
        <el-table-column label="角色名称" prop="groupName"></el-table-column>
        <el-table-column label="角色编码" prop="groupCode"></el-table-column>
        <el-table-column label="描述" prop="tip"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div>
              <el-dropdown>
                <el-button type="primary">
                  更多操作<el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="editGroup(scope.row)">编辑</el-dropdown-item>
                    <el-dropdown-item @click="deletegroup(scope.row.id)">删除</el-dropdown-item>
                    <el-dropdown-item @click="addUserGroup">添加成员</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--弹框-->
    <el-dialog v-model="rolevisible" title="角色" width="30%" :before-close="handleClose">
      <span>
        <el-form :model="RoleFrom" ref="form" label-width="80px" :inline="false">
          <el-form-item label="角色名称">
            <el-input v-model="RoleFrom.groupName" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="角色编码">
            <el-input v-model="RoleFrom.groupCode" placeholder="请输入路径"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="RoleFrom.tip" placeholder="请输入路由地址"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="rolevisible = false">取 消</el-button>
          <el-button type="primary" @click="addRolesave">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, toRefs } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { gropFormData, groupModule } from '@/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { jurisdgetGroupList, groupToModule, saveGroup, deleteGroup } from '@/api/system/role'
/**事件绑定 */
const emit = defineEmits(['roleClick']);
const state = reactive({
  rolevisible: false,
  groupQuery: {
    page: 1,
    limit: 10
  },
  tableGroupList: [],
  RoleFrom: {
    groupCode: '',// 角色编码
    groupName: '',// 角色名称
    tip: ''// 描述
  } as gropFormData
})

/**获取角色列表 */
function roleUserList() {
  jurisdgetGroupList(state.groupQuery).then(res => {
    if (res.code === 0) {
      state.tableGroupList = res.data.records;
      // state.totle=res.data.tota
    }
  })
}
function addRole() {
  state.rolevisible = true
  state.RoleFrom = {
    groupCode: '',// 角色编码
    groupName: '',// 角色名称
    tip: ''// 描述
  }
}
function handleClose() {
  state.rolevisible = false
  state.RoleFrom = {
    groupCode: '',// 角色编码
    groupName: '',// 角色名称
    tip: ''// 描述
  }
}
//新增角色
function addRolesave() {
  saveGroup(state.RoleFrom).then((res) => {
    if (res.code === 0) {
      ElMessage.success('编辑成功')
      roleUserList()
      state.rolevisible = false
    }
  })
}
/**编辑角色 */
function editGroup(row: any) {
  state.rolevisible = true
  state.RoleFrom = row
}
/**删除角色 */
function deletegroup(id: string) {
  ElMessageBox.confirm('确认删除已选中的数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteGroup(id).then(res => {
      if (res.code === 0) {
        ElMessage.success('删除成功')
        roleUserList()
      }
    })
  }).catch(error => {
    ElMessage.warning(error)
  })
}
/**添加成员 */
function addUserGroup() {

}
// 点击选择一行
function rowGroup(row: any) {
  emit('roleClick', row)
}
const {
  tableGroupList,
  rolevisible,
  RoleFrom
} = toRefs(state)

onMounted(() => {
  roleUserList()
})
</script>