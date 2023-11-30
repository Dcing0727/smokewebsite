<template>
  <div class="page-container">
    <!-- 其他页面内容 -->

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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  z-index:-1;
}

.footer-container {
  margin-top: auto;
  height: 50px;
  background-color: #383838;
  width: 100%;
  z-index: 100;
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
