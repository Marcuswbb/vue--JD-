<template>
  <div class="container">
    <div class="head">
      <span class="icon-left" @click="backToUser"> &#xe600;</span>
      <span class="title">管理收货地址</span>
      <span class="button" @click="createAddress">新建</span>
    </div>
    <div class="title">我的收货地址</div>
    <div class="address-list">
      <div
      @click="toEditAddress(address.id)"
        class="address-item"
        v-for="address of addressList.data"
        :key="address.id"
      >
        <div class="left">
          <div class="top">
            <span class="username">{{ address.username }} </span>
            <span class="phone">{{ address.phone }} </span>
          </div>
          <div class="bottom">
            <p class="address-info">
              {{ address.addressInfo }}
            </p>
          </div>
        </div>
        <div class="right">
          <span class="iconfont icon-right"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { get } from "../../unils/request";
import router from "@/router";
const addressList = ref([]);

onMounted(() => {
  getAddressList();
});
// 获取地址列表数据
const getAddressList = async () => {
  const res = await get(`/address-list`);
  addressList.value = res.data;
};
// 跳转到用户页面
const backToUser = () => {
  router.push("/user");
};
const createAddress = () => {
  router.push("/address-create")
}
const toEditAddress = (id) => {
  router.push(`/address-edit/${id}`)
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #f8f8f8;
  @import "../../style/head-common.scss";
  .title {
    margin: 3.2vw 0;
    padding-left: 4.8vw;
    font-family: PingFangSC-Regular;
    font-size: 3.7333vw;
    color: #333333;
  }
  .address-list {
    .address-item {
      width: 90.4vw;
      height: 27.7333vw;
      background: #ffffff;
      border-radius: 1.0667vw;
      margin: 0 auto 4.2667vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 4.2667vw;
      .left {
        .top {
          margin-bottom: 2.1333vw;
          font-family: PingFangSC-Regular;
          font-size: 3.7333vw;
          color: #999999;
          .username {
            margin-right: 17.6vw;
          }
        }
        .bottom {
          .address-info {
            width: 69.3333vw;
            font-family: PingFangSC-Regular;
            font-size: 3.7333vw;
            color: #333333;
            line-height: 5.8667vw;
          }
        }
      }
      .right {
        .iconfont {
          font-size: 4.2667vw;
          color: #999999;
        }
      }
    }
  }
}
</style>