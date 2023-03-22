<template>
  <!-- 首页内容头部 -->
  <div class="container__header">
    <div class="container__header__fl">
      <span class="container__header__fl__iconfont iconfont">&#xe609; </span>
      <span class="container__header__fl__text"
        >北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层
        北京理工大学国防科技园2号楼10层
      </span>
    </div>
    <div class="container__header__fr">
      <span class="container__header__fr__iconfont iconfont">&#xe759; </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
};
</script>
<style lang="scss">
@import "../../style/mixin.scss";
.container__header {
  display: flex;
  justify-content: space-between;
  font-size: 16rem;
  margin: 16rem 19rem;
  &__fl {
    width: 295rem;
    @include ellipsis;
    &__iconfont {
      color: #333333;
    }
    &__text {
      color: #333333;
    }
  }
  &__fr__iconfont {
    font-size: 18rem;
  }
}
</style>
