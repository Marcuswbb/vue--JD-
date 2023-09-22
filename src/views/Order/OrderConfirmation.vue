<template>
  <div class="container">
    <div class="head">
      <span @click="handleBackClick" class="iconfont icon-left">&#xe600;</span>
      <span class="title">确认订单</span>
    </div>
    <div class="address">
      <div class="left">
        <div class="title">收货地址</div>
        <div class="order-address">
          {{ address.city }} {{ address.community }} {{ address.building }}
        </div>
        <div class="user-info">
          <span class="username">{{ address.receiveName }}</span>
          <span class="user-phone">{{ address.phone }}</span>
        </div>
      </div>
      <div class="right">
        <span class="iconfont icon-right"></span>
      </div>
    </div>
    <div class="cart-list">
      <div class="cart-item" v-for="(item, index) of cartAllData" :key="index">
        <div class="title">{{ item.title }}</div>
        <div
          class="cart-info clearfix"
          v-for="shop of Object.values(item.itemList).slice(0, 2)"
          :key="shop.id"
        >
          <img :src="shop.img" alt="" class="fl product-img" />
          <div class="product-name fl">{{ shop.title }}</div>
          <div class="product-data fl clearfix">
            <div class="left fl">
              <span class="price">{{ shop.currentPrice }}</span>
              <span class="compute-type">×</span>
              <span class="count">{{ shop.count }}</span>
            </div>
            <div class="right fr">
              <span class="total">{{
                (shop.currentPrice * shop.count).toFixed(2)
              }}</span>
            </div>
          </div>
        </div>
        <div
          v-show="!isShowMore"
          v-for="shop of Object.values(item.itemList).slice(2)"
          :key="shop.id"
          class="cart-info clearfix"
        >
          <img :src="shop.img" alt="" class="fl product-img" />
          <div class="product-name fl">{{ shop.title }}</div>
          <div class="product-data fl clearfix">
            <div class="left fl">
              <span class="price">{{ shop.currentPrice }}</span>
              <span class="compute-type"> × </span>
              <span class="count">{{ shop.count }}</span>
            </div>
            <div class="right fr">
              <span class="total">{{
                (shop.currentPrice * shop.count).toFixed(2)
              }}</span>
            </div>
          </div>
        </div>
        <div class="more" @click="handleShowMoreClick">
          共计 {{ Object.values(item.itemList).length }} 件商品
          <span class="iconfont icon-arrow-down"
            >{{ brandFold ? "↑" : "↓" }}
          </span>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="left">
        <span class="left-title">实付金额</span>
        <span class="left-price">¥{{ totalPrice }}</span>
      </div>
      <div @click="submitOrder" class="right">提交订单</div>
    </div>
  </div>
  <div
    class="confirm-mask"
    @click.self="cancelOrder"
    v-show="isShowConfirmMask"
  >
    <div class="modal">
      <div class="modal-title">确认要离开收银台？</div>
      <div class="modal-content">请尽快完成支付，否则将被取消</div>
      <div class="modal-buttons">
        <div @click="cancelOrder" class="modal-button cancel">取消订单</div>
        <div class="modal-button confirm" @click="confirmPay">确认支付</div>
      </div>
    </div>
  </div>
  <div class="remind-mask" v-show="isShowNoticeMask">
    <div class="modal">
      <span class="iconfont icon-wrong-b"></span>
      <span class="iconfont icon-correct"></span>
      <p class="content">支付成功，等待配送</p>
    </div>
  </div>
</template>
<script>
// 导入生命周期相关的对象
import { onMounted } from "vue";
// 导入ajax相关的对象
import { get, post } from "../../unils/request";

