<template>
    <div>
        <Side></Side>
        <div class="canv">
            <h2>记录今日</h2>
            <scroll></scroll>
        </div>
    </div>
</template>

<script>
   import Scroll from './scroll-selector.vue';
   import Side from './side-bar.vue';
    export default {
        components:{
            Scroll,
            Side,
        },
    }
</script>

<style scoped>
 .canv {
    position: absolute;
    margin-left: 220px;
    margin-top: 80px;
    /* background-color: rgb(248, 241, 228); */
    background-color: #fff;
    width: 83%;
    height: 85%;
    border-radius: 15px;
  }
  .canv h2 {
    margin: 10px;
    padding: 5px;
    border-left: 10px solid #d4237a;
    width: 160px;
  }

</style>