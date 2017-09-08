// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import { delCookie } from '../static/js/util.js'



Vue.use(VueResource)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})


Vue.http.interceptors.push(function (request, next) {
  request.withCredentials = true;
  next(function(response) {

    if (response.body.responseCode == 1004){
      delCookie('SESSION')
      delCookie('nickName')
      delCookie('userId')
      delCookie('avatar')
      router.go(0)
    }
    // modify response
    // response.body = '...';

  });
})
