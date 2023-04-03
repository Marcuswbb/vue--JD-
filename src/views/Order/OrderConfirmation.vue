<template>
  <div class="container">
    <div class="container__top">
      <div class="container__top__header">
        <div class="container__top__header__back" @click="handelBackClick">
          &#xe600;
        </div>
        <div class="container__top__header__text">确认订单</div>
      </div>
      <div class="container__top__receiver">
        <div class="container__top__receiver__left">
          <div class="container__top__receiver__left__title">收货地址</div>
          <div class="container__top__receiver__left__address">
            北京理工大学国防科技园2号楼10层
          </div>
          <div class="container__top__receiver__left__info">
            <div class="container__top__receiver__left__info__name">Marcus</div>
            <div class="container__top__receiver__left__info__phone">
              18911024266
            </div>
          </div>
        </div>
        <div class="container__top__receiver__right">
          <div class="container__top__receiver__right__icon">&#xe65f;</div>
        </div>
      </div>
    </div>
    <div class="container__order">
      <div class="container__order__shop-name">{{ shopName }}</div>
      <div class="container__order__info">
        <!-- 前面2条商品数据 -->
        <div
          class="container__order__info__item"
          v-for="item of Object.keys(cartItems).slice(0, 2)"
          :key="item.id"
        >
          <div class="container__order__info__item__left">
            <img
              :src="cartItems[item].imgUrl"
              alt=""
              class="container__order__info__item__left__image"
            />
          </div>
          <div class="container__order__info__item__right">
            <div class="container__order__info__item__right__name">
              {{ cartItems[item].name }}
            </div>
            <div class="container__order__info__item__right__price">
              <div class="container__order__info__item__right__price__left">
                ¥{{ cartItems[item].promotionPrice }} x
                {{ cartItems[item].count }}
              </div>
              <div class="container__order__info__item__right__price__right">
                ¥{{
                  (
                    cartItems[item].promotionPrice * cartItems[item].count
                  ).toFixed(2)
                }}
              </div>
            </div>
          </div>
        </div>
        <!-- 后面的商品数据，折叠了起来 -->
        <template v-if="!showMore">
          <div
            v-for="item of Object.keys(cartItems).slice(2)"
            :key="item"
            class="container__order__info__item"
          >
            <div class="container__order__info__item__left">
              <img
                :src="cartItems[item].imgUrl"
                alt=""
                class="container__order__info__item__left__image"
              />
            </div>
            <div class="container__order__info__item__right">
              <div class="container__order__info__item__right__name">
                {{ cartItems[item].name }}
              </div>
              <div class="container__order__info__item__right__price">
                <div class="container__order__info__item__right__price__left">
                  ¥{{ cartItems[item].promotionPrice }} x
                  {{ cartItems[item].count }}
                </div>
                <div class="container__order__info__item__right__price__right">
                  ¥{{
                    (
                      cartItems[item].promotionPrice * cartItems[item].count
                    ).toFixed(2)
                  }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <!-- 订单页面查看更多 -->
        <div
          class="container__order__info__more"
          @click="showMoreClick"
          v-if="showMore && Object.keys(cartItems).length > 2"
        >
          共计商品{{ Object.keys(cartItems).length }} 种/{{ sumNumber }}
          件&nbsp;&nbsp; &#xe605;
        </div>
      </div>
    </div>
    <div class="container__bottom">
      <div class="container__bottom__left">
        实付金额
        <span class="container__bottom__left__total-price"
          >¥ {{ sumPrice }}</span
        >
      </div>
      <div class="container__bottom__right" @click="submitOrderClick">
        提交订单
      </div>
    </div>
    <!-- 订单页弹框 -->
    <div class="container__mask" v-if="maskShow">
      <div class="container__mask__black-panel" @click="blackPanelClick"></div>
      <div class="container__mask__white-panel" v-if="whitePanelShow">
        <div class="container__mask__white-panel__title">
          确认要离开收银台？
        </div>
        <div class="container__mask__white-panel__content">
          请尽快完成支付，否则将被取消
        </div>
        <div class="container__mask__white-panel__buttons">
          <div
            class="container__mask__white-panel__buttons__cancel"
            @click="cancelOrderClick"
          >
            取消订单
          </div>
          <div
            class="container__mask__white-panel__buttons__confirm"
            @click="confirmPayClick"
          >
            确认支付
          </div>
        </div>
      </div>
    </div>
    <!-- 支付成功页面 -->
    <div class="container__mask__notice-panel" v-if="noticePanelShow">
      <div
        class="container__mask__notice-panel__cancel-iconfont"
        @click="cancelIconClick"
      >
        &#xe693;
      </div>
      <div class="container__mask__notice-panel__right-iconfont">&#xe651;</div>
      <div class="container__mask__notice-panel__notice">
        支付成功，等待配送
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const userHandelBackClick = () => {
  const router = useRouter();
  const handelBackClick = () => {
    router.back();
  };
  return handelBackClick;
};
const userOrderEffect = () => {
  const store = useStore();
  const route = useRoute();

  let shopId = route.params.shopId;

  const cartData = store.state.cartData;

  const shopName = cartData[shopId].shopName;

  const cartItems = cartData[shopId].itemList;
  //计算总价格
  let sumPrice = 0.0;
  for (let key in cartItems) {
    if (cartItems[key].checked) {
      sumPrice += cartItems[key].promotionPrice * cartItems[key].count;
    }
  }
  sumPrice = sumPrice.toFixed(2);
  //计算总量
  let sumNumber = 0;
  for (let key in cartItems) {
    sumNumber += cartItems[key].count;
  }
  return { shopName, cartItems, sumPrice, sumNumber };
};
// 查看更多按钮的显示和隐藏
const useShowMoreEffect = () => {
  let showMore = ref(true);
  const showMoreClick = () => {
    showMore.value = false;
  };

  return { showMoreClick, showMore };
};
//弹框的显示和隐藏
const usemaskShowEffect = () => {
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const shopId = route.params.shopId;
  let maskShow = ref(false);
  // 白色面板
  const whitePanelShow = ref(false);
  // 通知面板
  const noticePanelShow = ref(false);
  //提交订单
  const submitOrderClick = () => {
    // 点击提交订单, 展示蒙层
    maskShow.value = true;
    // 白面板关闭
    whitePanelShow.value = true;
    // 通知面板关闭
    noticePanelShow.value = false;
  };
  //点击黑色遮罩层
  const blackPanelClick = () => {
    // 整个蒙层隐藏
    maskShow.value = false;
    // 白面板关闭
    whitePanelShow.value = false;
    // 通知面板关闭
    noticePanelShow.value = false;
    // 如果通知面板展示的话, 应该跳转到订单页
  };
  //取消订单
  const cancelOrderClick = () => {
    // 点击返回, 隐藏蒙层
    maskShow.value = false;
    // 白面板关闭
    whitePanelShow.value = false;
    // 通知面板关闭
    noticePanelShow.value = false;
  };
  // 消息模板的叉号点击逻辑
  const cancelIconClick = () => {
    // 所有面板隐藏
    // 点击提交订单, 展示蒙层
    maskShow.value = false;
    // 白面板关闭
    whitePanelShow.value = false;
    // 通知面板关闭
    noticePanelShow.value = false;
    // 跳转到订单页
    router.push({ name: "OrderList" });
  };
  // 点击确认支付
  const confirmPayClick = () => {
    // 点击确认支付
    maskShow.value = true;
    // 白面板关闭
    whitePanelShow.value = false;
    // 通知面板关闭
    noticePanelShow.value = true;
    store.commit("clearCart", { shopId });
    // 跳转到订单页
    setTimeout(() => {
      router.push({ name: "OrderList" });
    }, 1000);
  };
  return {
    maskShow,
    blackPanelClick,
    submitOrderClick,
    cancelOrderClick,
    whitePanelShow,
    noticePanelShow,
    cancelIconClick,
    confirmPayClick,
  };
};
export default {
  name: "OrderConfirmation",
  setup() {
    const handelBackClick = userHandelBackClick();
    const { shopName, cartItems, sumPrice, sumNumber } = userOrderEffect();
    const { showMoreClick, showMore } = useShowMoreEffect();
    const {
      maskShow,
      blackPanelClick,
      submitOrderClick,
      cancelOrderClick,
      whitePanelShow,
      noticePanelShow,
      cancelIconClick,
      confirmPayClick,
    } = usemaskShowEffect();
    return {
      shopName,
      cartItems,
      handelBackClick,
      sumPrice,
      showMoreClick,
      showMore,
      sumNumber,
      maskShow,
      blackPanelClick,
      submitOrderClick,
      cancelOrderClick,
      whitePanelShow,
      noticePanelShow,
      cancelIconClick,
      confirmPayClick,
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 49px;
  background-color: #f8f8f8;
  &__top {
    &__header {
      height: 139px;
      background-image: linear-gradient(
        0deg,
        rgba(0, 145, 255, 0) 4%,
        #0091ff 50%
      );
      background-repeat: no-repeat;
      &__back {
        font-size: 24px;
        color: #fff;
        position: absolute;
        left: 18.5px;
        top: 18px;
      }
      &__text {
        text-align: center;
        padding-top: 21px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
      }
    }
    &__receiver {
      width: 339px;
      height: 111px;
      background-color: #fff;
      border-radius: 4px;
      margin: 0 auto;
      position: relative;
      top: -74px;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      &__left {
        &__title {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          margin-bottom: 16px;
        }
        &__address {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          margin-bottom: 8px;
        }
        &__info {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #666666;
          display: flex;
          &__name {
            margin-right: 6px;
          }
        }
      }
      &__right {
        display: flex;
        align-items: center;
        font-size: 17px;
        color: #666;
      }
    }
  }
  &__order {
    border-radius: 4px;
    max-height: 400rem;
    overflow-y: auto;
    width: 339px;
    background-color: #fff;
    margin: 0 auto;
    position: relative;
    top: -58px;
    padding: 16px;
    padding-bottom: 6px;
    box-sizing: border-box;
    &__shop-name {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      margin-bottom: 16px;
    }
    &__info {
      &__item {
        display: flex;
        margin-bottom: 6px;
        &__left {
          &__image {
            width: 46px;
            height: 46px;
            margin-right: 16px;
          }
        }
        &__right {
          flex-grow: 1;
          &__name {
            margin-top: 2px;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #333333;
            margin-bottom: 8px;
          }
          &__price {
            display: flex;
            justify-content: space-between;
            &__left {
              font-family: PingFangSC-Regular;
              font-size: 28px;
              color: #e93b3b;
              transform: scale(50%, 50%);
              transform-origin: left top;
              &::first-letter {
                font-size: 20px;
              }
            }
            &__right {
              font-family: PingFangSC-Regular;
              font-size: 28px;
              color: #000000;
              text-align: right;
              transform: scale(50%, 50%);
              transform-origin: right top;
              &::first-letter {
                font-size: 20px;
              }
            }
          }
        }
      }
      &__more {
        width: 307px;
        height: 28px;
        background: #f5f5f5;
        margin: 0 auto;
        font-size: 14px;
        color: #999999;
        line-height: 28px;
        text-align: center;
        margin-bottom: 12px;
      }
    }
  }
  &__bottom {
    display: flex;
    width: 375px;
    height: 49px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    &__left {
      padding-left: 24px;
      box-sizing: border-box;
      width: 277px;
      background-color: #fff;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      line-height: 49px;
      &__total-price {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        text-align: right;
        line-height: 49px;
      }
    }
    &__right {
      width: 98px;
      background: #4fb0f9;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      line-height: 49px;
    }
  }
  &__mask {
    &__black-panel {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
    }
    &__white-panel {
      box-sizing: border-box;
      padding-top: 24rem;
      width: 301px;
      height: 157px;
      background-color: white;
      border-radius: 4px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &__title {
        text-align: center;
        font-size: 18px;
        color: #333333;
      }
      &__content {
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        margin: 8rem 0 24rem;
      }
      &__buttons {
        display: flex;
        justify-content: center;
        text-align: center;
        &__cancel {
          border: 1px solid #4fb0f9;
          border-radius: 16px;
          width: 80px;
          height: 32px;
          font-size: 14px;
          color: #0091ff;
          line-height: 32rem;
          margin-right: 24rem;
        }
        &__confirm {
          width: 80px;
          height: 32px;
          background: #4fb0f9;
          border: 1px solid #4fb0f9;
          border-radius: 16px;
          font-size: 14px;
          color: #ffffff;
          line-height: 32rem;
        }
      }
    }
    &__notice-panel {
      width: 301px;
      height: 156px;
      background: #ffffff;
      border-radius: 4px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &__cancel-iconfont {
        font-size: 18px;
        color: #666666;
        position: absolute;
        top: 12px;
        right: 12px;
      }
      &__right-iconfont {
        font-size: 56px;
        color: #000;
        text-align: center;
        margin-top: 42px;
        font-weight: bold;
      }
      &__notice {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #333333;
        text-align: center;
        margin-top: 6px;
      }
    }
  }
}
</style>    