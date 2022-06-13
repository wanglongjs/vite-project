<template>
  <div>
    <!--用户列表-->
    <el-table :data="tableList" style="width: 100%" border>
      <el-table-column label="规则名称" prop="name">
      </el-table-column>
      <el-table-column label="启用状态">
        <template #default="scope">
          <div>
            {{ scope.row.enable == 1 ? '启用' : '未启用' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div>
            <el-button type="primary" size="small" @click="editDirect(scope.row)">编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--弹框-->
    <el-dialog v-model="dirctvisible" title="分红规则" width="50%" :before-close="handleClose">
      <span v-if="dirctNav === 1">
        <el-form :model="dirdicSettFromData" ref="form" label-width="280px" :inline="false">
          <el-form-item label="开启直推规则(实时结算)">
            <el-switch v-model="dirdicSettFromData.enable" />
          </el-form-item>
          <el-form-item label="推荐直接下线分润被推荐人投资人的百分比	">
            <el-input-number :controls="false" :min="0" v-model="dirdicSettFromData.proportion" placeholder="">
            </el-input-number>
          </el-form-item>
        </el-form>
      </span>
      <span>
        
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dirctvisible = false">取 消</el-button>
          <el-button type="primary" @click="dirctSave">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, toRefs } from 'vue'
import { directSettFrom } from '@/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { rewardgetAverageList, directAdd } from '@/api/service/index'
const state = reactive({
  tableList: [],
  dirctNav: 1,
  dirctvisible: false,
  dirdicSettFromData: {
    enable: true,//是否开启
    proportion: 1,
    type: null
  } as directSettFrom
})

//查询列表
function queryList() {
  rewardgetAverageList().then(res => {
    if (res.code === 0) {
      state.tableList = res.data
    }
  })
}
//编辑
function editDirect(row: any) {
  state.dirctvisible = true
  state.dirctNav = row.type
  if (row.type === 1) {
    state.dirdicSettFromData = row
  }
}
function dirctSave() {
  if (state.dirdicSettFromData.type === 1) {
    directAdd(state.dirdicSettFromData).then(res => {
      if (res.code === 0) {
        ElMessage.success('编辑成功')
        state.dirctvisible = true
        queryList()
      }
    })
  }
}
function handleClose() { }
const {
  tableList,
  dirctvisible,
  dirdicSettFromData,
  dirctNav
} = toRefs(state)

onMounted(() => {
  queryList()
})
</script>