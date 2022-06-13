import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
// import { store, key } from './store'
import 'element-plus/theme-chalk/index.css';
import { createPinia } from 'pinia'
import 'styles/index.scss'
import '@/permission'
const app = createApp(App)
app.use(Router)
app.use(createPinia())
app.mount('#app')
