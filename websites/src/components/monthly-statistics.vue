<template>
  <div>
    <Side></Side>
    <div class="canv">
      <h2>每月吸烟量</h2>
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>
<script>
 import Side from './side-bar.vue';
export default {
  components: {
     Side,
  },
  data() {
    return {
      chartOptions: {}
    };
  },
  mounted(){
  this.getChart()
  },
  methods:{
    getChart() {
      var template = {
        title: {
          //去掉标题
          text: "每月吸烟量"
        },
        xAxis: {
          //自定义x轴
          categories:["一月", "二月", "三月", "四月", "五月",
           "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        },
        yAxis: {
          //去掉y轴的value
          title: { text: "吸烟/根数" }
        },
        credits: {
          //去掉水印
          enabled: false
        },
        plotOptions: {
          line: {
            //设置颜色，显示点
            color: "#9b59b6",
            dataLabels: {
              enabled: true
            }
          }
        },
        series: [
            
          {
            name: "吸烟根数",
            data: [300, 324, 241, 456, 123, 430, 978, 974, 675, 457, 342, 223]
          }
        ]
      };
      this.chartOptions = template;
    }
  }
 }

</script>

<style scoped>
.canv {
  position: absolute;
  margin-left: 220px;
  margin-top: 80px;
  background-color: white;
  width: 83%;
  height: 85%;
  border-radius: 15px;
}

.canv h2 {
  margin: 10px;
  padding: 5px;
  border-left: 10px solid #9b59b6;
  width: 160px;
}


</style>
