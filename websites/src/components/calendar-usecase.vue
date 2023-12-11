<template>

  <div class="calendar"
    :class='theme'>
    <div class="close" @click="closeCalendar">❌</div>
    <div class="tools">
      <span class="leftArr"
        @click='handlePrevM()'>&lt;</span>
      <div class="center"
        @click='toggleSelYear'>
        <span class="year">{{thisY}}</span>
        <span>-</span>
        <span class="month">{{thisRM}}</span>     <!--月份显示有问题-->
      </div>
      <span class="rightArr"
        @click='handleNextM()'>&gt;</span>
      <div class="selyear-wrap"
        v-show='showSelYear'>
        <span class='sel-span'
          v-for='(item, index) in 25'
          :key='index + "y"'
          @click='handleSelYear(thisY - 12 + index)'
          :class='{current: thisY == thisY - 12 + index}'>{{thisY - 12 + index}}</span>
      </div>
    </div>
    <div class="weeks">
      <span class="week"
        v-for='(item, index) in weeks'   
        :key='index'>{{item}}</span>                <!-- 显示weeks-->
    </div>
    <!-- 显示days-->
    <div class="days"
      @mouseleave="handleMouseLeave">
      <span class="prevMD sel-span"
        v-for='(item, index) in prevMDLen'
        :key='index + "p"'
        @click='handleSelPrevD(monthDays[prevM] - prevLD[thisW] + item)'>{{monthDays[prevM] - prevLD[thisW] + item}}</span>
        
      <!-- thisMDLen返回对应月份天数  -->
      <!-- 在模板中添加v-show绑定 --> 
      <span class="thisMD sel-span"
            v-for='(item, index) in thisMDLen'   
            :class='{"current": showSelected(index + 1), "range": showRange(index) }'       
            :key='index + "c"'
            @click='handleSelCurD(index + 1)'
            @mouseenter="handleMouseEnter(index + 1)">
        {{index + 1}}
        <!-- 将对号的显示移到这里 -->
        <span v-if="showSelected(index + 1)" class="checkmark">  &#10003; </span>
      </span>


      <span class="nextMD sel-span"
        v-for='(item, index) in nextMDLen'
        :key='index + "n"'
        @click='handleSelnextD(index + 1)'>{{index + 1}}</span>
    </div>
    <div class="btns">
      <CustomButton @click='clearAllSel'>清除选择</CustomButton>
    </div>
  </div>
</template>

