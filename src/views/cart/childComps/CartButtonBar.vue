<template>
  <div class="bottom-menu">
    <check-button class="select-all" :is-checked="isSelectAll" @click.native="checkClick"/>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="toPal">去支付({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";

  export default {
    name: "CartButtonBar",
    components: {CheckButton},
    computed: {
      totalPrice() {
        // if (this.cartLength === 0) return 0
        return this.$store.getters.cartList
          .filter(item => item.check)
          .reduce((preValue, item) => preValue + item.price * item.count, 0)
          .toFixed(2)
      },
      checkLength() {
        // if (this.cartLength === 0) return 0
        return this.$store.getters.cartList.filter(item => item.check).length
      },
      isSelectAll() {
        if (this.$store.getters.cartLength === 0) return false
        return !this.$store.getters.cartList.find(item => !item.check)
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){
          this.$store.getters.cartList.forEach(item => item.check = false)
        } else {
          this.$store.getters.cartList.forEach(item => item.check = true)
        }
      },
      toPal(){
        this.$toast.show('进入支付')
      }
    }
  }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eeeeee;
    position: relative;
    bottom: 44px;
    left: 0;
    font-size: 14px;
    color: #888;
    line-height: 50px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
