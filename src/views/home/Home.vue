<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <HomeSwiper :banners="banners"/>
    <HomeRecommendView :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";

  import {getHomeMultidata} from "../../network/home";

  export default {
    name: "Home",
    components: {
      HomeRecommendView,
      NavBar,
      HomeSwiper
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list

      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
</style>
