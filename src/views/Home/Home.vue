<template>
  <div>
    <!-- 开发首页docker -->
    <Docker tag="home" />
    <!-- 首页 header -->
    <div class="container">
      <!-- 首页内容头部 -->
      <Header />
      <!-- 首页搜索区域 -->
      <Search />
      <!-- 首页 banner 区 -->
      <Banner />
      <!-- 首页快捷导航 -->
      <Nav />
      <!-- 首页内容间缝隙 -->
      <Gap />
      <!-- 首页附近店铺 -->
      <Nearby />
      <!--  -->
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../style/mixin.scss";
// 首页docker
.docker {
  width: 375rem;
  height: 49rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #ffffff;
  box-shadow: 0 -1rem 1rem 0 #f1f1f1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 9.4rem;
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333333;
    &__iconfont {
      font-size: 20rem;
    }
    &__text {
      font-size: 10rem;
      transform: scale(0.6, 0.6);
      transform-origin: center top;
    }
    &__active {
      color: #1fa4fc;
    }
  }
}
//首页 header
.container {
  position: absolute;
  bottom: 49rem;
  left: 0;
  top: 0;
  right: 0;
  overflow-y: auto;
  //首页内容头部
  &__header {
    display: flex;
    justify-content: space-between;
    font-size: 16rem;
    margin: 16rem 19rem;
    &__fl {
      width: 295rem;
      @include ellipsis;
      &__iconfont {
        color: #333333;
      }
      &__text {
        color: #333333;
      }
    }
    &__fr__iconfont {
      font-size: 18rem;
    }
  }
  //首页搜索区域
  &__search {
    position: relative;
    text-align: center;
    color: #b7b7b7;

    &__input {
      width: 339rem;
      height: 32rem;
      background: #f5f5f5;
      border-radius: 16rem;
      font-size: 14rem;
      padding-left: 44rem;
      box-sizing: border-box;
      &::-webkit-input-placeholder {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        line-height: 16rem;
      }
      &:-moz-placeholder {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        line-height: 16rem;
      }
      &::-moz-placeholder {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        line-height: 16rem;
      }
      &:-ms-input-placeholder {
        font-family: PingFangSC-Regular;
        font-size: 14rem;
        line-height: 16rem;
      }
    }
    &__iconfont {
      position: absolute;
      left: 34rem;
      top: 6rem;
      color: #b7b7b7 c;
      font-size: 16rem;
    }
  }
  //首页 banner 区
  &__banner {
    text-align: center;
    margin-top: 20rem;
    height: 88.8rem;
    &__img {
      width: 339rem;
      height: 86rem;
    }
  }
  // 首页快捷导航
  &__nav {
    padding-left: 14rem;
    padding-right: 14rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    margin-top: 16rem;
    &__item {
      width: 20%;
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-bottom: 16rem;
      &__img {
        height: 40rem;
        width: 40rem;
        margin-bottom: 6rem;
      }
      &__text {
        font-family: PingFangSC-Regular;
        font-size: 12rem;
        color: #333333;
        text-align: center;
      }
    }
  }
  &__gap {
    height: 10rem;
    width: 100%;
    background: #f1f1f1;
  }
  &__nearby {
    padding: 16rem 18rem;

    &__title {
      font-size: 18rem;
      color: #333333;
    }
    &__item {
      display: flex;
      flex-direction: row;
      margin-top: 14rem;
      &__left {
        &__img {
          width: 56rem;
          height: 56rem;
        }
      }
      &__right {
        margin-left: 16rem;
        background-color: #fff;
        border-bottom: 1rem solid #f1f1f1;
        &__title {
          font-size: 16rem;
          color: #333333;
        }
        &__tags {
          display: flex;
          flex-direction: row;
          margin: 8rem 0rem;
          &__item {
            font-size: 13rem;
            color: #333333;
            padding-right: 16rem;
          }
        }
        &__notice {
          font-size: 13rem;
          color: #e93b3b;
          margin-bottom: 25rem;
        }
      }
    }
  }
}
</style>

<script>
import Header from "@/views/Home/Header.vue";
import Banner from "@/views/Home/Banner.vue";
import Docker from "../../components/Docker.vue";
import Gap from "@/views/Home/Gap.vue";
import Nav from "@/views/Home/Nav.vue";
import Nearby from "@/views/Home/Nearby.vue";
import Search from "@/views/Home/Search.vue";

export default {
  name: "Home",
  components: { Header, Banner, Docker, Gap, Nav, Nearby, Search },
};
</script>
