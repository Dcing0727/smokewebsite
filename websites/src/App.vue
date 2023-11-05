
<template>
    <NavBar></NavBar>
    <router-view></router-view>
</template>

<script>
import NavBar from './components/nav-bar.vue'
export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style>
* 
{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body
{
    background-image: url("@/assets/7.png");
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
} 

</style>
