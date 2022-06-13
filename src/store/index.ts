
import useAppStore from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
// import permission from './modules/permission'
const useStore = () => ({
  app: useAppStore(),
  user: user(),
  permission: permission()
})

export default useStore