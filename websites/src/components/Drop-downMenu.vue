<template>
  <div class="container">
    <div class="dropdown">
      <!-- 标题 -->
      <span class="dropdown-title"> {{MenuTitle}} </span>
      <!-- 下拉菜单内容 -->
      <div class="dropdown-content">
        <div class="dropdown-menu">
          <!-- <div class="menuItem">第一周</div>
          <div class="menuItem">第二周</div>
          <div class="menuItem">第三周</div>
          <div class="menuItem">第四周</div> -->
          <div v-for="item in MenuItems" :key="item" class="menuItem">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    MenuTitle: String,
    MenuItems: Array,
    },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
    position: absolute;
    top: -10px;
    left: 81%;
    z-index: 10;
  }

  .dropdown {
    margin: 0 20px;
    .dropdown-title {
      display: inline-block;
      position: relative;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      color: #fff;
      // background-color: black;
      background-color: #2980b9 ;
      padding: 0 24px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 1s ease-in-out;
    }

    .dropdown-content {
      // 定位显示局域
      position: absolute;
      visibility: hidden; // 隐藏
      opacity: 0; // 隐藏
      transition: all 0.6s ease-in-out;

      .dropdown-menu {
        margin-top: 4px;  // 与title制造距离
        padding: 10px 8px 15px; // 给下面多留一点距离，抵消视觉差
        color: white;
        background-color: rgba($color: #000, $alpha: 0.8);
        border-radius: 4px;
        .menuItem {
          width: 100%;  // 自适应宽度
          white-space: nowrap;
          padding: 10px 16px;
          font-size: 16px;
          color: white;
          cursor: pointer;
          border-radius: 4px;
          &:hover {
            background-color: #ccc;
          }
        }
      }
    }

    &:hover .dropdown-content {
      visibility: visible;
      opacity: 1;
    }
  }
</style>
