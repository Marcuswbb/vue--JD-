<template>
  <div class="cart">
    <div class="cart__left">
      <div class="cart__left__icon">
        <img
          src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261637089.png"
          alt=""
          class="cart__left__icon__image"
        />
        <span class="cart__left__icon__number"> {{ total.count }} </span>
      </div>
      <div class="cart__left__count">
        总计: <span class="cart__left__count__price">¥{{sumPrice}} </span>
      </div>
    </div>
    <div class="cart__right">去结算</div>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Cart",
  setup() {
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
    return {
      total,
      sumPrice,
    };
  },
};
</script>
<style lang="scss" scoped>
// src\views\shop\Cart.vue
.cart {
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
</style>
