import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import HomePage from '@/pages/HomePage'
import Loading from  '@/pages/Loading'
import Editor from  '@/pages/Editor'
import Opus from '@/pages/Opus'
import 'font-awesome/css/font-awesome.css'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: '',
      component: Login
    },
    {
      path: '/register',
      name: '',
      component: Register
    },
    {
      path: '/',
      name: '',
      component: HomePage
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
    },
    {
      path: '/editor',
      name: '',
      component: Editor
    },
    {
      path: '/opus/:opusId',
      name: '',
      component: Opus
    }
  ]
})
