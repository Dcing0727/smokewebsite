<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/assets/5.png" alt="Logo">
    </div>
    <ul class="nav-links">
      <li><router-link to="/home" class="custom-link">主页</router-link></li>
      <li><router-link to="/statistics" class="custom-link">烟量统计</router-link></li>
      <li><router-link to="/blog" class="custom-link">博客页面</router-link></li>
      <li><router-link to="/record" class="custom-link">戒烟打卡</router-link></li> 
      <li><router-link to="/user" class="custom-link">用户资料</router-link></li>
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
  position: fixed; /* 修改为 fixed */
  top: 0;
  left: 0;
  width: 100%;
  height: 58px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* 提高 z-index 值 */
}

.logo img {
  max-width: 50px;
  margin-left: 20px;
}

.nav-links {
  list-style: none;
  display: flex;
  height: 100%;
}

.custom-link {
  line-height: 58px;
  text-decoration: none;
  color: #000;
  font-weight: bold;
  transition: color 0.3s;
  display: flex;
  padding: 0px 20px;
  height: 58px;
}

.custom-link:hover {
  text-decoration: none;
  color: #00D68F;
  background-color: #f0f0f0;
}

.custom-link.active {
  background-color: #00D68F;
  color: #fff;
}
</style>
