import { toRefs } from "vue";
import { useStore } from "vuex";

//购买商品的数量
export const useCommonCartEffect = () => {
  const store = useStore();
  const { cartData } = toRefs(store.state);
  const changeItemToCart = (shopId, shopName, itemId, itemInfo, num) => {
    store.commit("changeItemToCart", {
      shopId,
      shopName,
      itemId,
      itemInfo,
      num,
    });
  };
  return { cartData, changeItemToCart };
};
