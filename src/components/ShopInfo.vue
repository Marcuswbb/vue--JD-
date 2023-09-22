<template>
  <div class="shop-info">
    <div class="shop-info__left">
      <img class="shop-info__left__img" :src="item.logo" alt="" />
    </div>
    <div
      :class="{
        'shop-info__right': true,
        'shop-info__right--border': showBorder,
      }"
    >
      <div class="shop-info__right__title">
        {{ item.title }}
      </div>
      <div class="shop-info__right__tags">
        <div
          class="shop-info__right__tags__item"
          v-for="(tagsItem, tagsIndex) of item.tags"
          :key="tagsIndex"
        >
          {{ tagsItem }}
        </div>
      </div>
      <div class="shop-info__right__notice">
        {{ item.promotion }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopItem",
  props: ["item", "showBorder"],
};
</script>

<style lang="scss" scoped>
.shop-info {
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
    &--border {
      border-bottom: 1rem solid #f1f1f1;
    }
    &__title {
      font-size: 16rem;
      color: #333333;
    }
    &__tags {
      display: flex;
      margin: 8rem 0rem;
      &__item {
        font-size: 13rem;
        color: #333333;
        margin-right: 16rem;
      }
    }
    &__notice {
      font-size: 13rem;
      color: #e93b3b;
      margin-bottom: 25rem;
    }
  }
}
</style>