<template>
  <div>
    <!-- 首页搜索区域 -->
    <div class="container__search">
      <span class="iconfont container__search__iconfont">&#xe603; </span>
      <input
        class="container__search__input"
        type="text"
        placeholder="山姆会员商店优惠商品"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "Search",
};
</script>
<style lang="scss">
.container__search {
  position: relative;
  text-align: center;
  color: #b7b7b7;

  &__input {
    width: 339rem;
    height: 32rem;
    background: #f5f5f5;
    border-radius: 16rem;
    font-size: 14rem;
    padding-left: 44rem;
    box-sizing: border-box;
    &::-webkit-input-placeholder {
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      line-height: 16rem;
    }
    &:-moz-placeholder {
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      line-height: 16rem;
    }
    &::-moz-placeholder {
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      line-height: 16rem;
    }
    &:-ms-input-placeholder {
      font-family: PingFangSC-Regular;
      font-size: 14rem;
      line-height: 16rem;
    }
  }
  &__iconfont {
    position: absolute;
    left: 34rem;
    top: 6rem;
    color: #b7b7b7 c;
    font-size: 16rem;
  }
}
</style>
