import { createStore } from 'vuex'

export default createStore({
  state: {
    cartData: {
      // 1: {
      //   1: {
      //     count: 0,
      //   },
      //   2: {
      //     count: 1,
      //   },
      //   3: {
      //     count: 2,
      //   },
      //   4: {
      //     count: 3,
      //   },
      // },
    }
  },
  getters: {},
  mutations: {
    addItemToCart(state, payload) {
      //从Content传来state, payload，判断state有没有shopId，
      const { shopId, itemId, itemInfo, num } = payload
      //判断shopId是否为空
      const shopInfo = state.cartData[shopId] || {}
      //判断itemId是否为空
      let item = null
      if (shopInfo[itemId]) {
        item = shopInfo[itemId]
      } else {
        item = itemInfo
        item.count = 0
        // console.log(item);
      }
      //点击加号，把count加一
      item.count += num
      //把item加到shopInfo中
      shopInfo[itemId] = item
      //把shopInfo加到cartData里
      state.cartData[shopId] = shopInfo
    }
  },
  actions: {},
  modules: {}
})
