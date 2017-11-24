import Vue from 'vue'
import App from './App.vue'

import sCalendar from './index.js'
Vue.use(sCalendar)

new Vue({
    el: '#app',
    render: h => h(App)
})