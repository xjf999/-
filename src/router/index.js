import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import('../views/orderList/OrderList')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../views/shop/shop')
  },
  {
    path: '/order/:id',
    name: 'Order',
    component: () => import('../views/order/Order')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/search/Search')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/register'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin
  if (isLogin || to.name === 'Login' || to.name === 'Register') {
    next()
  // eslint-disable-next-line no-empty
  } else {
    next({ name: 'Login' })
  }
})

export default router
