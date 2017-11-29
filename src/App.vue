<template>
    <div id="app" style="text-align: center;">
        <img src="./assets/logo.png" @click="test">
		<s-calendar @month-changed="handleMonthChanged" @day-changed="handleDayChanged"></s-calendar>	
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
      test(){
          this.$sCalendar.afterSelect(function(){

          })
      },
      handleMonthChanged(date){
          console.log(date)
      },
      handleDayChanged(date){
          console.log(date)
      }
  }
}
</script>

<style lang="scss">
    body, div, span, ul, dl, dt, dd, li, a, p, h1, h2, h3, h4,h5, h6, i, b, textarea, button, input, select, figure, figcaption {
        padding: 0;
        margin: 0;
        list-style: none;
        font-weight: normal;
        text-decoration: none;
        border: none;
        color: #333;
        box-sizing: border-box;
        font-family: "Microsoft Yahei",sans-serif;
        -webkit-tap-highlight-color:transparent;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust:none;
        -ms-user-select:none;
        user-select:none;
    }
    input[type=button], input[type=submit], input[type=file], button { cursor: pointer; -webkit-appearance: none; }
    input,textarea:focus{outline:0;}
    input[type="button"], input[type="submit"], input[type="search"], input[type="reset"] {
        -webkit-appearance: none;
    }
    textarea { -webkit-appearance: none;}
    .clear:after{
        content: '';
        display: block;
        clear: both;
    }
    .clear{
        zoom:1;
    }
    .left{
        float: left;
    }
    .right{
        float: right;
    }
</style>
