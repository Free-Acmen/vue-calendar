<template>
    <div class="simple-cal">
        <input type="text" placeholder="请选择日期...">
        <c-panel :calendarOp="sCalendarOp"></c-panel>
        <slot name="cal-foot"></slot>
    </div>
</template>

<script>
    import cPanel from './cal-panel'

    export default{
        data(){
            return {

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
        methods: {

        },
        components: {cPanel}
    }
</script>

<style lang="scss" scoped>
    .simple-cal{

    }
</style>