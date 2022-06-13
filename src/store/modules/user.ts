import { defineStore } from 'pinia';
import { LoginFormData, UserState } from '@/types';
import { localStorage } from '@/utils/storage';
import { login, getUserinfo } from '@/api/login';

const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: localStorage.get('token') || '',
    nickname: '',
    avatar: '',
    roles: [],
    perms: [],
  }),
  actions: {
    async RESET_STATE() {
      this.$reset();
    },
    /**
     * 用户登录请求
     * @param userInfo 登录用户信息
     *  username: 用户名
     *  password: 密码
     *  code: 验证码
     *  uuid: 匹配正确验证码的 key
     */
    login(userInfo: LoginFormData) {
      const { userName, passWord, code } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          userName: userName.trim(),
          passWord: passWord,
          code: code
        })
          .then(response => {
            console.log(response.data)
            const { token } = response.data;
            const accessToken = token;
            console.log(accessToken)
            localStorage.set('token', accessToken);
            this.token = accessToken;
            resolve(token);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**
     *  获取用户信息（昵称、头像、角色集合、权限集合）
     */
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserinfo().then(res => {
          const { username } = res.data
          this.nickname = username
          console.log(this.nickname)
          resolve(res.data)
        })
      })
    },

    /**
     *  注销
     */
    logout() {
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise(resolve => {
        localStorage.remove('token');
        this.RESET_STATE();
        resolve(null);
      });
    }
  }
});

export default useUserStore;
