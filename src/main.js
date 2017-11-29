import Vue from 'vue'
import App from './App.vue'

import sCalendar from './index.js'

Vue.use(sCalendar, {
    local: 'en',
    weekStartOn: 1, //定义第一列从星期及开始 0为周日
    availSale: ['2017-11-30', '2017-12-1', '2017-12-3'],
    saleOut: ['2017-12-5'],
    name: 'calendar',
    showIpt: true,
    callback: function(date) {}
})

new Vue({
    el: '#app',
    render: h => h(App)
})