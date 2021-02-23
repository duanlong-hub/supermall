<template>
  <div class="wrapper">
    <div class="content">
      <ul>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"

  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'), {
        probeType: 3,
        pullUpLoad: true
      })
      this.scroll.on('scroll', (position) => {
        console.log(position)
      })
      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多');
      })
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 100px;
    background-color: #ffffff;
    overflow: hidden;
  }
</style>
