import { createRouter, createWebHashHistory } from "vue-router"
import { pendingRequest } from "../frame/utils/http"
import dashboard from "../pages/dashboard/index.vue"

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: dashboard
  },
  {
    path: "/LAN",
    name: "LAN",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/LAN/index")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 把上个页面还没结束的请求取消掉
  pendingRequest.forEach((item) => {
    item.routeChangeCancel && item.cancel()
  })
  // ... 其他处理
  next()
})

export default router
