<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="detailNav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swipper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
    <detail-bottom-bar/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwipper from "./childComps/DetailSwipper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";

  import {getDetails, getRecommend, Goods, Shop, GoodsParam} from "../../network/details";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";
  import {debounce} from "../../common/utils";

  export default {
    name: "Details",
    components: {
      DetailNavBar,
      DetailSwipper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll,
    },
    data() {
      return {
        iid: null,
        topImages: null,
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      //1.保存传入的id
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      this.getDetails(this.$route.params.iid)

      //3.请求推荐数据
      this.getRecommend()
      //4.给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 100)
    },
    updated() {
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    mixins: [itemListenerMixin,backTopMixin],
    methods: {
      getDetails(iid) {
        getDetails(iid).then(res => {
          const data = res.result
          //1.获取详情页图片
          this.topImages = data.itemInfo.topImages

          //2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          //3.创建店铺信息对象
          this.shop = new Shop(data.shopInfo)

          //4.获取店铺信息
          this.detailInfo = data.detailInfo

          //5.获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          //6.取出评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
        })
      },
      getRecommend() {
        getRecommend().then(res => {
          this.recommends = res.data.list
        })
      },
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      contentScroll(position) {
        //1.获取y值
        const positionY = -position.y
        let length = this.themeTopYs.length
        //2.监听，变色
        for (let i = 0; i < length; i++) {
          //优化,数组加一个最大值
          if (this.currentIndex !== i &&
            (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
          // if (this.currentIndex !== i &&
          //     ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
          //     || (i === length - 1 && positionY >= this.themeTopYs[i]))){
          //   this.currentIndex = i
          //   this.$refs.detailNav.currentIndex = this.currentIndex
          // }

          //3.监听backTop
          this.listenShowBackTop(position)
        }
      }
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
