<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/assets/5.png" alt="Logo">
    </div>
    <ul class="nav-links">
      <li><a href="/">首页</a></li>
      <li><a href="/about">关于我们</a></li>
      <li><a href="/services">烟量统计</a></li>
      <li><a href="/contact">戒烟打卡</a></li>
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
  padding: 10px 20px;
  color: #000;
  transition: background 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8%;
}

.logo img {
  max-width: 50px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li a {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-links li a:hover {
  text-decoration: underline;
  color: #00D68F;
}
</style>