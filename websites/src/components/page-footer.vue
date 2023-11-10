<template>
  <div class="page-container">
    <!-- 上面的组件放在这里 -->

    <div class="footer-container">
      <div class="section footer fp-auto-height">
        <hgroup class="foo">
          <h5>Copyright © </h5>
          <h5>XXXXXXX公司  Email:XXXXXXX@163.com  tel:XXXXXX-XXXXXX</h5>
        </hgroup>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-footer',
};
</script>

<style scoped>
.page-container {
  
  position: relative;
  z-index: 1; /* 提高上面组件的层级，确保在底部元素之上 */
}

/* 上面的组件样式 */

.footer-container {
  height: 50px;
  background-color: #383838;
  width: 100%;
  position: fixed; /* 使用 fixed 保持在视口底部 */
  bottom: 0;
  left: 0;
  z-index: 0; /* 底部元素的层级设置较低 */
}

.footer .foo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 22px;
}

.footer .foo h5 {
  text-align: center;
  color: #8E8E8E;
  margin: 0;
}
</style>
