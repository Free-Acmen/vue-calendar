<template>
    <div class="simple-cal" >
        <input v-if="calendar.showIpt" :name="calendar.name" type="text" placeholder="请选择日期..." :value="curDate" @click="handleCal">
        <input v-else :name="calendar.name" type="hidden" placeholder="请选择日期..." :value="curDate">
        <c-panel class="cal-panel" v-show="calState" :calendar="calendar" @cur-day-changed="handleChangeCurDay" ></c-panel>
        <slot name="cal-foot"></slot>
    </div>
</template>

<script>
    import cPanel from './component/cal-panel'

    export default{
        name: 's-calendar',
        data(){
            return {
                curDate: "",
                calState: false,
                calendar: {}
            }
        },
        props: {
            sCalendarOp: {
                type: Object,
                default: function(){
                    return {}
                }
            }
        },
        created(){
            this.assOption()
        },
        methods: {
            assOption(){
                let dateObj = new Date()
                let def = {
                    options: {
                        local: 'zh',
                        weekStartOn: 0 //定义第一列从星期及开始 0为周日
                    },
                    params: {
                        curYear: dateObj.getFullYear(),
                        curMonth: dateObj.getMonth(),
                        curDate: dateObj.getDate()
                    },
                    availSale: [],
                    saleOut: [],
                    name: 'calendar',
                    showIpt: true,
                    callback: function(){}
                }
                this.calendar = Object.assign(def, this.sCalendarOp)
            },
            handleChangeCurDay(date){
                this.curDate = date
                this.calState = false
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
            top: 1.4rem;
            left: 0;
        }
    }
</style>