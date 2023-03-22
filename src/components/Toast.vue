<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { toRefs,reactive  } from "vue";

export default {
  name: "Toast",
  props: ["message"],
};
//把 showToast 相关的逻辑放到公用组件里
export const showToastEffect = () => {
  const toastData = reactive({
    isShow: false,
    toastMessage: "",
  });

  // 定义 showToast, 对代码进行封装
  const showToast = (message) => {
    toastData.isShow = true;
    toastData.toastMessage = message;
    setTimeout(() => {
      toastData.isShow = false;
      toastData.toastMessage = " ";
    }, 3000);
  };
  const { isShow, toastMessage } = toRefs(toastData);
  return { isShow, toastMessage, showToast };
  };
</script>

<style lang='scss' scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.35);
  padding: 10rem;
  border-radius: 5rem;
  color: #fff;
}
</style>