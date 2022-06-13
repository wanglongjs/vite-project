<template>
  <div>
    <search-input>
      <div>
        <el-form ref="queryFromRef" :model="userform" label-width="80px" :inline="true">
          <el-form-item>
            <el-input v-model="userform.name" placeholder="搜索用户..."></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryList">查询</el-button>
            <el-button type="primary" @click="adduservial(); choseNav = 0">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </search-input>
    <!--用户列表-->
    <el-table :data="tableList" style="width: 100%" border>
      <el-table-column label="昵称" prop="username">
      </el-table-column>
      <el-table-column label="电话号码" prop="username">
      </el-table-column>
      <el-table-column prop="mail" label="登录账邮箱号">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div>
            <el-button type="primary" size="small" @click="editUser(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteuser(scope.row.id)">珊瑚</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--弹框-->
    <el-dialog v-model="queryvisible" title="用户" width="50%" :before-close="handleClose">
      <span>
        <el-form :model="userQuery" ref="form" label-width="80px" :inline="false">
          <el-form-item label="用户名">
            <el-input v-model="userQuery.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="userQuery.telephone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userQuery.mail" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="userQuery.remark"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="queryvisible = false">取 消</el-button>
          <el-button type="primary" @click="userSave">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, toRefs } from 'vue'
import SearchInput from '@/components/SearchInput/index.vue'
import { useraddFrom, userqueyFrom } from '@/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { selectAllList, adminrAddUser, deleteUser, updateUser } from '@/api/system/role'
const state = reactive({
  tableList: [],
  choseNav: 0,
  queryvisible: false,
  userform: {
    name: '',
    pageSize: 10,
    pageIndex: 1
  },
  userQuery: {
    deptId:null,
    mail: '',
    remark: '',
    status: 1,
    telephone: '',
    username: ''
  } as useraddFrom
})

//查询列表
function queryList() {
  selectAllList(state.userform).then(res => {
    if (res.code === 0) {
      // console.log(res)
      state.tableList = res.data.data
    }
  })
}

//编辑
function editUser(row: any) {
  state.userQuery = row
  state.queryvisible = true
  state.choseNav = 1
}
/**用户新增 */
function adduservial() {
  state.queryvisible = true
  state.userQuery = {
    mail: '',
    remark: '',
    status: 1,
    telephone: '',
    username: ''
  }
}
function handleClose() { }
function userSave() {
  if (state.choseNav === 0) {
    adminrAddUser(state.userQuery).then(res => {
      if (res.code === 0) {
        ElMessage.success('用户新增成功')
        state.queryvisible = false
        queryList()
      }
    })
  } else {
    updateUser(state.userQuery).then(res => {
      if (res.code === 0) {
        ElMessage.success('用户更新成功')
        state.queryvisible = false
        queryList()
      }
    })
  }
}
/**删除 */
function deleteuser(id: string) {
  ElMessageBox.confirm('确认删除已选中的数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteUser(id).then(res => {
      if (res.code === 0) {
        ElMessage.success('删除成功')
        queryList()
      }
    })
  }).catch(error => {
    ElMessage.warning(error)
  })
}

const {
  userform,
  tableList,
  queryvisible,
  userQuery,
  choseNav
} = toRefs(state)

onMounted(() => {
  queryList()
})
</script>