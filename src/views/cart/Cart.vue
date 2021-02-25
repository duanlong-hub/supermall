<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!--商品列表-->
    <scroll class="content">
      <cart-list :cart-list="cartList"/>
    </scroll>
    <!--底部汇总-->
    <CartButtonBar/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartButtonBar from "./childComps/CartButtonBar";

  import Scroll from "../../components/common/scroll/Scroll";

  import {mapGetters} from "vuex"

  export default {
    name: "Cart",
    components: {
      CartButtonBar,
      NavBar,
      CartList,
      Scroll
    },
    computed: {
      //数组写法
      // ...mapGetters(['cartLength']),
      //对象写法
      ...mapGetters({
        length: 'cartLength',
        cartList: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .cart {
    position: relative;
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100% - 93px);
    z-index: 9;

  }
</style>
