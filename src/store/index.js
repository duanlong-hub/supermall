import Vue from 'vue'
import Vuex from 'vuex'

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters"

//1.安装插件
Vue.use(Vuex)

//2.创建store对象
const state = {
  cartList: [
    {
      "image": "//s5.mogucdn.com/mlcdn/c45406/180923_7c3f16j2fka1g193l5fg2k24g6ab4_640x960.jpg",
      "title": "2018春秋新款韩版胖mm加肥加大码200斤刺绣字母打底衫宽松显瘦长袖t恤上衣",
      "desc": "胖mm加肥加大码打底衫斤宽松长袖t恤上衣",
      "price": "46.86",
      "iid": "1m8xdiw",
      "count": 1,
      "check": false
    },
    {
      "image": "//s5.mogucdn.com/mlcdn/c45406/180923_7c3f16j2fka1g193l5fg2k24g6ab4_640x960.jpg",
      "title": "2018春秋新款韩版胖mm加肥加大码200斤刺绣字母打底衫宽松显瘦长袖t恤上衣",
      "desc": "胖mm加肥加大码打底衫斤宽松长袖t恤上衣",
      "price": "46.86",
      "iid": "1m8xdiw",
      "count": 1,
      "check": false
    }
  ]
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})


//3.挂载到vue实例上
export default store
