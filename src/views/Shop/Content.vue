<template>
  <div class="content">
    <div class="content__left">
      <!-- 遍历商铺详情左边的元素 -->
      <div
        v-for="item of leftItems"
        :key="item.name"
        :class="{
          content__left__item: true,
          content__left__active: item.name === currentItemName,
        }"
        @click="handleClickName(item.name)"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="content__right">
      <div
        class="content__right__item"
        v-for="item of rightItems"
        :key="item.id"
      >
        <div class="content__right__item__left">
          <img
            :src="item.imgUrl"
            alt=""
            class="content__right__item__left__image"
          />
        </div>
        <div class="content__right__item__right">
          <div class="content__right__item__right__top">{{ item.name }}</div>
          <div class="content__right__item__right__middle">
            月售{{ item.sales }} 件
          </div>
          <div class="content__right__item__right__bottom">
            <div class="content__right__item__right__bottom__price">
              <div
                class="content__right__item__right__bottom__price__promotion"
              >
                ¥{{ item.promotionPrice }}
              </div>
              <div class="content__right__item__right__bottom__price__original">
                ¥{{ item.originalPrice }}
              </div>
            </div>
            <div class="content__right__item__right__bottom__count">
              <span
                v-show="cartData?.[shopId]?.[item.id]?.['count']"
                class="content__right__item__right__bottom__count__minus-iconfont"
                @click="changeItemToCart(shopId, item.id, item, -1)"
              >
                &#xe8a7;
              </span>
              <span
                v-show="cartData?.[shopId]?.[item.id]?.['count']"
                class="content__right__item__right__bottom__count__number"
              >
                {{ cartData?.[shopId]?.[item.id]?.["count"] }}
              </span>
              <span
                class="content__right__item__right__bottom__count__plus-iconfont"
                @click="changeItemToCart(shopId, item.id, item, 1)"
              >
                &#xe8a6;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watchEffect, toRefs } from "vue";
import { useRoute } from "vue-router";
import { get } from "../../unils/request";
import {useCommonCartEffect} from "./commonCartEffect.js";

//商品详情的数据
const leftItems = [
  {
    name: "all",
    text: "全部商品",
  },
  {
    name: "seckill",
    text: "秒杀",
  },
  {
    name: "fruit",
    text: "新鲜水果",
  },
  {
    name: "snacks",
    text: "休闲食品",
  },
  {
    name: "vegetable",
    text: "时令蔬菜",
  },
  {
    name: "meat",
    text: "肉蛋家禽",
  },
];
// 点击商品类别，将通过点击获得的itemName保存到currentItemName中
const userHandleClickName = () => {
  // 定义一个空变量来保存name
  const currentItemName = ref("all");
  const handleClickName = (itemName) => {
    currentItemName.value = itemName;
  };
  return { currentItemName, handleClickName };
};
//店铺内容区数据
const userContentEffect = (currentItemName) => {
  const rightItems = ref([]);
  const route = useRoute();
  const shopId = route.params.id;
  const getContentData = async (shopId, shopTab) => {
    const result = await get(`/shop/${shopId}/tab/${shopTab}`);
    rightItems.value = result.data.data;
  };
  watchEffect(() => {
    getContentData(shopId, currentItemName.value);
  });
  return { rightItems, shopId };
};

export default {
  name: "Content",
  setup() {
    const { cartData, changeItemToCart } = useCommonCartEffect();
    const { currentItemName, handleClickName } = userHandleClickName();
    const { rightItems, shopId } = userContentEffect(currentItemName);
    // 抛出
    return {
      leftItems,
      handleClickName,
      currentItemName,
      rightItems,
      cartData,
      shopId,
      changeItemToCart,
    };
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: absolute;
  top: 154rem;
  bottom: 49rem;
  left: 0;
  right: 0;
  overflow-y: auto;
  display: flex;
  &__left {
    background: #f5f5f5;
    border-radius: 2px;
    &__item {
      width: 76px;
      height: 40px;
      text-align: center;
      font-size: 14rem;
      line-height: 40rem;
      color: #333333;
    }
    &__active {
      background: #ffffff;
    }
  }
  &__right {
    flex-grow: 1;
    background-color: #fff;
    overflow-y: auto;
    &__item {
      margin: 0 18rem 12rem 16rem;
      display: flex;
      border-bottom: 1px solid #f1f1f1;
      &__left {
        margin-right: 16rem;
        &__image {
          width: 68rem;
          height: 68rem;
          margin-bottom: 12rem;
        }
      }
      &__right {
        flex-grow: 1;
        &__top {
          font-size: 14rem;
          color: #333333;
          margin-bottom: 8px;
        }
        &__middle {
          font-size: 12px;
          color: #333333;
          margin-bottom: 6rem;
        }
        &__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          &__price {
            display: flex;
            align-items: center;
            &__promotion {
              font-size: 14px;
              color: #e93b3b;

              margin-right: 8rem;
            }
            &__original {
              font-family: PingFangSC-Regular;
              font-size: 10px;
              color: #999999;
              text-decoration: line-through;
            }
          }
          &__count {
            display: flex;
            align-items: center;
            &__minus-iconfont {
              color: #666666;
              font-size: 20px;
            }
            &__number {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #333333;
              margin-left: 10px;
              margin-right: 10px;
            }
            &__plus-iconfont {
              font-size: 20px;
              color: #0091ff;
            }
          }
        }
      }
    }
  }
}
</style>
