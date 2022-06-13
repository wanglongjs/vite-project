<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal">
      <el-form-item label="">
        <el-input v-model="form."></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
const state = reactive({
  talentFrom: {
    enable:true,
    subordinateProportion:0,
    superiorProportion:0
  }
})
</script>