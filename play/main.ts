import { createApp } from 'vue'
import App from './app.vue'
import { WIcon } from '@cblink/components/icon'
import { WButton } from '@cblink/components/button'
import '@cblink/theme-chalk/src/index.scss'
import 'element-plus/theme-chalk/index.css'

import * as comp from '@cblink/components'

Object.entries(comp).forEach(([name, comp]) => {
  console.log(name)
  console.log(comp)
})

const app = createApp(App)

app.use(WIcon)
app.use(WButton)
app.mount('#app')
