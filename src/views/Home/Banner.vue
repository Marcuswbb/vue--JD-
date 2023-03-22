<template>
  <div>
    <!-- 首页 banner 区 -->
    <div class="container__banner">
      <img
        src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202191609589.png"
        alt=""
        class="container__banner__img"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "Banner",
};
</script>
<style lang="scss">
.container__banner {
  text-align: center;
  margin-top: 20rem;
  height: 88.8rem;
  &__img {
    width: 339rem;
    height: 86rem;
  }
}
</style>
