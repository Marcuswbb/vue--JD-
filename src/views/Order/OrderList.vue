<template>
  <div class="header">我的订单</div>
  <div class="container">
    <div class="container__order" v-for="item of orderList" :key="item.shopId">
      <div class="container__order__top">
        <div class="container__order__top__title">{{ item.shopName }}</div>
        <div class="container__order__top__status">已取消</div>
      </div>
      <div class="container__order__bottom">
        <div class="container__order__bottom__products">
          <img
            v-for="productItem of item.itemList"
            :key="productItem.id"
            :src="productItem.imgUrl"
            class="container__order__bottom__products__image"
            alt=""
          />
        </div>
        <div class="container__order__bottom__count">
          <div class="container__order__bottom__count__total-price">
            ¥{{ computeTotalPrice(item.itemList) }}
          </div>
          <div class="container__order__bottom__count__total-number">
            共{{ computeTotalNumber(item.itemList) }} 件
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker tag="order" />
</template>
<script>
import Docker from "../../components/Docker.vue";
import { ref } from "vue";
import { get } from "../../unils/request.js";

const useOrderListEffect = () => {
  const orderList = ref([]);
  //计算订单价格
  const computeTotalPrice = (productList) => {
    let totalPrice = 0;
    productList.forEach((element) => {
      totalPrice += element.count * element.promotionPrice;
    });
    return totalPrice.toFixed(2);
  };
  // 获取订单商品的数量
  const computeTotalNumber = (productList) => {
    let totalNumber = 0;
    productList.forEach((element) => {
      totalNumber += element.count;
    });
    return totalNumber;
  };
  // 获取订单页面的数据
  const getOrderList = async () => {
    const result = await get("/order-list/1");
    if (result.data.code === "0000") {
      orderList.value = result.data.data;
    } else {
      orderList.value = [];
    }
  };
  getOrderList();
  return { orderList, computeTotalPrice, computeTotalNumber };
};

export default {
  name: "OrderList",
  components: { Docker },
  setup() {
    const { orderList, computeTotalPrice, computeTotalNumber } =
      useOrderListEffect();
    console.log(orderList);
    return { orderList, computeTotalPrice, computeTotalNumber };
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 375rem;
  height: 44rem;
  background-color: #fff;
  font-family: PingFangSC-Regular;
  font-size: 16rem;
  color: #333333;
  text-align: center;
  line-height: 44rem;
}
.container {
  position: fixed;
  top: 44rem;
  right: 0;
  left: 0;
  bottom: 49rem;
  background-color: #f8f8f8;
  &__order {
    width: 339rem;
    height: 110rem;
    margin: 16rem auto;
    overflow: hidden;
    background: #ffffff;
    border-radius: 4rem;
    padding: 16rem;
    box-sizing: border-box;
    &__top {
      display: flex;
      justify-content: space-between;
      height: 22rem;
      margin-bottom: 16rem;
      align-items: center;
      &__title {
        font-family: PingFangSC-Medium;
        font-size: 16rem;
        color: #333333;
      }
      &__status {
        font-family: PingFangSC-Medium;
        font-size: 14rem;
        color: #999999;
      }
    }
    &__bottom {
      align-items: center;
      display: flex;
      justify-content: space-between;
      &__products {
        &__image {
          width: 40rem;
          height: 40rem;
          margin-right: 12rem;
        }
      }
      &__count {
        &__total-price {
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #e93b3b;
          text-align: right;
          margin-bottom: 4rem;
          line-height: 20rem;
        }
        &__total-number {
          font-family: PingFangSC-Regular;
          font-size: 12rem;
          color: #333333;
          line-height: 14rem;
          text-align: right;
        }
      }
    }
  }
}
</style>