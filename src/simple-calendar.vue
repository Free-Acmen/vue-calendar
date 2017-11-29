<template>
    <div class="simple-cal" >
        <input v-if="calendarOp.options.showIpt" :name="calendarOp.options.name" type="text" placeholder="请选择日期..." :value="curDate" @click="handleCal">
        <input v-else :name="calendarOp.options.name" type="hidden" placeholder="请选择日期..." :value="curDate">
        <c-panel class="cal-panel" v-show="calState" :calendar="calendarOp" @cur-day-changed="handleChangeCurDay" @month-changed="handleMonthChanged"></c-panel>
        <slot name="cal-foot"></slot>
    </div>
</template>

<script>
    import cPanel from './component/cal-panel'
    const inBrowser = typeof window !== 'undefined'
    export default{
        name: 's-calendar',
        data(){
            return {
                curDate: "",
                calState: false
            }
        },
        computed: {
            calendarOp(){
                let dateObj = new Date()
                if(inBrowser){
                    return window.sClendarVue.calendarData
                }else{
                    return {
                        options: {
                            local: 'zh',
                            weekStartOn: 0, //定义第一列从星期及开始 0为周日
                            availSale: ['2017-11-27', '2017-11-28','2017-11-30'],
                            saleOut: [],
                            name: 'calendar',
                            showIpt: true,
                            callback: function(){}
                        },
                        params: {
                            curYear: dateObj.getFullYear(),
                            curMonth: dateObj.getMonth(),
                            curDate: dateObj.getDate()
                        }
                    }
                }
            }
        },
        methods: {
            handleChangeCurDay(date){
                this.curDate = date
                this.calState = false
                this.$emit('day-changed', date)
            },
            handleMonthChanged(date){
                this.$emit('month-changed', date)
            },
            handleCal(){
                this.calState = true
            }
        },
        components: {cPanel}
    }
</script>

<style lang="scss" scoped>
    .simple-cal{
        width: 100%;
        position: relative;
        input{
            width: 100%;
            border: 1px solid #888;
            height: 1.4rem;
            padding-left: .3rem;
        }
        .cal-panel{
            position: absolute;
            top: 1.6rem;
            left: 0;
        }
    }
</style>