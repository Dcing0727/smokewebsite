<template>
  <div class="page-container">
    <div class="canv">
        <div class="showcalendar" @click="showCalendar = !showCalendar" ></div>
        <h1>您已坚持戒烟{{days}}天</h1>
        <div class="button-container">
            <div class="CustomButton1">
                <CustomButton @click="recordToday">打卡!</CustomButton>
            </div>
            <div class="CustomButton2" >
                <CustomButton @click="failRecord" :buttonColor="'#e74c3c'" :rippleColor="'rgba(255, 255, 255, 0.7)'">挑战失败</CustomButton>
            </div>
        </div>
        <calendar v-show="showCalendar"  :selList="selectedDates" :FailList="failDates"  v-if="Object.keys(selectedDates).length >0" @closeCalendar="handleCloseCalendar"></calendar>
    </div>
  </div>
</template>

<script>
import CustomButton from './button-usecase.vue';
import Calendar from './calendar-usecase.vue';
import { jwtDecode } from 'jwt-decode';
//import  vue  from 'vue';
export default {
    components: {
        CustomButton,
        Calendar
    },
    data() {
        return {
            days: 30,
            showCalendar: false,
            selectedDates: [
                //戒烟打卡日期
                // { year: 2023, month: 12, day: 1 },
                // { year: 2023, month: 12, day: 2 },
                // { year: 2023, month: 12, day: 3 },
                // { year: 2023, month: 12, day: 4 },
                // { year: 2023, month: 12, day: 5 },
                // { year: 2023, month: 12, day: 6 },
                // { year: 2023, month: 12, day: 7 },
                 { year: 2024, month: 1, day: 8 },
            ],
            failDates: [
                { year: 2023, month: 1, day: 8 },
                
            ],
            todayDate: new Date(),
        };
    },
    methods:{
        parseDateString(dateString) {       // 日期类型转换
            const [year, month, day] = dateString.split('-').map(Number);
            return { year, month:month-1, day };
        },
        showResults(){
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const userAccount = decodedToken.sub;

            fetch('http://localhost:3000/api/user/checkin', {
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
                // const successRecords = [];
                // const failRecords = [];

                for (const record of data.checkinRecords) {
                    if (record.status === 1) {
                        this.selectedDates.push(this.parseDateString(record.checkinDate));
                    } else if (record.status === 0) {
                        this.failDates.push(this.parseDateString(record.checkinDate));
                    }
                }
               
                 // 打印结果
                console.log('成功',this.selectedDates);
                console.log('失败',this.failDates);

             
            } else {
              console.log(data.error);
               console.error("失败");
            }
          })
          .catch(error => {
            console.error("发生错误:", error);
          });
        },
        handleCloseCalendar() {
            this.showCalendar = false;
        },
        recordToday() {
            const newDate = {
                year: this.todayDate.getFullYear(),
                month: this.todayDate.getMonth(),
                day: this.todayDate.getDate(),
            };
            this.selectedDates.push({ ...newDate });
            //console.log("来自父组件的更改"+this.selectedDates)
        },
        failRecord() {
            const newDate = {
                year: this.todayDate.getFullYear(),
                month: this.todayDate.getMonth(),
                day: this.todayDate.getDate(),
            };
            this.failDates.push({ ...newDate });
        }


    },
    mounted(){
        this.showResults();
    },
};
</script>

<style scoped>
    .page-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh; /* 使用视窗高度作为容器高度 */
    }

    .canv .showcalendar {
        position: absolute;
        top: 50px;
        left: 20px;
        width: 50px; /* 设置日历的宽度，根据实际需求调整 */
        height: 50px; /* 设置日历的高度，根据实际需求调整 */
        background: url('@/assets/日历.png') no-repeat;
        background-size: cover;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease; 
    }

    .canv .showcalendar:hover {
        transform: scale(1.2); /* 鼠标悬停时放大1.2倍 */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
    }

    .canv {
        position: absolute;
        background-color: white;
        width: 80%;
        height: 95%;
        border-radius: 15px;
        display: flex;
        flex-direction: column; /* 修改为垂直布局 */
        align-items: center;
        justify-content: center;
        background-image: url('@/assets/sea.jpg');
        background-size: cover;
        background-position: center;
    }

    .canv h1 {                                                                                                                                                              
        font-size: 4em; /* 调整字体大小 */
        text-align: center; /* 文本居中 */
        color: azure;
    }

    .button-container {
        display: flex;
        margin-top: 60px; /* 调整按钮容器与标题的间距 */
    }

    .button-container .CustomButton1,
    .button-container .CustomButton2 {
        margin: 0 10px; /* 调整按钮之间的间距 */
    }
</style>