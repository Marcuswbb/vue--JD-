<template>
  <!-- 购物车蒙层 -->
  <div class="mask" v-if="cartShow && JSON.stringify(cartItems) !== '{}'"></div>
  <div class="cart">
    <!-- 头部, 全选 -->
    <!-- JSON.stringify(cartItems) !== '{}' 判断购物车里商品是否为空，购物车没有商品就不显示购物车商品列表 -->
    <div
      class="cart__header"
      v-if="cartShow && JSON.stringify(cartItems) !== '{}'"
    >
      <div class="cart__header__left">
        <div
          v-if="allChecked"
          class="cart__header__left__checked-iconfont"
          @click="
            () => {
              setAllChecked(shopId);
            }
          "
        >
          &#xe604;
        </div>
        <div
          v-else
          class="cart__header__left__unchecked-iconfont"
          @click="
            () => {
              setAllChecked(shopId);
            }
          "
        >
          &#xe601;
        </div>
        <div class="cart__header__left__text">全选</div>
      </div>
      <div class="cart__header__right">
        <div
          class="cart__header__right__clear-cart"
          @click="
            () => {
              clearCart(shopId);
            }
          "
        >
          清空购物车
        </div>
      </div>
    </div>
    <!-- 购物车商品内容列表 -->
    <div
      class="cart__detail"
      v-if="cartShow && JSON.stringify(cartItems) !== '{}'"
    >
      <div class="cart__detail__item" v-for="item of cartItems" :key="item.id">
        <div class="cart__detail__item__left">
          <!-- 选中/不选中 字体图标 -->
          <div
            v-if="item.checked"
            class="cart__detail__item__left__checked-iconfont"
            @click="
              () => {
                changeItemChecked(shopId, item.id);
              }
            "
          >
            &#xe604;
          </div>
          <div
            v-else
            class="cart__detail__item__left__unchecked-iconfont"
            @click="
              () => {
                changeItemChecked(shopId, item.id);
              }
            "
          >
            &#xe601;
          </div>
          <img
            :src="item.imgUrl"
            alt=""
            class="cart__detail__item__left__image"
          />
        </div>
        <div class="cart__detail__item__right">
          <div class="cart__detail__item__right__top">{{ item.name }}</div>
          <div class="cart__detail__item__right__bottom">
            <div class="cart__detail__item__right__bottom__price">
              <div class="cart__detail__item__right__bottom__price__promotion">
                ¥{{ item.promotionPrice }}
              </div>
              <div class="cart__detail__item__right__bottom__price__original">
                ¥{{ item.originalPrice }}
              </div>
            </div>

            <div class="cart__detail__item__right__bottom__count">
              <!-- 减号图标 -->
              <span
                v-show="cartData?.[shopId]?.itemList?.[item.id]?.['count']"
                class="cart__detail__item__right__bottom__count__minus-iconfont"
                @click="
                  () => {
                    changeItemToCart(shopId, shopName, item.id, item, -1);
                  }
                "
              >
                &#xe8a7;
              </span>
              <!-- 商品数量 -->
              <span
                v-show="cartData?.[shopId]?.itemList?.[item.id]?.['count']"
                class="cart__detail__item__right__bottom__count__number"
              >
                {{ cartData?.[shopId]?.itemList?.[item.id]?.["count"] }}
              </span>
              <!-- 加号图标 -->
              <span
                class="cart__detail__item__right__bottom__count__plus-iconfont"
                @click="
                  () => {
                    changeItemToCart(shopId, shopName, item.id, item, 1);
                  }
                "
              >
                &#xe8a6;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车结算 -->
    <div
      class="cart__count"
      @click="
        () => {
          handleCartShowChange(cartItems);
        }
      "
    >
      <div class="cart__count__left">
        <div class="cart__count__left__icon">
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261637089.png"
            alt=""
            class="cart__count__left__icon__image"
          />
          <span class="cart__count__left__icon__number">
            {{ total.count }}
          </span>
        </div>
        <div class="cart__count__left__count">
          总计:
          <span class="cart__count__left__count__price">¥{{ sumPrice }} </span>
        </div>
      </div>
      <router-link :to="total ? { path: `/order-confirmation/${shopId}` } : ' '">
        <div class="cart__count__right">去结算</div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effects/commonCartEffect.js";