<script>
// 注意：不要删下面这行注释！！！！！
 /* eslint-disable */
  import CustomButton from './button-usecase.vue';
  export default {
    components: {
        CustomButton,
    },
    props: {
      msg: String,
      theme: {
        type: String,
        default: 'green',
      },
      selList: {
        type: Array,
        default() {
          return []
        },
      },
      singleSel: {
        type: Boolean,
        default: true,
      },
      curSel: {
        type: Object,
      },
      selMode: {
        type: String,
        default: 'mutiSel',
      },
    },
    // watch: {
    // selList: {
    //     immediate: true,
    //     handler(newVal, oldVal) {
    //       // Do something when selList changes
    //       //console.log('selList changed:', newVal);
    //       // You can update internal state or perform any necessary actions
    //     },
    //   },
    // },
    created() {
      this.selDayList = this.selList.map(item => {
        item.month = item.month - 1
        return item
      })

      // // 重新初始化 selDate、selDay、selDayList
      // this.selDate = new Date(); // 或者使用其他合适的默认日期
      // this.selDay = new Date();
      // this.selDayList = [];


      if (this.curSel) {
        this.selDate = new Date(this.curSel.year, this.curSel.month - 1)
        this.selDay = new Date(this.curSel.year, this.curSel.month - 1, this.curSel.day)
      }

      if (this.selMode == 'rangeSel') {
        this.selDay = ''
        this.selDayList = []
      }
    },
    data() {
      return {
        weeks: '一二三四五六日'.split(''),
        monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        prevLD: [6, 0, 1, 2, 3, 4, 5],
        selDate: new Date(),          //获取当前
        selDay: new Date(),           
        selDayList: [],
        showSelYear: false,
        rangeDayList: [],
        rangeStartD: '',
        rangeEndD: '',
        mouseEnterActive: false,
      }
    },
    computed: {
      isCurM() {
        return this.selDay ? this.thisM == this.selDay.getMonth() : false
      },
      isCurY() {
        return this.selDay ? this.thisY == this.selDay.getFullYear() : false
      },
      thisY() {
        //alert('今年是'+ this.selDate.getFullYear())
        return this.selDate.getFullYear()
      },
      thisM() {
        //console.log('本月是' + this.selDate.getMonth() )
        return this.selDate.getMonth()
      },
      thisD() {
        if (this.selDay) {
          //选择模式
          if (this.selMode == 'mutiSel') {    
            this.selDayList.push({ year: this.selDay.getFullYear(), month: this.selDay.getMonth(), day: this.selDay.getDate() })
            console.log(this.selDayList)
            //console.log({ year: this.selDay.getFullYear(), month: this.selDay.getMonth(), day: this.selDay.getDate() })
          }
          // if (this.selMode == 'rangeSel') {
          //   switch (this.selDayList.length) {
          //     case 0:
          //       this.mouseEnterActive = true

          //       this.selDayList.push({ year: this.selDay.getFullYear(), month: this.selDay.getMonth(), day: this.selDay.getDate() })
          //       break
          //     case 1:
          //       this.mouseEnterActive = false

          //       this.selDayList.push({ year: this.selDay.getFullYear(), month: this.selDay.getMonth(), day: this.selDay.getDate() })
          //       break
          //     case 2:
          //       this.mouseEnterActive = true
          //       this.selDayList = []
          //       this.selDayList.push({ year: this.selDay.getFullYear(), month: this.selDay.getMonth(), day: this.selDay.getDate() })
          //       break
          //   }
          // }
          //console.log(this.selDay.getDate())
          return this.selDay.getDate()      //返回今天日期
        } else {
          return ''
        }
      },
      prevM() {
        return this.thisM - 1 < 0 ? 11 : this.thisM - 1
      },
      nextM() {
        return this.thisM + 1 > 11 ? 0 : this.thisM + 1    
      },
      thisW() {
        return new Date(this.thisY, this.thisM, 1).getDay()
      },
      thisRM() {
        return this.thisM + 1
      },
      thisMDLen() {
        const len = this.monthDays[this.thisRM - 1];   //原来：const len = this.monthDays[this.thisRM];
        //console.log('thisMDLen:', len);
        return len;
        //return this.monthDays[this.thisRM]
      },
      prevMDLen() {
        return this.prevLD[this.thisW]
      },
      nextMDLen() {
        if (this.thisMDLen !== undefined && this.prevMDLen !== undefined) {
          return 42 - this.thisMDLen - this.prevMDLen;
        } else {
          return 0; // 或者其他适当的处理
        }
      },
    },
    methods: {
      //关闭日历组件
      closeCalendar(){
        this.$emit('closeCalendar');
      },

      // 下一个月
      handleNextM() {
        // debugger
        var curM = this.thisM + 1 > 11 ? 0 : this.thisM + 1
        this.selDate = new Date(this.thisY, curM)
      },
      // 上一个月
      handlePrevM() {
        var curM = this.thisM - 1 < 0 ? 11 : this.thisM - 1
        this.selDate = new Date(this.thisY, curM)
      },
      // 单选、多选当前月日期
      handleSelCurD(index) {

        // let _that = this
        // this.selDay = new Date(this.thisY, this.thisM, index)
        // 多选模式  取消选择
        // if (this.selMode == 'mutiSel') {
        //   this.selDayList = this.selDayList.filter(item => {
        //     // debugger
        //     if (item.year == _that.thisY && item.month == _that.thisM && item.day == _that.thisD) {
        //       this.selDay = ''
        //       return false
        //     }
        //     return true
        //   })
        // }

        // 范围选择
        // if (this.selMode == 'rangeSel') {
        //   console.log(this.rangeStartD)
        //   console.log(this.rangeEndD)
        //   switch (this.selDayList.length) {
        //     case 0:
        //       this.rangeStartD = this.selDay.getDate() - 1
        //       break
        //     case 1:
        //       this.rangeEndD = this.selDay.getDate() - 1
        //       break
        //     case 2:
        //       this.rangeStartD = ''
        //       this.rangeEndD = ''
        //       this.rangeStartD = this.selDay.getDate() - 1
        //       break
        //   }
          // this.rangeStartD = index - 1
          // this.selDayList = this.selDayList.filter(item => {
          //   // debugger
          //   if (item.year == _that.thisY && item.month == _that.thisM && item.day == _that.thisD) {
          //     this.selDay = ''
          //     return false
          //   }
          //   return true
          // })
        //}
      },

      // 单选下个月的日期
      handleSelPrevD(index) {
        // this.selDay = new Date(this.thisY, this.prevM, index)
        // this.handlePrevM()
      },

      // 单选上个月的日期
      handleSelnextD(index) {
        // this.selDay = new Date(this.thisY, this.nextM, index)
        // this.handleNextM()
      },

      toggleSelYear() {
        this.showSelYear = !this.showSelYear
      },

      handleSelYear(year) {
        this.selDate = new Date(year, this.thisM)
      },

      // 控制选中状态的展示
      showSelected(index) {
        var sel = false
       // console.log(this.selDayList)
        this.selDayList.forEach(item => {
          if (item.day == index && item.month == this.thisM && item.year == this.thisY) {
            sel = true
          }
        })
        // if (this.selMode == 'singleSel') {
        //   sel = false
        // }
         return sel
       //return (this.thisD == index && this.isCurM && this.isCurY) || sel     这行代码渲染今日的单元格
      },

      clearAllSel() {
        this.selDayList = []
        this.selDay = ''
      },
      // 添加鼠标移入事件
      handleMouseEnter(index) {
        if (this.selDayList.length != 2) {
          this.mouseEnterActive = true
        }
        if (this.mouseEnterActive) {
          this.rangeEndD = index - 1
        }
        // console.log('mouseenter', this.mouseEnterActive, index)
      },
      // 添加鼠标移出事件
      handleMouseLeave(index) {
        if (this.selDayList.length != 2) {
          this.mouseEnterActive = false
        }
        // console.log('mouseenter', this.mouseEnterActive, index)
      },

      showRange(index) {
        // debugger
        let startIndex = Math.min(this.rangeEndD, this.rangeStartD)
        let endIndex = Math.max(this.rangeEndD, this.rangeStartD)
        return (
          startIndex && endIndex && index < endIndex && index > startIndex && (this.mouseEnterActive || this.selDayList.length == 2)
          // (this.selDayList.length == 2 && index >= this.selDayList[0].day && index < this.selDayList[1].day)
        )
      },
    },
    
  }
