<template>
  <!-- 首页附近店铺 -->
  <div class="container__nearby">
    <div class="container__nearby__title">附近店铺</div>
    <!-- 跳转的时候, 携带参数id -->
    <router-link
      :to="`/shop/${item.id}`"
      v-for="item of nearbyItems"
      :key="item.id"
    >
      <ShopInfo :item="item" :showBorder="true" />
    </router-link>
  </div>
  <Toast v-if="isShow" :message="toastMessage" />
</template>
<script>
import { ref } from "vue";
import { get } from "../../unils/request.js";
import Toast, { showToastEffect } from "../../components/Toast.vue";
import ShopInfo from "../../components/ShopInfo.vue";

const useNearbyEffect = (showToast) => {
  const nearbyItems = ref([]);
  const getNearbyItems = async () => {
    try {
      const result = await get("/shop/hot-list");
      if (result.data.errno === 0) {
        nearbyItems.value = result.data.data;
      } else {
        showToast("获取数据失败");
        console.log(result);
      }
    } catch (error) {
      showToast("请求接口失败!!!");
      console.log(error);
    }
  };
  getNearbyItems();
  return { nearbyItems };
};
export default {
  name: "Nearby",
  components: { Toast, ShopInfo },
  setup() {
    //对提示框的解构
    const { isShow, toastMessage, showToast } = showToastEffect();
    const { nearbyItems } = useNearbyEffect(showToast);
    return { nearbyItems, isShow, toastMessage };
  },
};
</script>
<style lang="scss">
.container__nearby {
  padding: 16rem 18rem;
  &__title {
    font-size: 18rem;
    color: #333333;
  }
}
</style>
