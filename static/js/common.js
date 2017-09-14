import Vue from 'vue'
import { getCookie, delCookie } from '../../static/js/util.js'
import global_ from '../../src/pages/config.vue'

Vue.component('top-bar', {
  template:
  '<nav class="navbar navbar-default navbar-fixed-top" role="navigation">\n' +
  '      <div class="width-limit">\n' +
  '        <!-- 左上方 Logo -->\n' +
  // '        <a class="logo" href="/"><i class="fa fa-home fa-2x"></i>&nbsp;Afflatus Street</a>\n' +
  '<a class="btn logo" href="/home">\n' +
  '          <i class="fa fa-home" aria-hidden="true"></i>\n' +
  '          首页\n' +
  '        </a>\n' +
  '        <!-- 右上角 -->\n' +
  // '<div class="search ">\n' +
  // '  \n<input type="text" placeholder="搜索从这里开始...">\n' +
  // '</div>' +
  '        <!-- 未登录显示登录/注册/写文章 -->\n' +
  '        <a class="btn write-btn" href="/editor">\n' +
  '          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>\n' +
  '          写文章\n' +
  '        </a>\n' +
  '        <a class="btn sign-up" v-if="userId == \'\' || userId == null || userId == \'undefined\'" href="/register">注册</a>\n' +
  '        <a class="btn log-in" v-if="userId == \'\' || userId == null || userId == \'undefined\'" href="/login">登录</a>\n' +
  '        <div class="user" @mousemove="userMouseMove" @mouseout="userMouseOut" :style="\'background-color:\'+userBackgroundColor+\';\'" v-else>\n' +
  '          <el-dropdown>\n' +
  '            <span class="el-dropdown-link avatar-span">\n' +
  '            <a class="avatar" :href="\'/personal?userId=\'+userId">\n' +
  '              <img :src="avatar" alt="120">' +
  '             </a>\n' +
  '            </span>\n' +
  '            <el-dropdown-menu slot="dropdown">\n' +
  '                <a href="/setting">\n' +
  '              <el-dropdown-item>\n' +
  '                  <i class="fa fa-cog" aria-hidden="true"></i>\n' +
  '                  &nbsp;个人设置\n' +
  '              </el-dropdown-item>\n' +
  '                </a>\n' +
  '                <a @click="loginout">\n' +
  '              <el-dropdown-item>\n' +
  '                  <i class="fa fa-sign-out"  aria-hidden="true"></i>\n' +
  '                  &nbsp;退出登录\n' +
  '              </el-dropdown-item>\n' +
  '                </a>\n' +
  '            </el-dropdown-menu>\n' +
  '          </el-dropdown>\n' +
  '        </div>\n' +
  '      </div>\n' +
  '    </nav>',
  // camelCase in JavaScript
  props: [],
  data: function () {
    return {
      userId: getCookie('userId'),
      nickName: getCookie('nickName'),
      avatar: getCookie('avatar'),
      userBackgroundColor: '#fff'
    }
  },
  methods: {
    loginout: function () {
      var url = global_.host + '/v1/uc/loginout'
      this.$http.post(url).then(function (data) {
        if (data.body.responseCode == 1000) {
          delCookie('SESSION')
          delCookie('nickName')
          delCookie('userId')
          delCookie('avatar')
          window.location.href = '/login'
        } else {
          this.$notify.error({
            title: '错误',
            message: data.body.errorMsg
          })
        }
      }, function (response) {
        console.info(response)
        this.$notify.error({
          title: '糟糕',
          message: '服务器繁忙,请稍候重试'
        })
      })
    },
    userMouseMove: function () {
      this.userBackgroundColor = '#f0f0f0'
    },
    userMouseOut: function () {
      this.userBackgroundColor = '#fff'
    }

  }
})
