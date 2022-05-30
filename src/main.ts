import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
const a = 3
console.log(123)
app.use(router)
app.mount('#app')
