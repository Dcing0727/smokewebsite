<template>
  <div class="nav">
    <ul>
      <li v-for="item in navList" :key="item.title" class="nav-item" @click="clickNav($event, item)">
        <div>
          <img class="nav-icon" :src="item.icon" width="20px" height="20px" alt="sy" />
          <router-link :to="item.url">{{ item.title }}</router-link>
        </div>
      </li>
    </ul>
    <div class="nav-img-box" style="margin-top: 108px;">
      <!-- <img src="@/assets/装饰图.png" alt="zs" /> -->
    </div>
  </div>
</template>

<script setup>
    import { reactive } from 'vue';

    const navList = reactive([
        {
            title: "烟量周统计",
            icon: require("@/assets/周统计.png"),
            url: "/week",
        },
        {
            title: "烟量月统计",
            icon: require("@/assets/月统计.png"),
            url: "/month",
        },
        {
            title: "烟量年统计",
            icon: require("@/assets/美术历年统计.png"),
            url: "/annual",
        },
        {
            title: "花销统计",
            icon: require("@/assets/花销.png"),
            url: "/spend",
        },
        {
            title: "记录今日",
            icon: require("@/assets/记录.png"),
            url: "#",
        },
    ]);
    function clickNav(e) {
	var domList = e.currentTarget.parentNode.children
	for(let d=0; d < domList.length; d++){
		domList[d].className = 'nav-item'
	}
	console.log('点击',e.currentTarget)
	e.currentTarget.className = 'nav-item isclick'
	
}

</script>

<style scoped>
	li {
		list-style-type: none;
	}

	a {
		text-decoration: none;
		color: #39475A;
	}

	.nav {
        position: fixed;
        top: 50px;
		width: 200px;
		height: 100%;
		background: #FFFFFF;
		box-shadow: 3px 0px 6px 0px rgba(82, 82, 82, 0.14);
	}

	.nav ul {
		margin-top: 32px;
		padding: 0;
	}

	.nav-item {
		width: 200px;
		height: 46px;
		font-family: PingFangSC-Medium;
		font-size: 16px;
		color: #39475A;
		letter-spacing: 0;
		line-height: 46px;
		font-weight: 500;
	}

	.nav-item div {
		margin-left: 17px;
		height: 46px;
		line-height: 46px;
	}

	.nav-item div img {
		width: 20px;
		height: 20px;
	}

	.nav-icon {
		vertical-align: middle;
		margin-right: 7px;
		padding-bottom: 6px;

	}

	.isclick {
		background: #e9feff;
		color: #0bbfbc;
	}

	.nav-img-box img {
		width: 200px;
		height: 416px;
	}
</style>

