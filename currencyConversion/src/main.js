import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import PrimeVue from '../node_modules/primevue/config'
import ToastService from '../node_modules/primevue/toastservice'
import Tooltip from '../node_modules/primevue/tooltip'
import InputText from '../node_modules/primevue/inputtext'
import Button from '../node_modules/primevue/button'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '../node_modules/primevue/resources/themes/saga-blue/theme.css'
import '../node_modules/primevue/resources/primevue.min.css'
import '../node_modules/primeicons/primeicons.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)

app.directive('tooltip', Tooltip)

app.component('InputText', InputText)
app.component('Button', Button)

app.mount('#app')
