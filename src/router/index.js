import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: Login,
      method: 'Get'
    },
    {
      path: '/register',
      name: '',
      component: Register
    }
  ]
})
