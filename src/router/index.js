import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEach: (to, from, next) => {
      if (localStorage.isLogin === 'true') {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    // 跳转到注册页面时，检测localStorage.isLogin是否为true，有就直接跳转到home页面
    beforeEach: (to, from, next) => {
      if (localStorage.isLogin === 'true') {
        next({ name: 'Home' })
      }
    }
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// to 跳到哪里去
// from 从哪里跳过来
// next 继续执行
//有疑问------------------------
router.beforeEach((to, from, next) => {
  if (
    localStorage.isLogin === 'true' ||
    to.name === 'Login' ||
    to.name === 'Register'
  ) {
    next()
  } else {
    next({ name: 'Login' })
  }
  next()
})
export default router
