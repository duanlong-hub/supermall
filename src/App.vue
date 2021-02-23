<template>
  <div id="App">
    <keep-alive exclude="Details"><router-view/></keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>

  import MainTabBar from "./components/content/mainTarbar/MainTabbar";

  export default {
    name: 'App',
    components: {MainTabBar}
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
