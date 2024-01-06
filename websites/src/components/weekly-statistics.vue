<template>
  <div>
    <Side></Side>
    
    <div class="canv">
      <h2>每周吸烟量</h2>
      <Drag :MenuTitle="MenuTitle" :MenuItems="MenuItems" @menu-item-click="selectWeek"></Drag>
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>

<script>
import Side from './side-bar.vue';
import Drag from './Drop-downMenu';
import { jwtDecode } from 'jwt-decode';
export default {
  components: {
    Side,
    Drag
  },
  data() {
    return {
      chartOptions: {},
      MenuTitle: '选择近四周',
      MenuItems: ['第一周', '第二周', '第三周', '第四周'],
      dataSet: {
        data1: [120, 124, 141, 156, 123, 230, 278],
        data2: [120, 224, 141, 156, 179, 180, 138],
        data3: [220, 124, 141, 156, 179, 180, 138],
        data4: [120, 124, 141, 156, 179, 180, 138]
      },
      select: [],   // 默认显示第4周数据
    };
  },
  mounted() {
    this.selectWeek("第一周");
  },
  methods: {
    // 接口
     
    selectWeek(item) {

      // 获取用户Account
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userAccount = decodedToken.sub;
      var weekId = 4;

        if (item === '第一周') {
          //this.select = this.dataSet.data1;
          weekId = 1;
        } else if (item === '第二周') {
          //this.select = this.dataSet.data2;
          weekId = 2;
        } else if (item === '第三周') {
          //this.select = this.dataSet.data3;
          weekId = 3;
        } else if (item === '第四周') {
          //this.select = this.dataSet.data4;
          weekId = 4;
        }
        fetch('http://localhost:3000/api/user/weekly', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             account: userAccount,
             weekId: weekId             
            }),
          })
          .then(response => response.json())
          .then(data => {
 
            if (data.success) {
              console.log(data.weeklySum)
              this.select = data.weeklySum;
              this.getChart(item);
              return this.select;     // 返回数据库中记录
            } else {
              console.log(data.error);
               console.error("失败");
            }
          })
          .catch(error => {
            console.error("发生错误:", error);
          });

        
    },
    getChart(item) {
      var template = {
        title: {
          text: item  + "每周吸烟量",
        },
        xAxis: {
          categories:["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
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
            color: "#0e6145", // 线的颜色
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
              color: 'rgba(0, 0, 0, 0.3)', // 阴影颜色
              offsetX: 4, // 阴影水平偏移量
              offsetY: 4, // 阴影垂直偏移量
              opacity: 0.7, // 阴影透明度
              width: 4, // 阴影模糊范围
            },
          },
        },
        series: [
          {
            name: "吸烟根数",
            data: this.select,
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
  border-left: 10px solid seagreen;
  width: 160px;
}
</style>
