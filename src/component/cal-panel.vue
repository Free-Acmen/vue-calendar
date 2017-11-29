<template>
    <div class="m-calendar">
        <div class="cal-header">
            <span class="left" @click="preMonth">&lt;</span>
            <span class="cal-title">{{curYearMonth}}</span>
            <span class="right" @click="nextMonth">&gt;</span>
        </div>
        <div class="cal-body clear">
            <div class="cal-weeks">
                <span class="item" v-for="(dayName, dayIndex) in i18n[calendar.options.local].dayNames" :key="dayIndex">
                    {{i18n[calendar.options.local].dayNames[(dayIndex + calendar.options.weekStartOn)%7]}}
                </span>
            </div>
            <div class="cal-dates">
                <div v-for="date in dayList" :key="date.date" class="item" :class="[{'selected': date.status ? (selected == date.date) : false, 'avail-sale': date.status ? date.availS : false, 'sale-out': date.status ? date.outS : false}]" @click="dateHandle(date)">
                    <p>{{date.status ? date.date.split('-')[2] : '&nbsp'}}</p>
                    <div v-if="date.status && (date.availS || date.outS)" class="state" ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import i18n from '../i18n'

    export default{
        name: 'calPanel',
        data(){
            return {
                i18n,
                selected: '' //当天默认选中
            }
        },
        props: {
          calendar: {
              type: Object,
              require: true
          }
        },
        created(){
            this.selected =  this.today
        },
        computed: {
            dayList(){
                let firstDay = new Date(this.calendar.params.curYear, this.calendar.params.curMonth, 1)
                let dayOfWeek = firstDay.getDay()
                //计算出本月第1天距离第一个有几格,需要用上月时间补上
                if (this.calendar.options.weekStartOn > dayOfWeek) { //开始日期大于1号的日期时,距离第一格的算法
                    dayOfWeek = 7 - this.calendar.options.weekStartOn + dayOfWeek
                } else if (this.calendar.options.weekStartOn < dayOfWeek) {
                    dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn
                }

                let startDate = new Date(firstDay)
                startDate.setDate(firstDay.getDate() - dayOfWeek)

                let item, status, tempArr = [], tempItem, availS, outS

                let availSale = this.calendar.options.availSale
                let saleOut = this.calendar.options.saleOut

                for(let i = 0; i< 42; i++){
                    item = new Date(startDate)
                    item.setDate(startDate.getDate() + i)

                    let date = `${item.getFullYear()}-${item.getMonth()+1}-${item.getDate()}`
                    let isbefore = new Date(date) - new Date(this.today)

                    if (this.calendar.params.curMonth === item.getMonth()) {
                        status = 1
                    } else {
                        status = 0
                    }

                    //判断当天是否可售
                    if(availSale.includes(date) && !saleOut.includes(date) && isbefore >=0){
                        availS = 1
                    }else{
                        availS = 0
                    }
                    //判断是否售完
                    if(saleOut.includes(date)){
                        outS = 1
                    }else{
                        outS = 0
                    }

                    tempItem = {
                        date: date,
                        status: status,
                        customClass: [],
                        availS: availS,
                        outS: outS
                    }
                    tempArr.push(tempItem)
                }
                return tempArr
            },
            today(){
                let dateObj = new Date()
                return `${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()}`
            },
            curYearMonth () {
                let tempDate = Date.parse(new Date(`${this.calendar.params.curYear}/${this.calendar.params.curMonth+1}/01`))
                return this.dateTimeFormatter(tempDate, this.i18n[this.calendar.options.local].format)
            }
        },
        methods: {
            dateHandle(date){
                if(date.availS){
                    this.selected = date.date
                    this.$emit('cur-day-changed', date.date)
                    this.calendar.options.callback(date)
                }
            },
            preMonth(){
                this.$sCalendar.preMonth()
                this.$emit('month-changed', this.curYearMonth)
            },
            nextMonth(){
                this.$sCalendar.nextMonth()
                this.$emit('month-changed', this.curYearMonth)
            },
            dateTimeFormatter (date ,format) {
                // 时间格式化辅助函数 date:毫秒数 format:'yyyy-MM-dd hh:mm:ss'
                if (!date || date == "") {
                    return ""
                }

                if (typeof date === "string") {
                    var mts = date.match(/(\/Date\((\d+)\)\/)/)
                    if (mts && mts.length >= 3) {
                        date = parseInt(mts[2])
                    }
                }

                date = new Date(date)
                if (!date || date.toUTCString() == "Invalid Date") {
                    return ""
                }

                var map = {
                    "M": date.getMonth() + 1, //月份
                    "d": date.getDate(), //日
                    "h": date.getHours(), //小时
                    "m": date.getMinutes(), //分
                    "s": date.getSeconds(), //秒
                    "q": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds() //毫秒
                }

                format = format.replace(/([yMdhmsqS])+/g, function(all, t){
                    var v = map[t]
                    if(v !== undefined){
                        if(all.length > 1){
                            v = '0' + v
                            v = v.substr(v.length-2)
                        }
                        return v
                    } else if(t === 'y'){
                        return (date.getFullYear() + '').substr(4 - all.length)
                    }
                    return all
                })
                return format
            },
            isEqualDateStr (dateStr1, dateStr2) {
                let dateArr1 = dateStr1.split('-')
                let dateArr2 = dateStr2.split('-')
                if (parseInt(dateArr1[0], 10) !== parseInt(dateArr2[0], 10)) {
                    return false
                }
                if (parseInt(dateArr1[1], 10) !== parseInt(dateArr2[1], 10)) {
                    return false
                }
                if (parseInt(dateArr1[2], 10) !== parseInt(dateArr2[2], 10)) {
                    return false
                }
                return true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .m-calendar{
        background-color: #fff;
        .cal-header{
            text-align:center;
            height: 2rem;
            line-height: 2rem;
            padding: 0 1rem;
            font-size: .7rem;
            .left,.right{
                font-size: 1.5rem;
            }
        }
        .cal-body{
            margin: 0 .5rem;
            border-top: 1px solid #DBDBDB;
            border-right: 1px solid #DBDBDB;
            .item{
                font-size: .7rem;
                border-left: 1px solid #DBDBDB;
                border-bottom: 1px solid #DBDBDB;
                float: left;
                width: 14.25%;
                text-align: center;
                height: 1.5rem;
            }
            .cal-weeks{
                background-color: #F2F2F2;
                .item{
                    line-height: 1.5rem;
                }
            }
            .cal-dates{
                .item{
                    p{
                        font-size: .7rem;
                        color: #ccc;
                    }
                    .state{
                        width: .25rem;
                        height: .25rem;
                        border-radius: .3rem;
                        margin: .1rem auto 0;
                    }
                    &.avail-sale{
                         p{
                             color: #333333;
                         }
                         .state{
                             background-color: #F98D3C;
                         }
                    }
                    &.sale-out{
                         .state{
                             background-color: #cccccc;
                         }
                    }
                    &.selected{
                         background-color: #F98D3C;
                         p{
                             color: #fff;
                         }
                         .state{
                             background-color: #fff;
                         }
                    }
                }
            }
        }
    }
</style>

