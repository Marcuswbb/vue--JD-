<template>
  <div class="container">
    <div class="head">
      <span class="iconfont icon-left" @click="backToAddressList"
        >&#xe600;</span
      >
      <span class="title">编辑收货地址</span>
      <span class="button" @click="submitButton">保存</span>
    </div>
    <div class="info">
      <div class="item">
        <span class="text">所在城市：</span>
        <input
          v-model="address.city"
          type="text"
          class="input-item"
          placeholder="如北京市"
        />
      </div>
      <div class="gap"></div>
      <div class="item">
        <span class="text">小区/大厦/学校：</span>
        <input
          v-model="address.community"
          type="text"
          class="input-item"
          placeholder="如理工大学国防科技园"
        />
      </div>
      <div class="gap"></div>
      <div class="item">
        <span class="text">楼号-门牌号：</span>
        <input
          v-model="address.building"
          type="text"
          class="input-item"
          placeholder="A号楼B层"
        />
      </div>
      <div class="gap"></div>
      <div class="item">
        <span class="text">收货人：</span>
        <input
          v-model="address.receiveName"
          type="text"
          class="input-item"
          placeholder="请填写收货人的姓名"
        />
      </div>
      <div class="gap"></div>
      <div class="item">
        <span class="text">联系电话：</span>
        <input
          v-model="address.phone"
          type="text"
          class="input-item"
          placeholder="请填写收货手机号"
        />
      </div>
    </div>
  </div>
  <Toast v-if="isShow" :message="toastMessage" />
</template>
  <script setup>
import router from "@/router";
import { onMounted, reactive } from "vue";
import Toast, { showToastEffect } from "../../components/Toast.vue";
import Schema from "async-validator";
import { get, put } from "../../unils/request";

onMounted(() => {
  getAddressInfo();
});
// 获取id地址
const addressId = router.currentRoute.value.params.id;

const address = reactive({
  city: "",
  community: "",
  building: "",
  receiveName: "",
  phone: "",
});

const { isShow, toastMessage, showToast } = showToastEffect();
const backToAddressList = () => {
  router.push("/address-list");
};

const rule = {
  city: [
    {
      required: true,
      message: "城市不能为空",
    },
  ],
  community: [
    {
      required: true,
      message: "小区不能为空",
    },
  ],
  building: [
    {
      required: true,
      message: "楼号不能为空",
    },
  ],
  receiveName: [
    {
      required: true,
      message: "收货人不能为空",
    },
    {
      pattern: /^[\u4e00-\u9fa5]{2,4}$/,
      message: "请输入有效的中文名字",
    },
  ],
  phone: [
    {
      required: true,
      message: "联系电话不能为空",
    },
    {
      pattern: /^1[0-9]{10}$/,
      message: "请输入有效的手机号码",
    },
  ],
};
// 校验表单
const validateForm = async () => {
  // 创建校验器
  const validator = new Schema(rule);
  try {
    // 校验, 参数是要校验的对象, 就是收集到的表单数据
    await validator.validate(address);
    // 校验成功
    console.log("校验成功");
    // 调用接口, 保存地址
    console.log(address);
    const data = JSON.parse(JSON.stringify(address));
    const res = await put(`/user/address/${addressId}`, data);
    if (res.errno === 0) {
      // 创建地址成功
      showToast("编辑地址成功");
      // 1秒之后跳转到地址列表页
      setTimeout(() => {
        // 跳转到地址列表页
        router.push("/address-list");
      }, 1000);
    } else {
      // 登录失败, 提示用户, res.message是错误信息
      showToast(res.message);
    }
  } catch (errors) {
    // 校验失败
    showToast(errors.errors[0].message);
  }
};
const submitButton = () => {
  validateForm();
};
// 通过接口获取地址信息
const getAddressInfo = async () => {
  const res = await get(`/user/address/${addressId}`);
  Object.assign(address, res.data.data);
};
</script>
  <style lang="scss" scoped>
@import "../../style/address-common.scss";
.container {
  width: 100vw;
  height: 100vh;
  background-color: #f8f8f8;
  @import "../../style/head-common.scss";
  .info {
    margin-top: 3.2vw;
    height: 59.7333vw;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .gap {
      width: 90.4vw;
      height: 0.2667vw;
      background: #f1f1f1;
      margin: 0 auto;
    }
    .item {
      padding-left: 4.8vw;
      .text {
        margin-right: 1vw;
        font-size: 3.7333vw;
        color: #666666;
        line-height: 5.3333vw;
      }
      .input-item {
        font-size: 3.7333vw;
        color: #333333;
        line-height: 5.3333vw;
        &::placeholder {
          font-size: 3.7333vw;
          color: #999999;
          line-height: 5.3333vw;
        }
      }
    }
  }
}
</style>
  