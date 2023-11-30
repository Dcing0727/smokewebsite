<template>
    <div class="con">
        <div class="cl"></div>
        <!-- <div class="banner"></div> -->
        <Carousel></Carousel>
        <div class="content inner_c">
            <div class="product">
                <ul>
                    <li>
                        <p><img src="@/assets/pro5.jpg" alt="" /></p>
                        <h3>史上最强的戒烟广告</h3>
                        <p class="djbf">
                            <a href="https://www.bilibili.com/video/BV1Za411W7yH/?spm_id_from=333.337.search-card.all.click">点击播放</a>
                        </p>
                    </li>
                    <li>
                        <p><img src="@/assets/pro2.jpg" alt="" /></p>
                        <h3>最直观的戒烟宣传片</h3>
                        <p class="djbf">
                            <a href="https://www.bilibili.com/video/BV1BL4y1i7eJ/?spm_id_from=333.337.search-card.all.click">点击播放</a>
                        </p>
                    </li>
                    <li>
                        <p><img src="@/assets/pro3.jpg" alt="" /></p>
                        <h3>学生制作的宣传短片</h3>
                        <p class="djbf">
                            <a href="https://www.bilibili.com/video/BV1hF411e7t1/?spm_id_from=333.337.search-card.all.click">点击播放</a>
                        </p>
                    </li>
                    <li class="last">
                        <p><img src="@/assets/pro1.jpg" alt="" /></p>
                        <h3>戒烟科普</h3>
                        <p class="djbf">
                            <a href="https://www.bilibili.com/video/BV1ct4y1Y7Xi/?spm_id_from=333.337.search-card.all.click">点击播放</a>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
     <knowledgePageVue></knowledgePageVue>
     <Footer></Footer>
</template>

<script>
    import Footer from './page-footer.vue'
    import Carousel from './img-carousel.vue';
    import knowledgePageVue from './knowledge-page.vue';

    export default {
    name: 'home-page',
    components:{
        Footer,
        Carousel,
        knowledgePageVue
    }
};
</script>

<style scoped>
        .con{
            position: relative;
            height: 800px;
            /*此处边框为测试用*/
            /* border: solid 1px black; */
        }
        /*清除浮动的影响*/

        /*版心*/
        .inner_c{
            width: 1000px;
            margin: 0 auto; /*让导航条、内容区域等部分的版心在父亲里居中*/
           /* background-color:rgb(238, 238,238);  */
           /* border: solid 1px black; */
        }

        .content{
            padding-top: 50px;
            /* background-color:rgb(238, 238,238);  */
        }
        .content .product{
            height: 229px;
            border-bottom: 1px solid #DBE1E7;
            /* background-color: #fff; */
        }
        .content .product ul{
            list-style: none;
        }
        .content .product ul li{
            float: left;
            width: 218px;
            margin-right: 43px;
        }
        .content .product ul li.last{
            margin-right: 0;
            width: 217px;
        }
        .content .product ul li img{
            width: 218px;
            height: 130px;
        }
        .content .product ul li.last img{
            width: 217px;
        }

        .content .product ul li h3{
            text-align: center;
            line-height: 38px;
            font-size: 14px;
            font-weight: bold;
        }
        .content .product ul li p.djbf{
            text-align: center;
            line-height: 16px;
        }
        .content .product ul li p.djbf a{
            font-size: 12px;
            color:#38B774;
            text-decoration: none;
            padding-right: 12px;
        }
</style>