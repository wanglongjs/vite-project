import router from '@/router';
import { ElMessage } from 'element-plus';
import useStore from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false }); // 进度环显示/隐藏

// 白名单路由
const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const { user, permission } = useStore();
  const hasToken = user.token;
  if (hasToken) {
    // 登录成功，跳转到首页
    // eslint-disable-next-line no-debugger
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasGetUserInfo = user.nickname
      console.log(hasGetUserInfo)
      // eslint-disable-next-line no-debugger
      if (hasGetUserInfo) {
        // console.log('执行')
        next()
      } else {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const info: any = await user.getUserInfo()
          const accessRoutes: any = await permission.generateRoutes();
          accessRoutes.forEach((route: any) => {
            router.addRoute(route);
          });
          // eslint-disable-next-line no-debugger
          // debugger
          next({ ...to, replace: true });
        } catch (error) {
          // eslint-disable-next-line no-debugger
          // debugger
          // 移除 token 并跳转登录页
          await user.resetToken();
          ElMessage.error((error as any) || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    console.log('+++++++++')
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
