import { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'

/**
 * 用户状态的类型声明
 */
export interface AppState {
  device: string;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  size: string;
}
/**
 * 用户状态类型声明
 */
export interface UserState {
  token: string;
  nickname: string;
  avatar: string;
  roles: string[];
  perms: string[];
}

/**
 * 权限类型声明
 */
export interface PermissionState {
  routes: RouteRecordRaw[];
  addRoutes: RouteRecordRaw[];
}

/**角色类型声明 */

// export interface roleSystem{

// }