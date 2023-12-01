<template>
    <div class="content">
        <div class="homepagecontent3">
            <div class="photo1">
                <img  id="photo1" src="@/assets/z.png" alt="">
            </div>
            <div class="introduce">
                <h3>戒烟资讯一</h3>
                <p> 设定戒烟的明确目标，例如戒烟的日期和戒烟后的奖励。这有助于提供明确的动力。</p>
            </div>
        </div>
        <div class="homepagecontent3">
                <div class="photo1">
                    <img src="@/assets/i.jpg" alt="">
                </div>
                <div class="introduce">
                    <h3>如何更快戒烟？</h3>
                    <p>告诉你的家人、朋友和同事你的戒烟计划，争取他们的支持。你也可以考虑加入戒烟支持小组。</p>
                </div>
            </div>
            <div class="homepagecontent3">
                <div class="photo1">
                    <img src="@/assets/o.jpg" alt="">
                </div>
                <div class="introduce">
                    <h3>坚持</h3>
                    <p>戒烟可能不是一次就能成功的过程。如果失败了，不要灰心，继续努力。</p>
                </div>
            </div>
            <div class="homepagecontent3">
                <div class="photo1">
                    <img src="@/assets/q.jpeg" alt="">
                </div>
                <div class="introduce">
                    <h3>寻找专业帮助</h3>
                    <p>考虑寻求专业戒烟帮助，如尼古丁替代疗法、草药疗法或药物治疗。</p>
                </div>
            </div>
            <div class="homepagecontent3">
                <div class="photo1">
                    <img src="@/assets/w.jpg" alt="">
                </div>
                <div class="introduce">
                    <h3>避免诱因</h3>
                    <p>避免触发你吸烟欲望的环境和活动。</p>
                </div>
            </div>
            <div class="homepagecontent3">
                <div class="photo1">
                    <img src="@/assets/pro2.jpg" alt="">
                </div>
                <div class="introduce">
                    <h3>逐步减少</h3>
                    <p> 逐步减少吸烟量，逐渐过渡到戒烟。这有助于缓解戒断症状。</p>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
    name: 'kno-page',
    };
</script>
<style scoped>
    .content
    {
        /* opacity: 0.6; */
        height: 490px;
        min-width: 1200px;
        width: 1300px;
        background-color:rgb(238, 238,238);
        /* background-color: #000; */
        /* background-color:rgba(0,0,0,0.6); */
        /* height: 2000px; */
        /* border: solid 1px black; */
        position: absolute;
        left: 50%;
        transform: translate(-50%); 
        display: flex;
        /* flex-direction: column; */
        justify-content: space-between;
        font-size: large;
        flex-wrap:wrap;
        /* margin-left: 20px;s */


          /*此处边框为测试用*/
        /* border:solid 1px black; */
    }   
    .homepagecontent3{
        width: 400px;
        height: 180px;
        color: #000;
        /* margin-top: 30px; */
        font-size: smaller;
        display: flex;
        justify-content: space-between;
        border: solid 10px #fff;    
        padding: 10px;
        /* box-sizing: border-box; */
        /* border: solid 1px #fff; */
    }
    .homepagecontent3 .photo1 img{
        width: 140px;
        /*原高210px*/
        height: 140px;
    }
    .homepagecontent3 p{
        margin-top: 10px;
        margin-left: 10px;
    }
    .homepagecontent3 h3{
        margin-left: 10px;
        margin-top: 5px;
    }

    /*悬浮放大效果*/
    .homepagecontent3 .photo1 img{
        -webkit-transition: all ease .3s;
        transition: all ease .3s 
    }
    .homepagecontent3 .photo1 img:hover {
        -webkit-transform: scale(1.45);
        transform: scale(1.25);
        box-shadow: 0px 0px 18px rgba(0,0,0,.5);
    }
</style>