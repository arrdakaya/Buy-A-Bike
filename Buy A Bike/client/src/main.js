import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import '../public/style.css'



createApp(App).use(router).mount('#app')
