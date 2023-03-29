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
    //购物车与商品列表数据同步
    changeItemToCart(state, payload) {
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
      //如果为空，就把商品从购物车里移除
      if (item.count === 0) {
        delete shopInfo[itemId]
      } else {
        //把商品的勾选状态改为true
        item.checked = true
        //把item加到shopInfo中
        shopInfo[itemId] = item
      }

      //判断商铺下购物车是否为空
      if (JSON.stringify(shopInfo) !== '{}') {
        //把shopInfo加到cartData里
        state.cartData[shopId] = shopInfo
      } else {
        //清除商铺信息
        delete state.cartData[shopId]
      }
    },
    //购物车勾选状态
    changeItemChecked(state, payload) {
      const { shopId, itemId } = payload
      const item = state.cartData[shopId][itemId]
      item.checked = !item.checked
    },
    //清空购物车
    clearCart(state, payload) {
      const { shopId } = payload
      state.cartData[shopId] = {}
    },
    //点击购物车全选框，改变全选状态
    setAllChecked(state, payload) {
      const { shopId } = payload
      let result = state.cartData[shopId]
      for (let key in result) {
        result[key].checked = true
      }
    }
  },
  actions: {},
  modules: {}
})
