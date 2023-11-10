
<template>
    <NavBar></NavBar>
    <router-view></router-view>
</template>

<script>
import NavBar from './components/nav-bar.vue'
// import Footer from './components/page-footer.vue'
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
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
} 

</style>
