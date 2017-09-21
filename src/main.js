// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import { delCookie } from '../static/js/util.js'
import '../static/js/common.js'
import iView from 'iview';
import VueQArt from 'vue-qart'
import 'iview/dist/styles/iview.css';    // 使用 CSS
import VueQRCodeComponent from 'vue-qrcode-component'

// Vue.component('qr-code', VueQRCodeComponent)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(iView);
Vue.use(VueQArt);
Vue.config.productionTip = false

Vue.directive('focus', function (el, option) {
  var defClass = 'el-input', defTag = 'input';
  var value = option.value || true;
  if (typeof value === 'boolean')
    value = { cls: defClass, tag: defTag, foc: value };
  else
    value = { cls: value.cls || defClass, tag: value.tag || defTag, foc: value.foc || false };
  if (el.classList.contains(value.cls) && value.foc)
    el.getElementsByTagName(value.tag)[0].focus();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

Vue.http.interceptors.push(function (request, next) {
  request.withCredentials = true
  next(function (response) {
    if (response.body.responseCode == 1004) {
      delCookie('SESSION')
      delCookie('nickName')
      delCookie('userId')
      delCookie('avatar')
    }

  })
})
