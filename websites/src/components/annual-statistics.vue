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
import { jwtDecode } from 'jwt-decode';

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
    this.show();
  },
  methods: {
    show() {
      // 获取用户Account
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userAccount = decodedToken.sub;

       fetch('http://localhost:3000/api/user/yearly', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             account: userAccount,         
            }),
          })
          .then(response => response.json())
          .then(data => {
 
            if (data.success) {

              console.log(data.yearlySum)
              //this.select = data.yearlySum;
              this.getChart(data.yearlySum);
            } else {
              console.log(data.error);
               console.error("失败");
            }
          })
          .catch(error => {
            console.error("发生错误:", error);
          });

      
    },
    getChart(yearlySum) {
      var template = {
        title: {
          text: "每年吸烟量",
        },
        xAxis: {
          categories: [
            yearlySum[4].year, 
            yearlySum[3].year,
            yearlySum[2].year, 
            yearlySum[1].year, 
            yearlySum[0].year
            ],
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
          bar: {
            color: "#d35400",
            pointWidth: 40,
            dataLabels: {
              enabled: true,
              color: '#fff', // 数据标签颜色
              fontSize: '14px', // 数据标签字体大小
            },
            shadow: {
              color: 'rgba(0, 0, 0, 0.3)', // 阴影颜色
              offsetX: 2, // 阴影水平偏移量
              offsetY: 2, // 阴影垂直偏移量
              opacity: 0.7, // 阴影透明度
              width: 2, // 阴影模糊范围
            },
          },
        },
        series: [
          {
            type: 'bar',
            name: "根数",
            // data: [
            //   {y: 1680, color: '#d35400'},
            //   {y: 1700, color: '#3498db'},
            //   {y: 1450, color: '#2ecc71'},
            //   {y: 1456, color: '#e74c3c'},
            //   {y: 2000, color: '#f39c12'},
            // ],
            data: [
              {y:yearlySum[4].totalSmokingAmount, color: '#d35400'},
              {y:yearlySum[3].totalSmokingAmount, color: '#3498db'},
              {y:yearlySum[2].totalSmokingAmount, color: '#2ecc71'},
              {y:yearlySum[1].totalSmokingAmount, color: '#e74c3c'},
              {y:yearlySum[0].totalSmokingAmount, color: '#f39c12'},
            ],
          },
        ],
        legend: {
          itemStyle: {
            color: '#333', // 图例颜色
            fontSize: '14px', // 图例字体大小
          },
        },
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
  border-left: 10px solid #d35400;
  width: 160px;
}
</style>
