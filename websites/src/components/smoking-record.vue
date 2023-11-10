<template>

 <div class="box">
   <h1>打卡页面</h1>
   <h2>欢迎来到烟量打卡页面</h2>
   <p>本功能将在后续进行开发</p>
 </div>
 <Footer></Footer>
</template>
<script>
    import Footer from './page-footer.vue'
    export default {
       name: "smoking-record",
       components:{
        Footer,
    }
   }

</script>

<style scoped>
    .box{
        top: 100px;
        border: 1px solid;
        height: 500px;
        width: 300px;
        position: relative;
        left: 15%;
        color: black;
    }

    
</style>