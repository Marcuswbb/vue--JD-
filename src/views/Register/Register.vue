<template>
  <div class="container">
    <div class="container__portrait">
      <img
        class="container__portrait__img"
        src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202221429453.png"
        alt=""
      />
    </div>
    <div class="container__input">
      <input
        class="container__input__username container__input__item"
        type="text"
        placeholder="请输入手机号"
      />
      <input
        class="container__input__password container__input__item"
        type="password"
        placeholder="请输入密码"
      />
      <input
        class="container__input__password container__input__item"
        type="password"
        placeholder="确认密码"
      />
    </div>
    <div class="container__button">
      <button class="container__button__login" @click="handleLogin">
        注册
      </button>
    </div>
    <div class="container__content">
      <a href="javascript:;" class="container__content__a" @click="handleLogin"
        >已有账号去登录</a
      >
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const handleLogin = () => {
      router.push({ name: "Login" });
    };
    return { handleLogin };
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 120rem;
  &__portrait {
    text-align: center;
    &__img {
      width: 66rem;
      height: 66rem;
    }
  }
  &__input {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40rem;
    &__item {
      background: #f9f9f9;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      width: 295rem;
      height: 48rem;
      margin-bottom: 16rem;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
      line-height: 24px;
      padding-left: 16rem;
      box-sizing: border-box;
    }
  }
  &__button {
    text-align: center;
    &__login {
      background: #0091ff;
      box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
      border-radius: 4px;
      width: 295rem;
      height: 48rem;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      border: none;
    }
  }
  &__content {
    text-align: center;
    margin-top: 16rem;
    &__a {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
    }
    &__gap {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
      margin: 0 12rem;
    }
  }
}
</style>
