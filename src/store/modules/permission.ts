import { PermissionState } from '@/types'
import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { constantRoutes } from '@/router'
import { getLoginModule } from '@/api/system/jurisdiction'

const modules = import.meta.glob('../../views/**/**.vue')
export const Layout = () => import('@/layout/index.vue')
export const filterAsyncRoutes = (
  routes: RouteRecordRaw[],
) => {
  const res: RouteRecordRaw[] = []
  routes.forEach(route => {
    const tmp = { ...route } as any
    tmp.meta = {
      alwaysShow: tmp.alwaysShow,
      hidden: tmp.hidden,
      title: tmp.name
    }
    tmp.path = tmp.url
    if (tmp.assembly) {
    if (tmp.assembly === 'Layout') {
      tmp.component = Layout
    } else {
      const component = modules[`../../views/${tmp.assembly}.vue`] as any
      if (component) {
        tmp.component = modules[`../../views/${tmp.assembly}.vue`]
      } else {
        // tmp.component = modules['../../views/error-page/404.vue']
      }
    }
    res.push(tmp)

    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children)
    }
    }
  })
  return res
}

const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
    addRoutes: []
  }),
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
      // console.log(this.routes)
      // const accessedRoutes = filterAsyncRoutes(this.routes, [])
      // this.setRoutes(accessedRoutes)
    },
    generateRoutes() {
      return new Promise((resolve, reject) => {
        getLoginModule()
          .then((response: { data: any }) => {
            // console.log('+++++++=', response.data)
            const asyncRoutes = response.data
            const accessedRoutes = filterAsyncRoutes(asyncRoutes)
            this.setRoutes(accessedRoutes)
            resolve(accessedRoutes)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    }
  }
})

export default usePermissionStore