// 导入路由相关的对象
import { useRoute, useRouter } from "vue-router";
// 导入ref相关的对象
import { ref } from "vue";
// 导入vuex相关的对象
import { computed } from "vue";
import store from "../../store";
// 导入组件
import CartItem from "../../components/CartItem.vue";
export default {
  name: "OrderConfirmation",
  components: {
    CartItem,
  },
  setup() {
    // 订单是否取消
    const isCanceled = ref(false);
    // 地址信息
    const address = ref({});
    // 获取路由参数
    const route = useRoute();
    const router = useRouter();

    // 是否显示确认框
    const isShowConfirmMask = ref(false);
    //
    const brandFold = ref(false);
    const isShowMore = ref(true);
    // 是否显示提示框
    const isShowNoticeMask = ref(false);
    // 从路由参数中获取id
    const shopId = route.params.shopId;
    const cartData = store.state.cartData;

    const shopName = cartData[shopId].shopName;
    const cartItems = Object.values(cartData[shopId].itemList);

    // 通过shopId, 从vuex中, 获取当前商铺的信息
    const cartAllData = Object.values(store.state.cartData);
    const a = computed(() => store.state.cartData);
    // 通过shop里的数据, 计算总价
    const totalPrice = computed(() => {
      let total = 0;
      for (let key in cartItems) {
        total += cartItems[key].currentPrice * cartItems[key].count;
      }
      return total.toFixed(2);
    });
    console.log(totalPrice.value);
    // 点击返回按钮, 返回上一页
    const handleBackClick = () => {
      router.back();
    };
    // 提交订单
    const submitOrder = () => {
      // 显示确认框
      isShowConfirmMask.value = true;
    };
    // 取消订单
    const cancelOrder = async () => {
      // 设置isCanceled为true, 标记订单已经取消
      isCanceled.value = true;
      // 隐藏确认框
      isShowConfirmMask.value = false;
      // 提交表单
      const orderData = {
        isCanceled: isCanceled.value,
        aaa: aaa.value,
        address: address.value,
        products: cartItems,
      };
      const result = await post(`/order`, orderData);
      if (result.data.errno === 0) {
        // 2秒后, 隐藏提示框
        isShowNoticeMask.value = false;
        // 获取当前商铺的id
        const shopId = route.params.shopId;
        // 清空购物车
        store.commit("clearCart", { shopId });
        // 跳转到订单列表页
        router.push("/order-list");
      }
    };
    // 确认支付
    const confirmPay = async () => {
      // 标记订单是否已经取消
      isCanceled.value = false;
      // 隐藏确认框
      isShowConfirmMask.value = false;
      // 显示提示框
      isShowNoticeMask.value = true;
      // 提交表单
      const orderData = {
        isCanceled: isCanceled.value,
        address: address.value,
        products: cartItems,
        shopName,
      };
      const result = await post(`/order`, orderData);
      if (result.data.errno === 0) {
        // 2秒后, 隐藏提示框
        setTimeout(() => {
          isShowNoticeMask.value = false;
          // 获取当前商铺的id
          const shopId = route.params.shopId;
          // 清空购物车
          store.commit("clearCart", { shopId });
          // 跳转到订单列表页
          router.push("/order-list");
        }, 2000);
      }
    };
    // 获取用户的默认地址
    const getAddress = async () => {
      // 通过ajax, 商铺相关的信息
      const res = await get(`/user/address`);
      address.value = res.data.data[0];
    };
    onMounted(() => {
      getAddress();
    });
    const handleShowMoreClick = () => {
      isShowMore.value = !isShowMore.value;
      brandFold.value = !brandFold.value;
    };
    return {
      cartAllData, // 当前商铺的信息, vuex中的数据, 包括购物车数据
      handleBackClick, // 点击返回按钮, 返回上一页
      totalPrice, // 总价
      isShowConfirmMask, // 是否显示确认框
      submitOrder, // 提交订单
      cancelOrder, // 取消订单
      isShowNoticeMask, // 是否显示提示框
      confirmPay, // 确认支付
      address, // 地址信息
      handleShowMoreClick,
      brandFold,
      isShowMore,
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #f8f8f8;
  .head {
    width: 100vw;
    height: 42.4vw;
    background-image: linear-gradient(
      0deg,
      rgba(0, 145, 255, 0) 4%,
      #0091ff 50%
    );
    padding-top: 10.9333vw;
    text-align: center;
    .title {
      font-family: PingFangSC-Regular;
      font-size: 4.2667vw;
      color: #ffffff;
    }
    .iconfont {
      font-size: 5.3333vw;
      color: #ffffff;
      position: fixed;
      top: 11.4667vw;
      left: 4.9333vw;
    }
  }
  .address {
    width: 90.4vw;
    height: 29.6vw;
    margin: -19.7333vw auto 4.2667vw;
    background: #ffffff;
    border-radius: 1.0667vw;
    padding: 4.2667vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      .title {
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 4.2667vw;
        color: #333333;
        margin-bottom: 3.7333vw;
      }
      .order-address {
        font-family: PingFangSC-Regular;
        font-size: 3.7333vw;
        color: #333333;
        margin-bottom: 1.6vw;
      }
      .user-info {
        font-family: PingFangSC-Regular;
        font-size: 3.2vw;
        color: #666666;
        .username {
          margin-right: 1vw;
        }
      }
    }
    .right {
      color: #666;
    }
  }
  .cart-list {
    top: 56.5333vw;
    padding-top: 0vw;
    .cart-item {
      width: 90.4vw;
      border-radius: 1.0667vw;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      margin: 0 auto 4.2667vw;
      padding: 4.2667vw;
      justify-content: space-between;
      .title {
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 4.2667vw;
        color: #333333;
        margin-bottom: 4.2667vw;
      }
      .cart-info {
        margin-bottom: 4.2667vw;
        &:last-child {
          margin-bottom: 0;
        }
        img {
          width: 12.2667vw;
          height: 12.2667vw;
          margin-right: 4.2667vw;
        }
        .product-name {
          line-height: 1.3;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          font-size: 3.7333vw;
          color: #333333;
          width: calc(100% - 16.5333vw);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 1.6vw;
        }
        .product-data {
          font-family: PingFangSC-Regular;
          font-size: 3.7333vw;
          color: #e93b3b;
          line-height: 5.3333vw;
          width: calc(100% - 16.5333vw);
          .left {
            .price {
              &::before {
                content: "¥";
                display: inline-block;
                transform: scale(0.8);
                transform-origin: right bottom;
              }
            }
          }
          .right {
            .total {
              color: #000;
              font-size: 20rem /* 20/16 */;
              &::before {
                content: "¥";
                display: inline-block;
                transform: scale(0.8);
                transform-origin: right bottom;
              }
            }
          }
        }
      }
      .more {
        width: 81.8667vw;
        height: 7.4667vw;
        background: #f5f5f5;
        font-family: PingFangSC-Light;
        font-size: 3.7333vw;
        color: #999999;
        text-align: center;
        line-height: 6.6667vw;
        .iconfont {
          margin-left: 2.1333vw;
          display: inline-block;
          transform: translateY(0.5333vw);
          font-size: 5.3333vw;
        }
      }
    }
  }
  @import "../../style/foot-common.scss";
}
.confirm-mask {
  // display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .modal {
    text-align: center;
    z-index: 99;
    width: 80.2667vw;
    height: 41.8667vw;
    background: #fff;
    border-radius: 1.0667vw;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 6.4vw;
    .modal-title {
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 4.8vw;
      color: #333333;
      margin-bottom: 2.1333vw;
    }
    .modal-content {
      font-family: PingFangSC-Regular;
      font-size: 3.7333vw;
      color: #666666;
      margin-bottom: 6.4vw;
    }
    .modal-buttons {
      display: flex;
      justify-content: space-evenly;
      .modal-button {
        border: 0.2667vw solid #4fb0f9;
        border-radius: 4.2667vw;
        font-family: PingFangSC-Regular;
        font-size: 3.7333vw;
        width: 21.3333vw;
        height: 8.5333vw;
        display: flex;
        justify-content: center;
        align-items: center;
        &.cancel {
          color: #0091ff;
        }
        &.confirm {
          color: #ffffff;
          background: #4fb0f9;
        }
      }
    }
  }
}
.remind-mask {
  // display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .modal {
    text-align: center;
    z-index: 99;
    width: 80.2667vw;
    height: 41.8667vw;
    background: #fff;
    border-radius: 1.0667vw;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 6.4vw;
    .icon-wrong-b {
      color: #666;
      position: absolute;
      right: 3.2vw;
      top: 3.2vw;
      font-size: 6.4vw;
    }
    .icon-correct {
      display: inline-block;
      font-size: 13.3333vw;
      margin-top: 4.2667vw;
      margin-bottom: 4.2667vw;
    }
    .content {
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 4.8vw;
      color: #333333;
    }
  }
}
</style>