</script>

<style scoped lang='scss'>
  @import '@/assets/style/index.scss';

  .calendar {
    position: absolute;
    top: 50px;
    left: 29%;
    display: inline-block;
    background-color: white;
    box-shadow: 1px 1px 6px #eee;
  }

  .weeks {
    border-bottom: 1px solid #eee;
  }

  .current {
    color: #fff;
  }

  .close {
    position: absolute;
    right: 0%;
    cursor: pointer;
    width: 22px;
    height: 22px;
    z-index: 1000;
  }

  .tools,
  .weeks,
  .days {
    width: 504px;
    display: flex;
    flex-wrap: wrap;

    span {
      flex: 0 0 70px;
      height: 70px;
      line-height: 70px;
      margin: 1px;
      cursor: pointer;
    }

    .prevMD,
    .nextMD {
      background: #eee;
      color: #aaa;
    }
  }

  .days span,
  .weeks span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tools {
    position: relative;
    justify-content: space-around;

    span {
      cursor: pointer;
    }

    .selyear-wrap {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      width: 100%;
      top: 50px;
      background: #fff;
      height: 440px;

      span {
        flex: 1 0 19%;
      }
    }
  }

  .range {
    background: #ccc;
  }

  .red {
    .sel-span.current {
      background: $r-bg;
    }

    .sel-span:hover {
      outline: 2px solid $r-bg;
    }
  }

  .green {
    .sel-span.current {
      background: #2ecc71;
      outline: 2px solid #2ecc71;
      position: relative;
    }

    .sel-span:hover {
      outline: 2px solid #2ecc71;
    }

    // .sel-span::before {
    //   position: absolute;
    //   left: 20%;
    //   top: 20%;
    //   transform: translate(-50%, -50%);
    //   width: 20px;
    //   height: 2px;
    //   background-color: #2ecc71;
    // }

    /* 新添加的样式用于对号的显示 */
    .checkmark {
      position: absolute;
      bottom: -8px;
      right: 25px;
      color: #fff;
      font-size: 20px;
    }
  }
  .btns {
    position: absolute;
    left: 39%;
  }
</style>
