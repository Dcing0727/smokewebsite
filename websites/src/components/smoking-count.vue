<template>
  <div class="container">
    <input class="" type="text" v-model="count">
    <div class="inBtn" @click="increase"></div>
    <div class="deBtn" @click="decrease"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increase() {
      this.count++;
    },
    decrease() {
      this.count--;
    },
  },
};
</script>

<style scoped>
    .container {
        position: absolute;
        top: 100px;
        left: 150px;
    }
    .inBtn{
        width: 30px;
        height: 20px;
        background: url('@/assets/增加按钮.png');
        background-size: cover;
        background-position: center;
    }
    .deBtn{
        width: 30px;
        height: 20px;
        background: url('@/assets/减少按钮.png');
        background-size: cover;
        background-position: center;
    }
</style>