import { createStore } from 'vuex'

// 把数据存到localStorage里，store从这里拿数据
const setLocalCartData = (state) => {
  const { cartData } = state
  // 转化为JSON字符串格式
  const cartDataString = JSON.stringify(cartData)
  // 保存到localStorage
  localStorage.cartData = cartDataString
}
// 从缓存中获取购物车数据
const getLocalCartData = () => {
  let result = {}
  if (localStorage.cartData) {
    result = JSON.parse(localStorage.cartData)
  }
  return result
}
export default createStore({
  state: {
    // 从缓存中获取数据
    cartData: getLocalCartData()
  },
  getters: {},
  mutations: {
    //购物车与商品列表数据同步
    changeItemToCart(state, payload) {
      //从Content传来state, payload，判断state有没有shopId，
      const { shopId, shopName, itemId, itemInfo, num } = payload
      //判断shopId是否为空
      let shopInfo = {}
      if (state.cartData[shopId]) {
        shopInfo = state.cartData[shopId]
      } else {
        shopInfo.shopName = shopName
        shopInfo.itemList = {}
      }
      //判断itemId是否为空
      let item = null
      if (shopInfo.itemList[itemId]) {
        item = shopInfo.itemList[itemId]
      } else {
        item = itemInfo
        item.count = 0
        // console.log(item);
      }
      //点击加号，把count加一
      item.count += num
      //如果为空，就把商品从购物车里移除
      if (item.count === 0) {
        delete shopInfo.itemList[itemId]
      } else {
        //把商品的勾选状态改为true
        item.checked = true
        //把item加到shopInfo中
        shopInfo.itemList[itemId] = item
      }

      //判断商铺下购物车是否为空
      if (JSON.stringify(shopInfo.itemList) !== '{}') {
        //把shopInfo加到cartData里
        state.cartData[shopId] = shopInfo
      } else {
        //清除商铺信息
        delete state.cartData[shopId]
      }
      //更新state里的数据
      setLocalCartData(state)
    },
    //购物车勾选状态
    changeItemChecked(state, payload) {
      const { shopId, itemId } = payload
      const item = state.cartData[shopId].itemList[itemId]
      item.checked = !item.checked
      //更新state里的数据
      setLocalCartData(state)
    },
    //清空购物车
    clearCart(state, payload) {
      const { shopId } = payload
      state.cartData[shopId].itemList = {}
      //更新state里的数据
      setLocalCartData(state)
    },
    //点击购物车全选框，改变全选状态
    setAllChecked(state, payload) {
      const { shopId } = payload
      let result = state.cartData[shopId]
      for (let key in result.itemList) {
        result.itemList[key].checked = true
      }
      //更新state里的数据
      setLocalCartData(state)
    }
  },
  actions: {},
  modules: {}
})
