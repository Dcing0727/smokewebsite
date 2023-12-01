<template>
  <div>
    <Side></Side>
    <div class="canv">
      <h2>每年吸烟量</h2>
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
            text: "每年吸烟量"
            },
            xAxis: {
            //自定义x轴
            categories:["2018", "2019", "2020", "2021", "2022"]
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
            bar: {
                //设置颜色，显示点
                color: "#d35400",
                dataLabels: {
                enabled: true
                }
            }
            },
            series: [
            {
                type:'bar',
                name: "根数",
                data: [1680, 1700, 1450, 1456, 2000]
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
  border-left: 10px solid #d35400;
  width: 160px;
}


</style>
