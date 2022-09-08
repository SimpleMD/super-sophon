import { createApp } from "vue"
import App from './app.vue'
import { WIcon } from '@w-plus/components/icon'
import { WButton } from '@w-plus/components/button'
import '@w-plus/theme-chalk/src/index.scss'
import 'element-plus/theme-chalk/index.css'

import * as comp from "@w-plus/components"


Object.entries(comp).forEach(([name,comp]) => {
    console.log(name);
    console.log(comp);
})

const app = createApp(App);

app.use(WIcon)
app.use(WButton)
app.mount('#app')