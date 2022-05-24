import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const constantRoutes: Array<RouteRecordRaw> = [
]

export const asyncRoutes = []

export const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

export default router
