import {lazyPlugin} from '@/directives'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { componentPlugin } from '@/components'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@/styles/common.scss'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia=createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
app.use(lazyPlugin)
app.use(componentPlugin)
