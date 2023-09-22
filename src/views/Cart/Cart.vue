<template>
  <div class="container">
    <div class="head">
      <span class="iconfont"></span>
      <span class="title">我的全部购物车({{ total }})</span>
      <span class="button"></span>
    </div>
    <div class="cart-list" v-show="total">
      <div class="cart-item" v-for="(item, index) of cartAllData" :key="index">
        <div class="title">{{ item.shopName }}</div>
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
              <span class="count">{{ shop.sale }}</span>
            </div>
            <div class="right fr">
              <span class="total">{{
                (shop.currentPrice * shop.sale).toFixed(2)
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
              <span class="count">{{ shop.sale }}</span>
            </div>
            <div class="right fr">
              <span class="total">{{
                (shop.currentPrice * shop.sale).toFixed(2)
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
  </div>
  <Docker tag="cart" />
</template>

<script setup>
import Docker from "@/components/Docker.vue";
import { useStore } from "vuex";
import { computed, onMounted, reactive, ref } from "vue";

const isShowMore = ref(true);
const brandFold = ref(false);
const store = useStore();

const cartAllData = Object.values(store.state.cartData);
const cartData = computed(() => store.state.cartData);
// 商品总数
const total = computed(() => {
  let total = 0;
  cartAllData.forEach((item) => {
    Object.values(item.itemList).forEach((shop) => {
      total += shop.count;
    });
  });
  return total;
});
const shopCount = total.value;
const handleShowMoreClick = () => {
  isShowMore.value = !isShowMore.value;
  brandFold.value = !brandFold.value;
};

</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f8f8f8;
  @import "../../style/head-common.scss";
  .cart-list {
    position: fixed;
    top: 11.7333vw;
    right: 0;
    bottom: 13.0667vw;
    left: 0;
    overflow-y: auto;
    padding-top: 4.2667vw;
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
}
</style>