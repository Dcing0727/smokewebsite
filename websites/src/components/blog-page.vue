<template>
<div>
  <div class="box">
    <h1>博客页面</h1>
    <h2>欢迎来到博客页面</h2>
    <p>本功能将在后续进行开发</p>
  </div>
  <Footer></Footer>
</div>


 
</template>
<script>
    import Footer from './page-footer.vue'
    export default {
       name: "blog-page", 
       components:{
            Footer,
       }
   };

</script>

<style scoped>
    .box{
        
        position: relative;
        margin: 5px;
        top: 250px;
        left: 250px;
        color: black;
    }
      *{
            margin: 0px;
            padding: 0px;
        }

    
</style>