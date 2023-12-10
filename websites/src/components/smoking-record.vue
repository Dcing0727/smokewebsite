<template>
  <div class="page-container">
    <div class="canv">
        <div class="calendar"></div>
        <h1>您已坚持戒烟{{days}}天</h1>
        <div class="button-container">
            <div class="CustomButton1"  >
                <CustomButton>打卡!</CustomButton>
            </div>
            <div class="CustomButton2" >
                <CustomButton :buttonColor="'#e74c3c'" :rippleColor="'rgba(255, 255, 255, 0.7)'">挑战失败</CustomButton>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import CustomButton from './button-usecase.vue';

export default {
    components: {
        CustomButton,
    },
    data() {
        return {
            days: 30,
        };
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

.canv .calendar {
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

.canv .calendar:hover {
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