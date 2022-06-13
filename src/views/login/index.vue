<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">
      <el-form-item prop="username">
        <span class="svg-container">
          <!-- <svg-icon icon-class="user" /> -->
        </span>
        <el-input ref="username" v-model="loginForm.userName" placeholder="" name="username" type="text" tabindex="1"
          auto-complete="on" />
      </el-form-item>

      <el-tooltip :disabled="capslockTooltipDisabled" content="Caps lock is On" placement="right">
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input ref="passwordRef" :key="passwordType" v-model="loginForm.passWord" :type="passwordType"
            placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup="checkCapslock"
            @blur="capslockTooltipDisabled = true" @keyup.enter="handleLogin" />
        </el-form-item>
      </el-tooltip>
      <!-- 验证码 -->
      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="validCode" />
        </span>
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码" style="width: 65%"
          @keyup.enter="handleLogin" />

        <div class="captcha">
          <img :src="captchaBase64" @click="handleCaptchaGenerate" height="38px" />
        </div>
      </el-form-item>
      <el-button size="default" :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin">登录
      </el-button>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive, toRefs } from 'vue'
import { ElForm, ElInput } from 'element-plus'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { LoginFormData } from '@/types'
import useStore from '@/store'
import router from '@/router'
import { getCaptcha } from '@/api/login'
const loginFormRef = ref(ElForm)
const passwordRef = ref(ElInput)

const { user } = useStore()
const state = reactive({
  redirect: '',
  loginForm: {
    userName: 'admin',
    passWord: '12345678',
    code: ''
  } as unknown as LoginFormData,
  loginRules: {
    userName: [{ required: true, trigger: 'blur' }],
    passWord: [{ required: true, trigger: 'blur', validator: validatePassword }]
  },
  loading: false,
  passwordType: 'password',
  captchaBase64: 'http://47.94.146.82:9001/ecommerce-authority-center/verification/createImage',
  // 大写提示禁用
  capslockTooltipDisabled: true,
  otherQuery: {},
  clientHeight: document.documentElement.clientHeight,
  showCopyright: true
})
onMounted(() => {
  handleCaptchaGenerate()
})
// 获取验证码
function handleCaptchaGenerate() {
  state.captchaBase64 = 'http://47.94.146.82:9001/ecommerce-authority-center/verification/createImage?t=' + new Date().getTime().toString()
  console.log(state.captchaBase64)
}
/** onSubmit */
function handleLogin() {
  // eslint-disable-next-line no-debugger
  // debugger
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      state.loading = true
      console.log(state.loginForm)
      user
        .login(state.loginForm)
        .then(() => {
          console.log('执行', router)
          router.push({ path: state.redirect || '/', query: state.otherQuery })
          state.loading = false
        })
        .catch(() => {
          state.loading = false
        })
    } else {
      return false
    }
  })
}
function checkCapslock(e: any) {
  const { key } = e
  state.capslockTooltipDisabled =
    key && key.length === 1 && key >= 'A' && key <= 'Z'
}
function validatePassword(rule: any, value: any, callback: any) {
  if (value.length < 6) {
    callback(new Error('The password can not be less than 6 digits'))
  } else {
    callback()
  }
}
const {
  loginForm,
  loginRules,
  loading,
  passwordType,
  capslockTooltipDisabled,
  captchaBase64
} = toRefs(state)
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {
  height: 100vh;

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .el-input {
    display: inline-block;
    height: 36px;
    width: 85%;

    .el-input__wrapper {
      padding: 0;
      background: transparent;
      box-shadow: none;

      .el-input__inner {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        color: $light_gray;
        height: 36px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor  !important;
        }
      }
    }
  }

  .el-input__inner {
    &:hover {
      border-color: var(--el-input-hover-border, var(--el-border-color-hover));
      box-shadow: none;
    }

    box-shadow: none;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 20px;
  }

  .copyright {
    width: 100%;
    position: absolute;
    bottom: 0;
    font-size: 12px;
    text-align: center;
    color: #cccccc;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background-color: rgb(35, 116, 231);

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 5px 10px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .captcha {
    // position: absolute;
    right: 0;
    top: 0;
    float: right;

    img {
      height: 42px;
      cursor: pointer;
      vertical-align: middle;
    }
  }
}
</style>