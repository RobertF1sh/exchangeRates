import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

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