import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap"

import "./assets/style/base.css"

const app = createApp(App)

app.use(router)

app.mount('#app')
