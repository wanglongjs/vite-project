<template>
  <div>
    <search-input>
      <div>
        <el-form ref="queryFromRef" :model="gradeForm" label-width="80px" :inline="true">
          <el-form-item>
            <el-input v-model="gradeForm.name" placeholder="搜索用户..."></el-input>
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
      <el-table-column label="个人等级配置实体" prop="level">
      </el-table-column>
      <el-table-column label="等级名称(合伙人)" prop="name">
      </el-table-column>
      <el-table-column prop="thresholdLow" label="最低门槛">
      </el-table-column>
      <el-table-column prop="thresholdHigh" label="最高门槛">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div>
            <el-button type="primary" size="small" @click="editUser(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deletegrede(scope.row.id)">珊瑚</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--弹框-->
    <el-dialog v-model="gradevisible" title="分红规则" width="50%" :before-close="handleClose">
      <span>
        <el-form :model="gradeFromData" ref="form" label-width="130px" :inline="false">
          <el-form-item label="个人等级配置实体">
            <el-input-number :controls="false" :min="0" v-model="gradeFromData.level" placeholder="请输入个人等级实体"></el-input-number>
          </el-form-item>
          <el-form-item label="等级名称(合伙人)">
            <el-input v-model="gradeFromData.name" placeholder="请输入等级名称(合伙人)"></el-input>
          </el-form-item>
          <el-form-item label="最低门槛">
            <el-input-number :min="1000" v-model="gradeFromData.thresholdLow"></el-input-number>
          </el-form-item>
          <el-form-item label="最高门口">
            <el-input-number :max="2000" v-model="gradeFromData.thresholdHigh"></el-input-number>
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="gradevisible = false">取 消</el-button>
          <el-button type="primary" @click="userSave">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, toRefs } from 'vue'
import SearchInput from '@/components/SearchInput/index.vue'
import { gradeaddFrom } from '@/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { addgradePerson, deletegradeConfig, editgradeconfig, gradegetList } from '@/api/service/index'
const state = reactive({
  tableList: [],
  choseNav: 0,
  gradevisible: false,
  gradeForm: {
    name: '',
    limit: 10,
    page: 1
  },
  gradeFromData: {
    level: 0,//个人等级配置实体
    name: '',//等级名称,示例值(合伙人)
    thresholdHigh: 2000,//最高门槛,示例值(2000)
    thresholdLow: 1000//	最低门槛,示例值(1000)
  } as gradeaddFrom
})

//查询列表
function queryList() {
  gradegetList(state.gradeForm).then(res => {
    if (res.code === 0) {
      // console.log(res)
      state.tableList = res.data.data
    }
  })
}

//编辑
function editUser(row: any) {
  state.gradeFromData = row
  state.gradevisible = true
  state.choseNav = 1
}
/**用户新增 */
function adduservial() {
  state.gradevisible = true
  state.gradeFromData = {
    level: 0,//个人等级配置实体
    name: '',//等级名称,示例值(合伙人)
    thresholdHigh: 2000,//最高门槛,示例值(2000)
    thresholdLow: 1000//	最低门槛,示例值(1000)
  }
}
function handleClose() { }
function userSave() {
  if (state.choseNav === 0) {
    // addgradePerson(gradeFromData).then(res => {
    //   if (res.code === 0) {
    //     ElMessage.success('新增成功')
    //     state.gradevisible = false
    //     queryList()
    //   }
    // })
  } else {
    // editgradeconfig(state.gradeFromData).then(res => {
    //   if (res.code === 0) {
    //     ElMessage.success('更新成功')
    //     state.gradevisible = false
    //     queryList()
    //   }
    // })
  }
}
/**删除 */
function deletegrede(id: string) {
  ElMessageBox.confirm('确认删除已选中的数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deletegradeConfig(id).then(res => {
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
  gradeForm,
  tableList,
  gradevisible,
  gradeFromData,

  choseNav
} = toRefs(state)

onMounted(() => {
  queryList()
})
</script>