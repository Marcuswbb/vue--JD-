<template>
  <div class="user">
    <div class="user__header">
      <div class="user__header__contain">
        <img
          src="https://img0.baidu.com/it/u=583907341,1751897464&fm=253&fmt=auto&app=120&f=JPEG?w=736&h=500"
          class="user__header__contain__hearder-img"
        />
        <div class="user__header__contain__userName">热心市民周先生</div>
        <div class="user__header__contain__id">ID: 1069643013</div>
        <div class="user__header__contain__gray"></div>
        <div class="user__header__contain__function">
          <div class="user__header__contain__function__item">
            <div class="user__header__contain__function__item__name">红包</div>
            <div class="user__header__contain__function__item__number">218</div>
          </div>
          <div class="user__header__contain__function__item">
            <div class="user__header__contain__function__item__name">
              优惠卷
            </div>
            <div class="user__header__contain__function__item__number">
              12张
            </div>
          </div>
          <div class="user__header__contain__function__item">
            <div class="user__header__contain__function__item__name">豌豆</div>
            <div class="user__header__contain__function__item__number">88</div>
          </div>
          <div class="user__header__contain__function__item">
            <div class="user__header__contain__function__item__name">白条</div>
            <div class="user__header__contain__function__item__number">
              1000
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user__contain">
      <div class="user__contain__item">
        <div class="user__contain__item__left">
          <span class="user__contain__item__left__iconfrom">&#xe607;</span>
          <span class="user__contain__item__left__text">我的钱包</span>
        </div>
        <div class="user__contain__item__right">&#xe65f;</div>
      </div>
      <div class="user__contain__item" @click="toAddressList">
        <div class="user__contain__item__left">
          <span
            class="user__contain__item__left__iconfrom"
            style="color: #32c5ff"
            >&#xe672;</span
          >
          <span class="user__contain__item__left__text">我的地址</span>
        </div>
        <div class="user__contain__item__right">&#xe65f;</div>
      </div>
      <div class="user__contain__item">
        <div class="user__contain__item__left">
          <span
            class="user__contain__item__left__iconfrom"
            style="color: #9013fe"
            >&#xe65a;</span
          >
          <span class="user__contain__item__left__text">客服与帮助</span>
        </div>
        <div class="user__contain__item__right">&#xe65f;</div>
      </div>
    </div>
  </div>
  <Docker tag="user" />
</template>

<script setup>
import router from "@/router";
import Docker from "../../components/Docker.vue";

const toAddressList = () => {
  router.push("/address-list");
};
</script>

<style lang="scss" scoped>
.user {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 49rem;
  background-color: #f8f8f8;
  &__header {
    background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
    width: 375rem;
    height: 250rem;
    border-radius: 0 0 20% 20%;
    object-fit: cover;
    &__contain {
      background: #ffffff;
      box-shadow: 0 8rem 16rem 0 rgba(0, 0, 0, 0.08);
      border-radius: 8rem;
      width: 339rem;
      height: 203rem;
      position: fixed;
      top: 108rem;
      left: 18rem;
      bottom: 0;
      text-align: center;
      &__hearder-img {
        position: absolute;
        width: 94rem;
        height: 94rem;
        background-color: #262628;
        border-radius: 47rem;
        top: -47rem;
        left: 50%;
        transform: translateX(-50%);
      }
      &__userName {
        font-family: PingFangSC-Regular;
        font-size: 24rem;
        color: #262628;
        letter-spacing: 0.19rem;
        text-align: center;
        line-height: 36rem;
        margin-top: 59rem;
      }
      &__id {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        color: #c1c0c9;
      }
      &__gray {
        border: 1rem solid #f1f1f1;
        margin: 12rem 0;
      }
      &__function {
        display: flex;
        justify-content: space-around;
        &__item {
          &__name {
            font-family: PingFangSC-Regular;
            font-size: 12rem;
            color: #c1c0c9;
            margin-bottom: 3rem;
          }
          &__number {
            font-family: PingFangSC-Regular;
            font-size: 20rem;
            color: #262628;
          }
        }
      }
    }
  }
  &__contain {
    margin-top: 77rem;
    margin-left: 18rem;
    width: 339rem;
    height: 146rem;
    background: #ffffff;
    box-shadow: 0 8rem 16rem 0 rgba(0, 0, 0, 0.08);
    border-radius: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    &__item {
      margin-left: 16rem;
      height: 30rem;
      display: flex;
      justify-content: space-between;
      &__left {
        display: flex;
        align-items: center;
        &__iconfrom {
          font-size: 22rem;
          color: #ed4a47;
          margin-right: 12rem;
        }
        &__text {
          font-family: PingFangSC-Regular;
          font-size: 14rem;
          color: #262626;
        }
      }
      &__right {
        padding-right: 12rem;
        line-height: 30rem;
      }
    }
  }
}
</style>