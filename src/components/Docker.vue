<template>
  <div>
    <!-- 开发首页docker -->
    <div class="docker">
      <span
        v-for="(item, index) of dockerItems"
        :class="{ docker__item: true, docker__item__active: index === 3 }"
        :key="item.icon"
      >
        <span class="docker__item__iconfont iconfont" v-html="item.icon">
        </span>
        <span class="docker__item__text"> {{ item.text }} </span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Docker",
  setup() {
    const dockerItems = [
      {
        icon: "&#xe602;",
        text: " 首页 ",
      },
      {
        icon: "&#xe640;",
        text: " 购物车 ",
      },
      {
        icon: "&#xe626;",
        text: " 订单 ",
      },
      {
        icon: "&#xe8bb;",
        text: " 我的 ",
      },
    ];
    return { dockerItems };
  },
};
</script>
<style lang="scss">
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
      font-size: 10px;
      transform: scale(0.6, 0.6);
      transform-origin: center top;
    }
    &__active {
      color: #1fa4fc;
    }
  }
}
</style>