const useCartEffect = () => {
  const store = useStore();
  const route = useRoute();
  //获取传过来的商铺id
  const shopId = route.params.id;
  //获取vuex里商品详情页里的数据
  const cartData = store.state.cartData;
  //使用计算函数，计算商品数量
  const total = computed(() => {
    //获取商品列表的id
    const itemList = cartData[shopId]?.itemList || {};

    let count = 0;
    //如果没有数量记录，直接返回
    if (itemList) {
      for (let key in itemList) {
        count += itemList[key].count;
      }
    }
    return { count };
  });
  //计算总商品价格
  const sumPrice = computed(() => {
    const itemList = cartData[shopId]?.itemList || {};
    let sum = 0.0;
    if (itemList) {
      for (let key in itemList) {
        if (itemList[key].checked) {
          sum += itemList[key].count * itemList[key].promotionPrice;
        }
      }
    }
    return sum.toFixed(2);
  });
  //购物车列表
  const cartItems = computed(() => {
    let cartShow = ref(false);
    const cartItems = cartData[shopId]?.itemList || {};
    if (JSON.stringify(cartItems) === "{}") {
      cartShow.value = false;
    }
    return cartItems;
  });
  //购物车勾选状态
  const changeItemChecked = (shopId, itemId) => {
    store.commit("changeItemChecked", { shopId, itemId });
  };
  //清除购物车内容
  const clearCart = (shopId) => {
    store.commit("clearCart", { shopId });
  };
  //购物车选项框全选
  const allChecked = computed(() => {
    const itemList = cartData[shopId]?.itemList || {};
    let result = true;
    if (itemList) {
      for (let key in itemList) {
        if (!itemList[key].checked) {
          result = false;
        }
      }
    }
    return result;
  });
  //点击购物车全选框，改变全选状态
  const setAllChecked = (shopId) => {
    store.commit("setAllChecked", { shopId });
  };

  return {
    total,
    sumPrice,
    cartItems,
    shopId,
    changeItemChecked,
    clearCart,
    allChecked,
    setAllChecked,
  };
};
//隐藏购物车
const useCartShowEffect = () => {
  //相当于一个开关
  let cartShow = ref(false);
  const handleCartShowChange = (cartItems) => {
    if (JSON.stringify(cartItems) !== "{}") {
      cartShow.value = !cartShow.value;
    }
  };
  return { handleCartShowChange, cartShow };
};
export default {
  name: "Cart",
  props: ["shopName"],
  setup() {
    const { changeItemToCart, cartData } = useCommonCartEffect();
    const {
      total,
      sumPrice,
      cartItems,
      shopId,
      changeItemChecked,
      clearCart,
      allChecked,
      setAllChecked,
    } = useCartEffect();
    const { handleCartShowChange, cartShow } = useCartShowEffect();
    return {
      total,
      sumPrice,
      cartItems,
      changeItemToCart,
      shopId,
      cartData,
      changeItemChecked,
      clearCart,
      allChecked,
      setAllChecked,
      handleCartShowChange,
      cartShow,
    };
  },
};
</script>
<style lang="scss" scoped>
// src\views\shop\Cart.vue
.mask {
  position: fixed;
  background-color: rgba($color: #000000, $alpha: 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 49rem;
}
.cart {
  position: fixed;
  background-color: #fff;
  width: 375rem;
  left: 0;
  bottom: 0;
  &__header {
    box-sizing: border-box;
    padding: 0 18rem;
    width: 100%;
    height: 52rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rem solid #f1f1f1;
    &__left {
      display: flex;
      justify-content: center;
      &__checked-iconfont,
      &__unchecked-iconfont {
        font-size: 20rem;
        color: #0091ff;
        margin-right: 8.4rem;
      }
      &__text {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        color: #333333;
        line-height: 20rem;
      }
    }
    &__right {
      &__clear-cart {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        color: #333333;
        text-align: right;
        line-height: 16rem;
      }
    }
  }
  &__detail {
    background-color: #fff;
    width: 375rem;
    left: 0;
    bottom: 49rem;
    &__item {
      margin: 0 18rem 12rem 16rem;
      display: flex;
      &__left {
        margin-right: 16rem;
        display: flex;
        justify-items: center;
        align-items: center;
        &__checked-iconfont,
        &__unchecked-iconfont {
          font-size: 20rem;
          color: #0091ff;
          margin-right: 20rem;
        }
        &__image {
          width: 46rem;
          height: 46rem;
          margin-bottom: 12rem;
        }
      }
      &__right {
        flex-grow: 1;
        margin-top: 16rem;
        &__top {
          font-size: 14rem;
          color: #333333;
          margin-bottom: 8rem;
        }
        &__middle {
          font-size: 12rem;
          color: #333333;
          margin-bottom: 6rem;
        }
        &__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          &__price {
            display: flex;
            align-items: center;
            &__promotion {
              font-size: 14rem;
              color: #e93b3b;

              margin-right: 8rem;
            }
            &__original {
              font-family: PingFangSC-Regular;
              font-size: 10rem;
              color: #999999;
              text-decoration: line-through;
            }
          }
          &__count {
            display: flex;
            align-items: center;
            &__minus-iconfont {
              color: #666666;
              font-size: 20rem;
            }
            &__number {
              font-family: PingFangSC-Regular;
              font-size: 14rem;
              color: #333333;
              margin-left: 10rem;
              margin-right: 10rem;
            }
            &__plus-iconfont {
              font-size: 20rem;
              color: #0091ff;
            }
          }
        }
      }
    }
  }
  &__count {
    box-shadow: 0 -1rem 1rem 0 #f1f1f1;
    left: 0;
    right: 0;
    bottom: 0;
    height: 49rem;
    // background-color: olivedrab;
    display: flex;
    justify-content: space-between;
    &__left {
      display: flex;
      align-items: center;
      &__icon {
        position: relative;
        margin-left: 24rem;
        margin-right: 32rem;
        &__image {
          width: 28rem;
          height: 26rem;
        }
        &__number {
          display: block;
          min-width: 20rem;
          height: 20rem;
          background: #e93b3b;
          border-radius: 10rem;
          font-family: PingFangSC-Medium;
          font-size: 16rem;
          transform: scale(0.5, 0.5);
          transform-origin: left top;
          color: #ffffff;
          text-align: center;
          position: absolute;
          left: 24rem;
          top: -4rem;
        }
      }
      &__count {
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 12rem;
        color: #333333;
        &__price {
          font-family: PingFangSC-Medium;
          font-size: 18rem;
          color: #e93b3b;
        }
      }
    }
    &__right {
      width: 98rem;
      height: 49rem;
      background-color: #4fb0f9;
      font-family: PingFangSC-Medium;
      font-size: 14rem;
      color: #ffffff;
      text-align: center;
      line-height: 49rem;
    }
  }
}
</style>
