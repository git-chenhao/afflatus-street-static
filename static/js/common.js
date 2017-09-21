import Vue from 'vue'
import { getCookie, delCookie } from '../../static/js/util.js'
import global_ from '../../src/pages/config.vue'

Vue.component('top-bar', {
  template:
  '<nav class="navbar navbar-default navbar-fixed-top" role="navigation">\n' +
  '      <div class="width-limit">\n' +
  // '<a class="btn logo" href="/home">\n' +
  // '          <i class="fa fa-home" aria-hidden="true"></i>\n' +
  // '          首页\n' +
  // '        </a>\n' +
  '<a class="home" href="/" style="text-decoration: none">\n' +
  '        <!--<i class="fa fa-home fa-2x "></i>Home-->\n' +
  '        灵感街' +
  '      </a>' +
  '<span class="menu-nav menu-nav-first"><a class="menu menu-discover" href="/"><i class="fa fa-safari"></i>&nbsp;发现</a></span>' +
  '<span class="menu-nav"><a class="menu menu-follow"  @click="checkLogin(\'/follow\')"><i class="fa fa-snowflake-o"></i>&nbsp;关注</a></span>' +
  '<span class="menu-nav"><a class="menu menu-message"><i class="fa  fa-commenting"></i>&nbsp;消息</a></span>' +
  '<el-input  style="width: 200px;margin-top: 15px;margin-left: 40px;float: left;" ' +
  '  placeholder="搜索从这里开始"\n' +
  '  icon="search"\n' +
  '  :on-icon-click="handleIconClick">\n' +
  '</el-input>' +

  '        <a class="btn write-btn" @click="checkLogin(\'/editor\')" >\n' +
  '          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>\n' +
  '          写文章\n' +
  '        </a>\n' +
  '        <a class="btn sign-up" v-if="userId == \'\' || userId == null || userId == \'undefined\'" @click="toLogin"">登录</a>\n' +
  '        <a class="btn log-in" v-if="userId == \'\' || userId == null || userId == \'undefined\'" href="/register">注册</a>\n' +

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
          window.location.reload()
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
    },
    checkLogin: function (href) {
      var url = global_.host + '/v1/uc/login/check'
      this.$http.get(url, {credentials: true}).then(function (data) {
        if (data.body.responseCode == 1000 && data.body.data == true) {
          window.location.href = href
          return
        }
        window.location.href = '/login?jumpUrl='+href
      }, function (response) {
        console.info(response)
      })
    },
    toLogin: function () {
      window.location.href = '/login?jumpUrl='+window.location.href.split(window.location.host)[1]
    }

  }
})
