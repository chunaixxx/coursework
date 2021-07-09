import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import { VueCookieNext } from 'vue-cookie-next'
import Notifications from '@kyvg/vue3-notification'

VueCookieNext.config({ expire: '7d' })

createApp(App).use(store).use(router).use(VueCookieNext).use(Notifications).mount('#app')

