<template>

 <div class="box">
   <h1>统计页面</h1>
   <h2>欢迎来到烟量统计页面</h2>
   <p>本功能将在后续进行开发</p>
 </div>
 <Footer></Footer> 
</template>
<script>
 import Footer from './page-footer.vue'
    export default {
       name: "smoke-statistics",
       components:{
            Footer,
       }
   };

</script>

<style scoped>
    .box{
        position: absolute;
        top: 30%;
        left: 15%;
        color: black;
    }

    
</style>