<template>
  <div>
    <Side></Side>
    <div class="canv">
      <h2>每月吸烟量</h2>
      <Drag :MenuTitle="MenuTitle" :MenuItems="MenuItems"  @menu-item-click="selectYear"></Drag>
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>

<script>
import Side from './side-bar.vue';
import Drag from './Drop-downMenu.vue';

export default {
  components: {
    Side,
    Drag
  },
  data() {
    return {
      chartOptions: {},
      MenuTitle: '近五年统计',
      MenuItems: ['第一年统计', '第二年统计', '第三年统计', '第四年统计', '第五年统计'],
      dataSet: {
        data1: [300, 324, 241, 456, 123, 430, 978, 974, 675, 457, 342, 223],
        data2: [320, 324, 341, 356, 379, 380, 438, 474, 575, 657, 742, 823],
        data3: [320, 524, 541, 656, 979, 1380, 238, 774, 975, 157, 242, 223],
        data4: [120, 224, 341, 456, 579, 6380, 738, 874, 975, 1057, 1142, 1223],
        data5: [122, 324, 341, 456, 579, 580, 638, 874, 975, 1057, 1142, 1223],
      },
      select: [],   // 默认显示第五年数据
    };
  },
  mounted() {
    this.selectYear('第五年统计');  // 初始化选择第五年数据
  },
  methods: {
    // 选中年份
    selectYear(item) {
      // 处理来自子组件的点击事件
      console.log(item)
      if (item === '第一年统计') {
        this.select = this.dataSet.data1;
      } else if (item === '第二年统计') {
        this.select = this.dataSet.data2;
      } else if (item === '第三年统计') {
        this.select = this.dataSet.data3;
      } else if (item === '第四年统计') {
        this.select = this.dataSet.data4;
      } else if (item === '第五年统计') {
        this.select = this.dataSet.data5;
      }
       this.getChart(item);
       return this.select;
    },
    getChart(item) {
      var template = {
        title: {
          text: item + "每月吸烟量",
        },
         accessibility: {
          enabled: false, // 将这里的值设置为 false
        },
        xAxis: {
          categories: ["一月", "二月", "三月", "四月", "五月", "六月", "七月",
            "八月", "九月", "十月", "十一月", "十二月"],
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
            data: this.select,  // 修改这里
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
