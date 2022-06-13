<template>
  <div>
    <!--查询solt-->
    <search-input>
      <div>
        <el-form ref="queryFromRef" :model="parmas" label-width="80px" :inline="true">
          <el-form-item label="路由查询">
            <el-input v-model="parmas.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryList">查询</el-button>
            <el-button type="primary" @click="queryvisible = true; choseNav = 0">新增路由</el-button>
          </el-form-item>
        </el-form>
      </div>
    </search-input>
    <!--列表-->
    <el-table :data="tableData" style="width: 100%" row-key="id" border lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" v-loading="loading">
      <!-- <el-table-column width="180" /> -->
      <el-table-column prop="name" label="菜单管理" width="180" />
      <el-table-column label="菜单类型" width="180">
        <template #default="scope">
          <el-tag class="ml-2" type="danger">{{ scope.type == 1 ? '一级菜单' : scope.type == 2 ? '二级菜单' : '三级菜单' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="icon"></el-table-column>
      <el-table-column prop="url" label="路径"></el-table-column>
      <el-table-column prop="assembly" label="前端组件"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div>
            <el-button type="primary" size="small" @click="editMenu(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteMenu(scope.row.id)">删除</el-button>
            <el-button type="primary" size="small" @click="addsubord(scope.row)">添加下级</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--弹框-->
    <el-dialog v-model="queryvisible" title="路由表新增" width="50%" :before-close="handleClose">
      <span>
        <el-form :model="menuFrom" ref="form" :rules="rules" label-width="80px" :inline="false">
          <el-form-item label="上级菜单" v-show="menuFrom.type === 2">
            <el-tree-select placeholder="选择上级菜单" v-model="menuFrom.parentId" :props="{ label: 'name', value: 'id' }"
              :data="tableData" check-strictly />
          </el-form-item>
          <el-form-item label="菜单类型">
            <el-radio-group v-model="menuFrom.type">
              <el-radio :label="1">一级菜单</el-radio>
              <el-radio :label="2">子菜单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="menuFrom.name" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
          <el-form-item label="路径" prop="url">
            <el-input v-model="menuFrom.url" placeholder="请输入路径"></el-input>
          </el-form-item>
          <el-form-item label="路由地址" prop="assembly">
            <el-input v-model="menuFrom.assembly" placeholder="请输入路由地址"></el-input>
          </el-form-item>
          <el-form-item label="顺序">
            <el-input v-model="menuFrom.sortNum"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-input v-model="menuFrom.icon" placeholder="请输入图标"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="queryvisible = false">取 消</el-button>
          <el-button type="primary" @click="menusave">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import SearchInput from '@/components/SearchInput/index.vue'
import { reactive, ref, onMounted, toRefs } from 'vue';
import { queryMenuList, menuSave, menuDelete, menUpdate } from "@/api/system/jurisdiction";
import { parmasQuery, menuFromData } from '@/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, SuccessFilled } from '@element-plus/icons-vue'
const state = reactive({
  loading: false,
  tableData: [],
  queryvisible: false,
  choseNav: 0,
  parmas: {
    limit: '',
    page: '',
    name: ''
  } as parmasQuery,
  menuFrom: {
    name: '',
    url: '',
    assembly: '',
    type: 1,
    parentId: "0",
    hiddenChildren: 0,
    isCentreShow: 0,
    isCentreUpdate: 0,
    isCustom: ''
  } as menuFromData,
  rules: {
    name: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
    url: [{ required: true, message: '路径不能为空', trigger: 'blur' }],
    assembly: [{ required: true, message: '路径不能为空', trigger: 'blur' }]
  }
})

// ref('form')
const {
  loading,
  tableData,
  parmas,
  queryvisible,
  rules,
  menuFrom,
  choseNav
} = toRefs(state)

function queryList() {
  queryMenuList(state.parmas).then(res => {
    if (res.code == 0) {
      state.tableData = res.data
    }
  })
}
/**保存路由信息 */
function menusave() {
  if (state.choseNav == 0) {
    menuSave(state.menuFrom).then((res => {
      if (res.code === 0) {
        ElMessage.success('添加成功')
        state.queryvisible = false
        queryList()
      }
    }))
  } else {
    menUpdate(state.menuFrom).then((res: { code: number; }) => {
      if (res.code === 0) {
        ElMessage.success('编辑成功')
        state.queryvisible = false
        queryList()
      }
    })
  }

}

// 编辑
function editMenu(row: any) {
  state.choseNav = 1
  state.menuFrom = row
  state.queryvisible = true
}
// 添加下级
function addsubord(row: any) {
  console.log(row)
  state.menuFrom.type = 2
  state.choseNav = 0
  state.queryvisible = true
  // row.
  // state.menuFrom=row
  // state.menuFrom.parentId=row.id

}
// 删除
function deleteMenu(id: string) {
  ElMessageBox.confirm('确认删除已选中的数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    menuDelete(id).then(res => {
      if (res.code === 0) {
        ElMessage.success('删除成功')
        queryList()
      }
    })
  }).catch(error => {
    ElMessage.warning(error)
  })
}
function handleClose() {

}
onMounted(() => {
  queryList()
})
</script>
<style lang="scss" scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>