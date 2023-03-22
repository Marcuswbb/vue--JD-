<template>
  <div>
    <!-- 首页快捷导航 -->
    <div class="container__nav">
      <div
        class="container__nav__item"
        v-for="(item, index) of navItems"
        :key="index"
      >
        <img class="container__nav__item__img" :src="item.imgUrl" alt="" />
        <span class="container__nav__item__text">{{ item.text }} </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Nav",
  setup() {
    const navItems = [
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png",
        text: "超市便利",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843550.png",
        text: "菜市场",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843505.png",
        text: "水果店",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843412.png",
        text: "鲜花绿植",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844276.png",
        text: "医药健康",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844145.png",
        text: "家具健康",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844545.png",
        text: "烘培蛋糕",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844072.png",
        text: "签到",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844735.png",
        text: "大牌免运",
      },
      {
        imgUrl:
          "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844286.png",
        text: "红包套餐",
      },
    ];
    return {
      navItems,
    };
  },
};
</script>
<style lang="scss" scoped>
.container__nav {
  padding-left: 14px;
  padding-right: 14px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  &__item {
    width: 20%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 16rem;
    &__img {
      height: 40rem;
      width: 40rem;
      margin-bottom: 6px;
    }
    &__text {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #333333;
      text-align: center;
    }
  }
}
</style>
