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
        v-model="username"
      />
      <input
        class="container__input__password container__input__item"
        type="password"
        placeholder="请输入密码"
        v-model="password"
      />
      <input
        class="container__input__password container__input__item"
        type="password"
        placeholder="确认密码"
        v-model="confirmPassword"
      />
    </div>
    <div class="container__button">
      <button class="container__button__login" @click="handleRegister">
        注册
      </button>
    </div>
    <div class="container__content">
      <a href="javascript:;" class="container__content__a" @click="handleLogin"
        >已有账号去登录</a
      >
    </div>
    <div class="beian">
      <a href="https://beian.miit.gov.cn/" target="_blank"
        >粤ICP备2022079633号-1</a
      >
    </div>
  </div>
  <Toast v-if="isShow" :message="toastMessage" />
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../unils/request";
import Toast, { showToastEffect } from "../../components/Toast.vue";

const userRegisterEffect = (showToast) => {
  //定义数据
  const data = reactive({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  //点击注册，跳转到首页
  const handleRegister = async () => {
    //判断input里内容不能为空
    if (data.username === "") {
      showToast("手机号不能为空");
      return;
    }
    if (data.password === "") {
      showToast("密码不能为空");
      return;
    }
    if (data.confirmPassword === "") {
      showToast("密码不能为空");
      return;
    }
    //判断2次输入的密码一不一致
    if (data.password !== data.confirmPassword) {
      showToast("密码不一致");
    } else {
      //调用接口
      try {
        const result = await post("/user/register", {
          username: "data.username",
          password: "data.password",
        });
        if (result.data.errno === 0) {
          localStorage.setItem("isLogin", "true");
          router.push({ name: "Home" });
        } else {
          showToast("注册失败");
          console.log(result.data.desc);
        }
      } catch (err) {
        showToast("发送请求失败！");
        console.log(err);
      }
    }
  };
  // 返回数据
  const { username, password, confirmPassword } = toRefs(data);
  return {
    username,
    password,
    confirmPassword,
    handleRegister,
  };
};
//跳转到登录页面
const userLoginEffect = () => {
  const router = useRouter();
  //跳转到登录页面
  const handleLogin = () => {
    router.push({ name: "Login" });
  };
  return { handleLogin };
};
export default {
  name: "Register",
  components: { Toast },
  setup() {
    //对提示框的解构
    const { isShow, toastMessage, showToast } = showToastEffect();
    //
    const { username, password, confirmPassword, handleRegister } =
      userRegisterEffect(showToast);
    //
    const { handleLogin } = userLoginEffect();
    return {
      isShow,
      toastMessage,
      username,
      password,
      confirmPassword,
      handleRegister,
      handleLogin,
    };
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
      border: 1rem solid rgba(0, 0, 0, 0.1);
      border-radius: 6rem;
      width: 295rem;
      height: 48rem;
      margin-bottom: 16rem;
      font-family: PingFangSC-Regular;
      font-size: 16rem;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
      line-height: 24rem;
      padding-left: 16rem;
      box-sizing: border-box;
    }
  }
  &__button {
    text-align: center;
    &__login {
      background: #0091ff;
      box-shadow: 0 4rem 8rem 0 rgba(0, 145, 255, 0.32);
      border-radius: 4rem;
      width: 295rem;
      height: 48rem;
      font-size: 16rem;
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
      font-size: 14rem;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
    }
    &__gap {
      font-family: PingFangSC-Regular;
      font-size: 12rem;
      color: rgba(0, 0, 0, 0.5);
      letter-spacing: 0;
      margin: 0 12rem;
    }
  }
  .beian {
    width: 100%;
    position: fixed;
    bottom: 20rem;
    display: flex;
    justify-content: center;
    color: gray;
    a:link {
      color: gray;
    }
    a:visited {
      color: gray;
    }
  }
}
</style>
