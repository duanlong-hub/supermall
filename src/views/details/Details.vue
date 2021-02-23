<template>
  <div class="detail">
    <DetailsNavBar class="detail-nav-bar"/>
    <scroll class="content" ref="scroll">
      <DetailSwipper :top-images="topImages"/>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <DetailParamInfo :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailsNavBar from "./childComps/DetailsNavBar";
  import DetailSwipper from "./childComps/DetailSwipper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";

  import Scroll from "../../components/common/scroll/Scroll";

  import {getDetails, Goods, Shop, GoodsParam} from "../../network/details";

  export default {
    name: "Details",
    components: {
      DetailParamInfo,
      DetailsNavBar,
      DetailSwipper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: null,
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo:{}
      }
    },
    created() {
      //1.保存传入的id
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      this.getDetails(this.$route.params.iid)
    },
    methods: {
      getDetails(iid) {
        getDetails(iid).then(res => {
          //1.获取详情页图片
          const data = res.result
          this.topImages = data.itemInfo.topImages

          //2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          //3.创建店铺信息对象
          this.shop = new Shop(data.shopInfo)

          //4.获取店铺信息
          this.detailInfo = data.detailInfo

          //5.获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        })
      },
      imageLoad() {
        this.$refs.scroll.refresh()
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
    height: calc(100% - 44px);
  }
</style>
