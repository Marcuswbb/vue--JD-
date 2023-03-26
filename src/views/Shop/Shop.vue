<template>
  <div class="container">
    <div class="container__header">
      <!-- src\views\shop\Shop.vue -->
      <div class="container__header__left">
        <span
          @click="handelBackClick"
          class="container__header__left__iconfont"
        >
          &#xe600;
        </span>
      </div>
      <div class="container__header__right">
        <span class="container__header__right__iconfont">&#xe603;</span>
        <input
          type="text"
          class="container__header__right__input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <!-- 防止裂图  v-if="item.imgUrl" -->
    <ShopInfo :item="item" :showBorder="false" v-if="item.imgUrl" />
    <Content />
    <Cart />
  </div>
</template>
<script>
import { ref } from "vue";
import { get } from "../../unils/request.js";
import { useRouter, useRoute } from "vue-router";
import ShopInfo from "../../components/ShopInfo.vue";
import Content from "../Shop/Content.vue";
import Cart from "./Cart.vue";

const userShopInfoEffect = () => {
  //route 路由信息对象，只读对象
  const route = useRoute();
  const item = ref([]);
  const getItemData = async () => {
    try {
      //
      const result = await get(`/shop/${route.params.id}`);
      item.value = result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return { item, getItemData };
};
const userHandelBackClick = () => {
  const router = useRouter();
  //点击handelBackClick返回上一页
  const handelBackClick = () => {
    router.back();
  };
  return handelBackClick;
};
export default {
  name: "Shop",
  components: { ShopInfo, Content, Cart },
  setup() {
    const { item, getItemData } = userShopInfoEffect();
    const handelBackClick = userHandelBackClick();
    getItemData();
    return { item, handelBackClick };
  },
};
</script>
<style lang="scss" scoped>
// src\views\shop\Shop.vue
.container {
  padding: 0 18rem;
}
.container__header {
  width: 100%;
  height: 32rem;
  margin-top: 16rem;
  margin-bottom: 16rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 0;
}
.container__header__left__iconfont {
  color: #b6b6b6;
  font-size: 25rem;
}
.container__header__right {
  position: relative;
  margin-left: 16rem;
}
.container__header__right__iconfont {
  color: #b7b7b7;
  font-size: 18rem;
  position: absolute;
  top: 6rem;
  left: 16rem;
}
.container__header__right__input {
  width: 310rem;
  height: 32rem;
  background: #f5f5f5;
  border-radius: 16rem;
  padding: 0 44rem;
  box-sizing: border-box;
  font-family: PingFangSC-Regular;
  font-size: 14rem;
  color: #333333;
  line-height: 16rem;
}
</style>
