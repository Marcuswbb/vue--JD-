<template>
  <div class="cart">
    <div class="cart__detail">
      <div class="cart__detail__item" v-for="item of cartItems" :key="item.id">
        <div class="cart__detail__item__left">
          <!-- 选中/不选中 字体图标 -->
          <div
            v-if="item.checked"
            class="cart__detail__item__left__checked-iconfont"
          >
            &#xe618;
          </div>
          <div v-else class="cart__detail__item__left__unchecked-iconfont">
            &#xe619;
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
            <!--  -->
            <div class="cart__detail__item__right__bottom__count">
              <span
                v-show="cartData?.[shopId]?.[item.id]?.['count']"
                class="cart__detail__item__right__bottom__count__minus-iconfont"
                @click="
                  () => {
                    changeItemToCart(shopId, item.id, item, -1);
                  }
                "
              >
                &#xe8a7;
              </span>
              <span
                v-show="cartData?.[shopId]?.[item.id]?.['count']"
                class="cart__detail__item__right__bottom__count__number"
              >
                {{ cartData?.[shopId]?.[item.id]?.["count"] }}
              </span>
              <span
                class="cart__detail__item__right__bottom__count__plus-iconfont"
                @click="
                  () => {
                    changeItemToCart(shopId, item.id, item, 1);
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
    <div class="cart__count">
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
      <div class="cart__count__right">去结算</div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "./commonCartEffect.js";

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
    const itemList = cartData[shopId];

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
    const itemList = cartData[shopId];
    let sum = 0.0;
    if (itemList) {
      for (let key in itemList) {
        sum += itemList[key].count * itemList[key].promotionPrice;
      }
    }
    return sum.toFixed(2);
  });
  //购物车列表
  const cartItems = computed(() => {
    const cartItems = cartData[shopId] || [];
    return cartItems;
  });
  return {
    total,
    sumPrice,
    cartItems,
    shopId,
  };
};

export default {
  name: "Cart",
  setup() {
    const { changeItemToCart, cartData } = useCommonCartEffect();
    const { total, sumPrice, cartItems, shopId } = useCartEffect();
    return {
      total,
      sumPrice,
      cartItems,
      changeItemToCart,
      shopId,
      cartData,
    };
  },
};
</script>
<style lang="scss" scoped>
// src\views\shop\Cart.vue
.cart {
  &__detail {
    position: fixed;
    background-color: #fff;
    width: 375rem;
    left: 0;
    bottom: 49rem;
    &__item {
      margin: 0 18rem 12rem 16rem;
      display: flex;
      &__left {
        margin-right: 16rem;
        &__image {
          width: 68rem;
          height: 68rem;
          margin-bottom: 12rem;
        }
      }
      &__right {
        flex-grow: 1;
        &__top {
          font-size: 14rem;
          color: #333333;
          margin-bottom: 8px;
        }
        &__middle {
          font-size: 12px;
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
              font-size: 14px;
              color: #e93b3b;

              margin-right: 8rem;
            }
            &__original {
              font-family: PingFangSC-Regular;
              font-size: 10px;
              color: #999999;
              text-decoration: line-through;
            }
          }
          &__count {
            display: flex;
            align-items: center;
            &__minus-iconfont {
              color: #666666;
              font-size: 20px;
            }
            &__number {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #333333;
              margin-left: 10px;
              margin-right: 10px;
            }
            &__plus-iconfont {
              font-size: 20px;
              color: #0091ff;
            }
          }
        }
      }
    }
  }
  &__count {
    box-shadow: 0 -1px 1px 0 #f1f1f1;
    position: fixed;
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
        margin-left: 24px;
        margin-right: 32px;
        &__image {
          width: 28px;
          height: 26px;
        }
        &__number {
          display: block;
          min-width: 20px;
          height: 20px;
          background: #e93b3b;
          border-radius: 10rem;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          transform: scale(0.5, 0.5);
          transform-origin: left top;
          color: #ffffff;
          text-align: center;
          position: absolute;
          left: 24px;
          top: -4px;
        }
      }
      &__count {
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
        &__price {
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #e93b3b;
        }
      }
    }
    &__right {
      width: 98px;
      height: 49px;
      background-color: #4fb0f9;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      line-height: 49px;
    }
  }
}
</style>
