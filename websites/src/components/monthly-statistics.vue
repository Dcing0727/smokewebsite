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
      chartOptions: {},
    };
  },
  mounted() {
    this.getChart();
  },
  methods: {
    getChart() {
      var template = {
        title: {
          text: "每月吸烟量",
        },
        xAxis: {
          categories:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          labels: {
            style: {
              color: '#333', // x轴标签颜色
              fontSize: '14px', // x轴标签字体大小
            },
          },
        },
        yAxis: {
          title: { text: "吸烟/根数" },
          labels: {
            style: {
              color: '#333', // y轴标签颜色
              fontSize: '14px', // y轴标签字体大小
            },
          },
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          line: {
            color: "#9b59b6", // 线的颜色
            lineWidth: 2, // 线的宽度
            marker: {
              enabled: true,
              symbol: 'circle', // 数据点标记的形状
              radius: 6, // 数据点标记的半径
            },
            dataLabels: {
              enabled: true,
              color: '#333', // 数据标签颜色
              fontSize: '12px', // 数据标签字体大小
              y: -15, // 数据标签在点的上方
            },
            shadow: {
              color: 'rgba(0, 0, 0, 0.5)', // 阴影颜色
              offsetX: 5, // 阴影水平偏移量
              offsetY: 5, // 阴影垂直偏移量
              opacity: 0.75, // 阴影透明度
              width: 2, // 阴影模糊范围
            },
          },
        },
        series: [
          {
            name: "吸烟根数",
            data: [300, 324, 241, 456, 123, 430, 978, 974, 675, 457, 342, 223],
          },
        ],
      };
      this.chartOptions = template;
    },
  },
};
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
