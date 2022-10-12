import { createApp } from 'vue'
import App from './app.vue'
import '@cblink/theme-chalk/src/index.scss'
import 'element-plus/theme-chalk/index.css'

import * as comp from '@cblink/components'
const app = createApp(App)

Object.entries(comp).forEach(([name, comp]) => {
  console.log(name)
  console.log(comp)
  app.component(name, comp)
})

app.mount('#app')
