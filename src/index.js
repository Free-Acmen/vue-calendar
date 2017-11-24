'use strict'

import sCalendar from 'simple-caledar'


function install(Vue, options = {}) {
    const isVueNext = Vue.version.split('.')[0] === '2'
    const inBrowser = typeof window !== 'undefined'
    let dateObj = new Date()
    const DEFAULT_OPTION = {
        options: {
            local: 'zh',
            weekStartOn: 0, //定义第一列从星期及开始 0为周日
            availSale: [],
            saleOut: [],
            name: 'calendar',
            showIpt: true,
            callback: function() {}
        }
    }

    const calendae = {
        $vm: null,
        bindVm(vm) {
            this.$vm = vm
        }
    }

    let calendarOptions = Object.assign(DEFAULT_OPTION, options)

    let sClendarVue = new Vue({
        data: {
            calendarData: {
                options: calendarOptions,
                params: {
                    curYear: dateObj.getFullYear(),
                    curMonth: dateObj.getMonth(),
                    curDate: dateObj.getDate(),
                    curEventsDate: 'all'
                }
            }
        }
    })

    if (inBrowser) {
        window.sClendarVue = sClendarVue
        calendar.bindVm(sClendarVue)
    }

    Vue.component(sCalendar.name, sCalendar)
    Vue.prototype.$sCalendar = calendar
}

export default install

if (typeof module === 'object' && modult.exports) {
    module.exports.install = install
}