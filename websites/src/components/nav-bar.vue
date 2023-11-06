<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/assets/5.png" alt="Logo">
    </div>
    <ul class="nav-links">
      <li><router-link to="/" class="custom-link">登录页</router-link></li>
      <li><router-link to="/statistics" class="custom-link">烟量统计</router-link></li>
      <li><router-link to="/blog" class="custom-link">博客页面</router-link></li>
      <li><router-link to="/record" class="custom-link">戒烟打卡</router-link></li> 
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'nav-bar',
};
</script>

<style scoped>
.navbar {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #000;
  transition: background 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 58px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.logo img {
  position: relative;
  left: 20px;
  max-width: 50px;
}

.nav-links {
  list-style: none;
  display: flex;
  height: 100%; /* 设置链接容器高度为 100% */
}

.custom-link {
  line-height: 58px;
  text-decoration: none;
  color: #000;
  font-weight: bold;
  transition: color 0.3s;
  display: flex; /* 设置链接元素为弹性盒子 */
  padding: 0px 20px; /* 调整链接内边距 */
  height: 58px;
}

.custom-link:hover {
  text-decoration: none; /* 去掉下横线 */
  color: #00D68F;
  background-color: #f0f0f0; /* 设置背景色 */
}

.custom-link.active {
  background-color: #00D68F; /* 活动链接的背景颜色 */
  color: #fff; /* 活动链接的文字颜色 */
}
</style>
