// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import routes from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import routes from './routes'
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
  console.log(getToken())
  if (getToken()) {
    if (to.path === '/login') {
      console.log(getToken())
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      console.log('succ')
      next()
    } else {
      next('/login')
    }
  }

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
