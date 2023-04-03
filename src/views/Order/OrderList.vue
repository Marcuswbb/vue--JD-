<template>
  <div class="header">我的订单</div>
  <div class="container">
    <div class="container__order">
      <div class="container__order__top">
        <div class="container__order__top__title">沃尔玛</div>
        <div class="container__order__top__status">已取消</div>
      </div>
      <div class="container__order__bottom">
        <div class="container__order__bottom__products">
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261527635.png"
            class="container__order__bottom__products__image"
            alt=""
          />
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261527853.png"
            class="container__order__bottom__products__image"
            alt=""
          />
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261527922.png"
            class="container__order__bottom__products__image"
            alt=""
          />
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261530259.png"
            class="container__order__bottom__products__image"
            alt=""
          />
        </div>
        <div class="container__order__bottom__count">
          <div class="container__order__bottom__count__total-price">¥66.69</div>
          <div class="container__order__bottom__count__total-number">共6件</div>
        </div>
      </div>
    </div>
    <div class="container__order">
      <div class="container__order__top">
        <div class="container__order__top__title">沃尔玛</div>
        <div class="container__order__top__status">已取消</div>
      </div>
      <div class="container__order__bottom">
        <div class="container__order__bottom__products">
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261527635.png"
            class="container__order__bottom__products__image"
            alt=""
          />
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261527853.png"
            class="container__order__bottom__products__image"
            alt=""
          />
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261527922.png"
            class="container__order__bottom__products__image"
            alt=""
          />
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261530259.png"
            class="container__order__bottom__products__image"
            alt=""
          />
        </div>
        <div class="container__order__bottom__count">
          <div class="container__order__bottom__count__total-price">¥66.69</div>
          <div class="container__order__bottom__count__total-number">共6件</div>
        </div>
      </div>
    </div>
    <div class="container__order">
      <div class="container__order__top">
        <div class="container__order__top__title">沃尔玛</div>
        <div class="container__order__top__status">已取消</div>
      </div>
      <div class="container__order__bottom">
        <div class="container__order__bottom__products">
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261527635.png"
            class="container__order__bottom__products__image"
            alt=""
          />
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261527853.png"
            class="container__order__bottom__products__image"
            alt=""
          />
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261527922.png"
            class="container__order__bottom__products__image"
            alt=""
          />
          <img
            src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261530259.png"
            class="container__order__bottom__products__image"
            alt=""
          />
        </div>
        <div class="container__order__bottom__count">
          <div class="container__order__bottom__count__total-price">¥66.69</div>
          <div class="container__order__bottom__count__total-number">共6件</div>
        </div>
      </div>
    </div>
  </div>
  <Docker tag="order" />
</template>
<script>
import Docker from "../../components/Docker.vue";

export default {
  name: "OrderList",
  components: { Docker },
};
</script>
<style lang="scss" scoped>
.header {
  width: 375px;
  height: 44px;
  background-color: #fff;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  text-align: center;
  line-height: 44px;
}
.container {
  position: fixed;
  top: 44px;
  right: 0;
  left: 0;
  bottom: 49px;
  background-color: #f8f8f8;
  &__order {
    width: 339px;
    height: 110px;
    margin: 16px auto;
    overflow: hidden;
    background: #ffffff;
    border-radius: 4px;
    padding: 16px;
    box-sizing: border-box;
    &__top {
      display: flex;
      justify-content: space-between;
      height: 22px;
      margin-bottom: 16px;
      align-items: center;
      &__title {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
      }
      &__status {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #999999;
      }
    }
    &__bottom {
      align-items: center;
      display: flex;
      justify-content: space-between;
      &__products {
        &__image {
          width: 40px;
          height: 40px;
          margin-right: 12px;
        }
      }
      &__count {
        &__total-price {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #e93b3b;
          text-align: right;
          margin-bottom: 4px;
          line-height: 20px;
        }
        &__total-number {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #333333;
          line-height: 14px;
          text-align: right;
        }
      }
    }
  }
}
</style>