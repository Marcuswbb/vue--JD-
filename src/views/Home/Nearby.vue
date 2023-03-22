<template>
  <div>
    <!-- 首页附近店铺 -->
    <div class="container__nearby">
      <div class="container__nearby__title">附近店铺</div>
      <div
        class="container__nearby__item"
        v-for="item of nearbyItems"
        :key="item.id"
      >
        <div class="container__nearby__item__left">
          <img
            class="container__nearby__item__left__img"
            :src="item.url"
            alt=""
          />
        </div>
        <div class="container__nearby__item__right">
          <div class="container__nearby__item__right__title">
            {{ item.title }}
          </div>
          <div class="container__nearby__item__right__tags">
            <div class="container__nearby__item__right__tags_item">
              {{ item.tags[0] }}
            </div>
            <div class="container__nearby__item__right__tags_item">
              {{ item.tags[1] }}
            </div>
            <div class="container__nearby__item__right__tags_item">
              {{ item.tags[2] }}
            </div>
          </div>
          <div class="container__nearby__item__right__notice">
            {{ item.notice }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Nearby",
  setup() {
    const nearbyItems = [
      {
        id: 1,
        url: "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211407079.png",
        title: "沃尔玛",
        tags: ["月售1万+", "起送¥0", "基础运费¥5"],
        notice: " VIP尊享满89元减4元运费券(每月3张)",
      },
      {
        id: 2,
        url: "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211407079.png",
        title: "沃尔玛",
        tags: ["月售1万+", "起送¥0", "基础运费¥5"],
        notice: " VIP尊享满89元减4元运费券(每月3张)",
      },
      {
        id: 3,
        url: "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211407079.png",
        title: "沃尔玛",
        tags: ["月售1万+", "起送¥0", "基础运费¥5"],
        notice: " VIP尊享满89元减4元运费券(每月3张)",
      },
      {
        id: 1,
        url: "https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211407079.png",
        title: "沃尔玛",
        tags: ["月售1万+", "起送¥0", "基础运费¥5"],
        notice: " VIP尊享满89元减4元运费券(每月3张)",
      },
    ];
    return {
      nearbyItems,
    };
  },
};
</script>
<style lang="scss">
.container__nearby {
  padding: 16px 18px;

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
      border-bottom: 1px solid #f1f1f1;
      &__title {
        font-size: 16px;
        color: #333333;
      }
      &__tags {
        display: flex;
        flex-direction: row;
        margin: 8rem 0rem;
        &__item {
          font-size: 13px;
          color: #333333;
          padding-right: 16rem;
        }
      }
      &__notice {
        font-size: 13px;
        color: #e93b3b;
        margin-bottom: 25px;
      }
    }
  }
}
</style>
