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
        v-model="data.userName"
      />
      <input
        class="container__input__password container__input__item"
        type="password"
        placeholder="请输入密码"
        v-model="data.password"
      />
    </div>
    <div class="container__button">
      <button class="container__button__login" @click="handleLogin">
        登录
      </button>
    </div>
    <div class="container__content">
      <a
        href="javascript:;"
        class="container__content__a"
        @click="handleRegister"
        >立即注册</a
      >
      <span class="container__content__gap">|</span>
      <a href="javascript:;" class="container__content__a">忘记密码</a>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
export default {
  name: "Login",
  setup() {
    const data = reactive({
      userName: "",
      password: "",
    });
    const router = useRouter();
    //点击登录，跳转到首页
    const handleLogin = () => {
      axios
        .post(
          "https://www.fastmock.site/mock/f0e8ab5c5c19862e24bf5456d3cfca8f/api/user/login",
          {
            phone: "data.userName",
            password: "data.password",
          }
        )
        .then((response) => {
          if (response.data.code === "0000") {
            localStorage.setItem("isLogin", "true");
            router.push({ name: "Home" });
          } else {
            alert(response.data.desc);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // localStorage.setItem("isLogin", "true");
      // router.push({ name: "Home" });
    };
    //点击注册，跳转到注册页面
    const handleRegister = () => {
      router.push({ name: "Register" });
      console.log(1);
    };
    return { handleLogin, handleRegister, data };
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
