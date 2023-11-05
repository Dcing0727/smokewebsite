
<template>
    <NavBar></NavBar>
    <LoginComponent></LoginComponent>
</template>

<script>
import NavBar from './components/nav-bar.vue'
import LoginComponent from './components/LoginComponent.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    LoginComponent
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
