import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import HomePage from '@/pages/HomePage'
import Loading from  '@/pages/Loading'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: Login
    },
    {
      path: '/register',
      name: '',
      component: Register
    },
    {
      path: '/home',
      name: '',
      component: HomePage
    },
    {
      path: '/loading',
      name: '',
      component: Loading
    }
  ]
})
