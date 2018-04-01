// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import routes from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import routes from './router'
import Mock from './mock'
import store from './store'
import { getToken } from './auth'
Mock.bootstrap();
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({routes})

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('name') || sessionStorage.getItem('name')
  if (user) {
    if (to.path === '/login' || to.path === '/') {
      next({ path: '/stuList' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from) => {
  document.title = to.name
  console.log(to.name)
})


/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App),
  // components: { App },
  template: '<App/>'
}).$mount('#app')
