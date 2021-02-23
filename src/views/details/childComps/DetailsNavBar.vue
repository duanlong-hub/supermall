<template>
  <div>
    <NavBAR>
      <div slot="left" class="back" @click="backClick">
        <img src="~@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             :class="{active: index === currentIndex}"
             @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </NavBAR>
  </div>
</template>

<script>
  import NavBAR from "../../../components/common/navbar/NavBar";

  export default {
    name: "DetailsNavBar",
    components: {NavBAR},
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 14px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img{
    margin-top: 10px;
  }
</style>
