<template>
     <div id="scroll" :v-model="dataPopRadio" class="solidUl" @scroll="scrollChange">
            <ul>
              <li class="scrollli"
                v-for="(item, index) in dataPopOption"
                :key="index"
              >{{item.label}}</li>
            </ul>
            <div class="backgroundFloat"></div> 
     </div>
     
</template>

<script>
 export default{
        components: {
        
        },
        data(){
            return {
                dataPopOption : [{
                    name: '年假',
                    label: '年假'
                    }, {
                    name: '事假',
                    label: '事假'
                    }, {
                    name: '病假',
                    label: '病假'
                    }, {
                    name: '倒休假',
                    label: '倒休假'
                    }, {
                    name: '婚假',
                    label: '婚假'
                    }, {
                    name: '产假',
                    label: '产假'
                    }, {
                    name: '产检假',
                    label: '产检假'
                    },
                ]
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
                if((lis[i].offsetTop-e.target.scrollTop) > 44&& (lis[i].offsetTop-e.target.scrollTop) < 84){
                //当元素滚动到当前位置时，先将元素原来为"active2"的class属性去掉
                //再给元素增加"active"的属性
                lis[i].classList.remove("active2")
                lis[i].classList.add("active")
                //给当前元素以上的元素动态设置文字大小，离当前文字越远，文字大小越小
                for(var j = 1; j <= i; j++){
                    lis[i-j].style.fontSize = (20-3.5*j)+'px';
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
    },  
    mounted() {
       //this.scrollChange();
    },

};



</script>


<style scoped>
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
        left: 50%;
        top: 50%;
    }

    .solidUl::-webkit-scrollbar {
        display: none;
    }

    ul {
        padding: 80px 0 230px 0;
        margin: 0;
        background-color: #fff;
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
        background-color: #fff;
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
</style>