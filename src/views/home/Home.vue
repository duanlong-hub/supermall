<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <HomeSwiper :banners="banners"/>
    <HomeRecommendView :recommends="recommends"/>
    <FeatureView/>
    <TabControl class="tab-control"
                :titles="['流行','新款','精选']" @tabClick="tabClick"/>
    <GoodsList :goods="showGoods"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";

  import {getHomeMultidata, getHomeGoods} from "../../network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        tabType: ['new', 'pop', 'sell'],
        currentTabIndex: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.tabType[this.currentTabIndex]].list
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 事件监听相关
       */
      tabClick(index) {
        this.currentTabIndex = index
      },
      /**
       * 网络请求相关
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 43px;
    background-color: #ffffff;
    z-index: 9;
  }
</style>
