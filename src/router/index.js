import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import HomePage from '@/pages/HomePage'
import Editor from  '@/pages/Editor'
import Opus from '@/pages/Opus'
import PersonalHome from '@/pages/PersonalHome'
import PersonalSetting from '@/pages/PersonalSetting'
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
      path: '/editor',
      name: '',
      component: Editor
    },
    {
      path: '/opus/:opusId',
      name: '',
      component: Opus
    },
    {
      path: '/personal/:userId',
      name: '',
      component: PersonalHome
    },
    {
      path: '/setting',
      name: '',
      component: PersonalSetting
    }

  ]
})
