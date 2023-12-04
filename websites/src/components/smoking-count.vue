<template>
  <div class="container">
    <input class="numberbox" type="text" v-model="count" @input="edit">
    <div class="inBtn" @click="increase"></div>
    <div class="deBtn" @click="decrease"></div>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      // default: 0,
    },
  },
  data() {
    return {
      count: this.num,
    };
  },
  methods: {
    increase() {              //增加按钮函数事件
      this.count++;
      this.$emit('countChange', this.count);     
    },
    decrease() {              //减少按钮函数事件
      if (this.count == 0){
        this.count = 0;
      }else{
        this.count--;
        this.$emit('countChange', this.count);
      }
    },
    edit() {                  //键盘输入函数事件
      this.$emit('countChange', this.count);
    }
  },
};
</script>

<style scoped>
  .container {
    position: absolute;
    top: 245px;
    left: 34px;
    /* border: 1px solid black; */
    width: 320px;
    height: 80px;
    overflow: hidden;
  }

  .numberbox {
    position: absolute;
    top: 20px;
    left: 50px;
    width: 220px;
    height: 40px;
    font-size: 24px;
    text-align: center;
    border: none;
    outline: none;
    background: transparent;
    border-bottom: 2px solid #333;
    color: #333;
  }
  .inBtn {
    left: 15px;
    background: url('@/assets/增加按钮.png');
  }

  .deBtn {
    right: 15px;
    background: url('@/assets/减少按钮.png');
  }

  .inBtn:hover,
  .deBtn:hover {
    transform: scale(1.2);
  }

  .inBtn,
  .deBtn {
    width: 30px;
    height: 30px;
    background-size: cover;
    background-position: center;
    display: inline-block;
    position: absolute;
    top: 30px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
  }


</style>
