<template>
    <div class="package">
        <h2>记录卡片</h2>
        <img class="lock" src="@/assets/锁定.png" alt="">
        <div id="scroll" :v-model="dataPopRadio" class="solidUl" @scroll="scrollChange">
                <ul>
                    <li class="scrollli"
                        v-for="(item, index) in dataPopOption"
                        :key="index"
                    >{{item.label}}</li>
                </ul>
                <div class="backgroundFloat"></div> 
        </div>
        <count :num="initCount" @countChange="handleCountChange"></count>
        <button class="customButton" @click="handleButtonClick">记录</button>
    </div>
</template>

<script>
    import { jwtDecode } from 'jwt-decode';
    import Count from './smoking-count.vue';
    export default{
        components: {
            Count,
        },
        data(){
            return {
                dataPopOption : [{
                        name: '0',
                        label: '利群'
                    }, {
                        name: '1',
                        label: '红旗渠'
                    }, {
                        name: '2',
                        label: '黄鹤楼'
                    }, {
                        name: '3',
                        label: '云烟'
                    }, {
                        name: '4',
                        label: '中华烟'
                    }, {
                        name: '5',
                        label: '南京'
                    }, {
                        name: '6',
                        label: '玉溪'
                    },
                ],
                brand: "利群",
                tag: 0,
                initCount: 0,
                changedCount: 0,
                expense: 0,
            };
        },
        methods: {
                scrollChange(e){
                    //首先获取到li元素
                    var lis = document.getElementsByClassName('scrollli');
                        //对li元素进行遍历
                    for(var i = 0 ; i < lis.length; i++){
                        //offsetTop返回当前元素相对于节点顶部偏移量，scrollTop返回一个元素垂直滚动的距离
                        //在滚动过程中，lis[i].offsetTop-e.target.scrollTop可获取到当前元素距离顶部的位置
                        //打印出结果自己对比，选择自己需要范围的值，我给li设置的高度为40px，因此185与225之间相差40，
                        //而185与225是我实际输出对比测量的我需要元素滚动到该位置时设置样式。
                        if((lis[i].offsetTop-e.target.scrollTop) > 44 && (lis[i].offsetTop-e.target.scrollTop) < 84){
                            //当元素滚动到当前位置时，先将元素原来为"active2"的class属性去掉
                            //再给元素增加"active"的属性
                            lis[i].classList.remove("active2")
                            lis[i].classList.add("active")
                            this.tag = i;
                            //给当前元素以上的元素动态设置文字大小，离当前文字越远，文字大小越小
                            for(var j = 1; j <= i; j++){
                                lis[i-j].style.fontSize = (20-3.5*j) + 'px';
                            }
                            //给当前元素以下的元素动态设置文字大小，离当前文字越远，文字大小越小
                            for(var a = 1; a < lis.length-i; a++){
                                lis[i+a].style.fontSize = (20-3.5*a)+'px';
                            }
                            //当没滚动到期待位置时，也就是其他所有元素，移除"active"的样式，增加"active2"的样式
                            }else{
                                lis[i].classList.remove("active");
                                lis[i].classList.add("active2");
                            }
                    }
                },
                handleCountChange(newCount){
                    this.changedCount = newCount;
                },
                handleButtonClick(){     //计算函数
                    // 假设 token 是你从 localStorage 中获取的 JWT
                    const token = localStorage.getItem("token");
                    // 解码 JWT
                    //console.log(token)
                    const decodedToken = jwtDecode(token);
                    // 获取用户账号
                    console.log(decodedToken)
                    const userAccount = decodedToken.sub;
                    // 现在，userAccount 包含了JWT负载中的用户账号信息
                    console.log("用户账号：", userAccount);
                    const today = new Date();
                    const formattedDate = today.toLocaleDateString(); // Get local date in 'YYYY-MM-DD' format
                    console.log(this.changedCount)
                    console.log(this.tag)
                    
                 switch (this.tag) {
                            case 0:
                                this.expense = this.changedCount * 0.7;
                                break;
                            case 1:
                                this.expense = this.changedCount * 0.5;
                                break;
                            case 2:
                                this.expense = this.changedCount * 0.95;
                                break;
                            case 3:
                                this.expense = this.changedCount * 1.15;
                                break;
                            case 4:
                                this.expense = this.changedCount * 3.25;
                                break;
                            case 5:
                                this.expense = this.changedCount * 0.8;
                                break;
                            case 6:
                                this.expense = this.changedCount * 1.15;
                                break;
                            default:
                                // 在没有匹配的情况下，设置一个默认值或引发错误
                                this.expense = 0; // 也可以是其他默认值
                                // 或者 throw new Error('Unexpected tag value: ' + this.tag);
                    }
                    console.log('花销' + this.expense)
                    console.log(formattedDate)

                     fetch('http://localhost:3000/api/user/record', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            account: userAccount,
                            date:  formattedDate,
                            smokingType: this.tag,
                            smokingAmount: this.changedCount,
                            smokingExpenses: this.expense,
                        }),
                    })
                    .then(response => response.json())
                    .then(data => {
                    if (data.success) {
                        alert('记录成功')
                    } else {
                        console.error("记录失败");
                    }
                    })
                    .catch(error => {
                        console.error("发生错误:", error);
                    });
                    },
                },  
                mounted() {


                },

            };
</script>

<style scoped>
    .package{
        position: absolute;
        width: 400px;
        height: 400px;
        left: 35%;
        top: 20%;
        box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.2);
        /* border: 1px solid black; */
        background-color: rgb(248, 241, 228);
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        border-radius: 20px; 
        cursor: pointer;
    }
    .package:hover {
        transform: scale(1.1); /* 将组件放大为原始大小的1.1倍 */
        box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
    }
    .package h2{
        position: absolute;
        top: 25px;
        left: 36% ;
        color: #333;
    }
    .package .lock{
        position: absolute;
        top: 25px;
        right: 10% ;
        width: 30px;
        height: 30px;
    }
    .solidUl {
        /* border: 1px solid black; */
        width: 300px;
        padding-top: 40px;
        margin-top: 15px;
        height: 150px;
        overflow-y: scroll;
        touch-action: pan-y;
        -webkit-overflow-scrolling: touch;
        position: absolute;
        left: 11%;
        top: 20%;
    }
    .solidUl::-webkit-scrollbar {
        display: none;
    }
    ul {
        padding: 80px 0 230px 0;
        margin: 0;
        background-color: rgb(248, 241, 228);
        position: absolute;
        top: 0;
        width: 100%;
        height: 400px;
        /* border: solid 1px red; */
    }
    li {
        list-style: none;
        font-size: 18px;
        line-height: 20px;
        text-align: center;
        opacity: 0.3;
        height: 40px;
        background-color: rgb(248, 241, 228);
    }
    .active {
        font-weight: 400;
        font-size: 20px !important;
        color: #333;
        opacity: 1.2 !important;
        top: 150px;
    }
    .active2 {
        color: #333;
        opacity: 0.6 !important;
    }
    .backgroundFloat {
        width: 300px;
        height: 40px;
        background-color: #d1d1d1;
        opacity: 0.2;
        position: sticky;
        top: 20%;
    }
    .customButton {
        background-color: #4caf50;
        color: white;
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 20px;
        position: absolute;
        top: 78%;
        left: 39%  ;
    }
    .customButton:hover {
         /* 鼠标悬停时的样式 */
        background-color: #45a049;
    }
</style>