<template>
    <div>
        <Side></Side>
        <div class="canv">
            <h1>戒烟统计页面</h1>
            <rain  :rainNumber="100" :rotateDeg="40" :w="1.2" :h="140"></rain>
        </div>

    </div>
    
</template>
<script>
 import Side from './side-bar.vue'
 import rain from './background-vue.vue'
    export default {
       name: "smoke-statistics",
       components:{
            Side,
            rain
       }
   };

</script>

<style scoped>
    /* .box{
        position: absolute;
        top: 30%;
        left: 15%;
        color: black;
    } */
    .canv {
          position: absolute;
        margin-left: 220px;
        margin-top: 80px;
        background-color: white;
        width: 83%;
        height: 85%;
        border-radius: 15px;
        background-image: url('@/assets/夜空.jpg');
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .canv h1{
        color: white;
        font-size: 60px;
        font-family: "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
    }

    
</style>