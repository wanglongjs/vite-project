export const localStorage = {
  // 设置永久缓存
  set(key:string, val:any) {
    window.localStorage.setItem(key, JSON.stringify(val))
  },
  // 获取永久缓存
  get(key:string) {
    const json:any = window.localStorage.getItem(key)
    return JSON.parse(json)
  },
  // 移除永久缓存
  remove(key: string) {
    window.localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  }
}

/**
 * 浏览器临时缓存
 */
export const sessionStorage = {
  // 设置永久缓存
  set(key:string, val:any) {
    window.sessionStorage.setItem(key, JSON.stringify(val))
  },
  // 获取永久缓存
  get(key:string) {
    const json:any = window.sessionStorage.getItem(key)
    return JSON.parse(json)
  },
  // 移除永久缓存
  remove(key: string) {
    window.localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  }
}