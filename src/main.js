import Vue from 'vue'
import App from './App.vue'
// import ElementUI, { MessageBox, Message } from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import VueRouter from 'vue-router'
import router from '../router'
import store from '../src/store'
// 要加上.less后缀
import './assets/less/index.less'
import http from 'axios'
import '../api/mock.js'

Vue.config.productionTip = false
// Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.$http = http
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$message = Message


// 导航（路由）守卫，路由在跳转时路由守卫会监听到
router.beforeEach((to, from, next) => {
  // 为了防止页面刷新之后vuex丢失token信息,会丢吗？
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    // 返回登录页面
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  },
}).$mount('#app')
