import { createRouter, createWebHashHistory } from "vue-router";
// import Home from '@/views/Home/Home.vue'
// import Login from '@/views/Login/Login.vue'
// import Register from '@/views/Register/Register.vue'
// import Shop from '@/views/Shop/Shop.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/Login.vue"),
    beforeEach: (to, from, next) => {
      if (localStorage.isLogin === "true") {
        next({ name: "Home" });
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register/Register.vue"),
    // 跳转到注册页面时，检测localStorage.isLogin是否为true，有就直接跳转到home页面
    beforeEach: (to, from, next) => {
      if (localStorage.isLogin === "true") {
        next({ name: "Home" });
      }
    },
  },
  {
    //跳转的时候, 携带参数id
    path: "/shop/:id",
    name: "Shop",
    component: () => import("../views/Shop/Shop.vue"),
  },
  {
    //跳转的时候, 携带参数shopI
    path: "/order-confirmation/:shopId",
    name: "OrderConfirmation",
    component: () => import("../views/Order/OrderConfirmation.vue"),
  },
  {
    //跳转到订单列表页面
    path: "/order-list",
    name: "OrderList",
    component: () => import("../views/Order/OrderList.vue"),
  },
  {
    //跳转到用户列表页面
    path: "/user",
    name: "User",
    component: () => import("../views/User/User.vue"),
  },
  {
    // 配置地址列表路由
    path: "/address-list", // 路径
    name: "AddressList", // 路由名称
    component: () => import("../views/address/AddressList.vue"), // 对应的组件
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// to 跳到哪里去
// from 从哪里跳过来
// next 继续执行
//有疑问------------------------
router.beforeEach((to, from, next) => {
  if (
    localStorage.isLogin === "true" ||
    to.name === "Login" ||
    to.name === "Register"
  ) {
    next();
  } else {
    next({ name: "Login" });
  }
});
export default router;
