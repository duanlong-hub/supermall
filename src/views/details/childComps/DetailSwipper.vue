<template>
    <Swiper class="detail-swipper">
      <SwiperItem v-for="item in topImages" >
        <img :src="item" alt="">
      </SwiperItem>
    </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "@/components/common/swiper"

  export default {
    name: "DetailSwipper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
 .detail-swipper{
   height: 300px;
   overflow: hidden;
 }
</style>
