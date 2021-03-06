import Vue from 'vue'
import Router from 'vue-router'
import 'font-awesome/css/font-awesome.css'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: '',
      component:  resolve => require(['@/pages/Login.vue'], resolve)
    },
    {
      path: '/register',
      name: '',
      component:  resolve => require(['@/pages/Register.vue'], resolve)
    },
    {
      path: '/',
      name: '',
      component:  resolve => require(['@/pages/HomePage.vue'], resolve)
    },
    {
      path: '/home',
      name: '',
      component:  resolve => require(['@/pages/HomePage.vue'], resolve)
    },
    {
      path: '/editor',
      name: '',
      component:  resolve => require(['@/pages/Editor.vue'], resolve)
    },
    {
      path: '/opus',
      name: '',
      component:  resolve => require(['@/pages/Opus.vue'], resolve)
    },
    {
      path: '/personal',
      name: '',
      component:  resolve => require(['@/pages/PersonalHome.vue'], resolve)
    },
    {
      path: '/setting',
      name: '',
      component:  resolve => require(['@/pages/PersonalSetting.vue'], resolve)
    },
    {
      path: '/follow',
      name: '',
      component:  resolve => require(['@/pages/Follow.vue'], resolve)
    },
    {
      path: '/label',
      name: '',
      component:  resolve => require(['@/pages/Label.vue'], resolve)
    },
    {
      path: '/hot',
      name: '',
      component:  resolve => require(['@/pages/HotOpus.vue'], resolve)
    },
    {
      path: '/message',
      name: '',
      component:  resolve => require(['@/pages/Message.vue'], resolve)
    }

  ]
})
