<template>
  <button
    class="custom-button"
    :style="{ backgroundColor: buttonColor }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <slot></slot>
    <div v-if="showRipple" class="ripple" :style="{ background: rippleColor, left: rippleX + 'px', top: rippleY + 'px' }"></div>
  </button>
</template>

<script>
export default {
  props: {
    buttonColor: {
      type: String,
      default: '#2ecc71', // 默认按钮颜色为绿色
    },
    rippleColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.7)', // 默认涟漪颜色为白色半透明
    },
  },
  data() {
    return {
      showRipple: false,
      rippleX: 0,
      rippleY: 0,
    };
  },
  methods: {
    handleMouseEnter(event) {
      const rect = event.target.getBoundingClientRect();
      this.rippleX = event.clientX - rect.left;
      this.rippleY = event.clientY - rect.top;
      this.showRipple = true;
    },
    handleMouseLeave() {
      this.showRipple = false;
    },
    handleClick() {
      // 处理按钮点击事件
      // 可以添加自定义的点击事件处理逻辑

    },
  },
};
</script>

<style scoped>
.custom-button {
  color: white;
  position: relative;
  overflow: hidden;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;
  user-select: none;
  opacity: 1; 
}
.ripple {
  opacity: 1;
  position: absolute;
  border-radius: 50%;
  /* background-color: red;  */
  width: 10px; /* 设置一个固定的宽度 */
  height: 10px; /* 设置一个固定的高度 */
  transform: scale(0);
  animation: ripple-animation 0.5s linear;
}


@keyframes ripple-animation {
  to {
    transform: scale(5);
    opacity: 0;
  }
}
</style>
