<template>
  <section>
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="width-limit">
        <a class="home" href="/" style="text-decoration: none"> 灵感街</a>
        <span class="menu-nav menu-nav-first"><a class="menu menu-discover" href="/"><i class="fa fa-safari"></i>&nbsp;发现</a></span>
        <span class="menu-nav"><a class="menu menu-follow" @click="checkLogin('/follow')"><i
          class="fa fa-snowflake-o"></i>&nbsp;关注</a></span>
        <span class="menu-nav"><a class="menu menu-message"><i class="fa  fa-commenting"></i>&nbsp;消息</a></span>
        <el-input style="width: 200px;margin-top: 15px;margin-left: 40px;float: left;"
                  placeholder="搜索从这里开始"
                  icon="search"
                  :on-icon-click="handleIconClick">
        </el-input>
        <a class="btn write-btn" @click="checkLogin('/editor')">
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          写文章
        </a>
        <a class="btn sign-up" v-if="userId == '' || userId == null || userId == undefined" @click="toLogin">登录</a>
        <a class="btn log-in" v-if="userId == '' || userId == null || userId == undefined" href="/register">注册</a>

        <div class="user" @mousemove="userMouseMove" @mouseout="userMouseOut"
             :style="'background-color:'+userBackgroundColor" v-else>
          <el-dropdown>
                       <span class="el-dropdown-link avatar-span">
              <a class="avatar" :href="'/personal?userId='+userId">
               <img :src="avatar" alt="120">
              </a>
              </span>
            <el-dropdown-menu slot="dropdown">
              <a href="/setting">
                <el-dropdown-item>
                  <i class="fa fa-cog" aria-hidden="true"></i>
                  &nbsp;个人设置
                </el-dropdown-item>
              </a>
              <a @click="loginout">
                <el-dropdown-item>
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                  &nbsp;退出登录
                </el-dropdown-item>
              </a>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </nav>
  </section>
</template>
<script>
  import { getCookie, delCookie } from '../../static/js/util.js'
  import global_ from '../../src/pages/config.vue'

  export default {
    components: {},
    data () {
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
            message: '服务器繁忙, 请稍候重试'
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
          window.location.href = '/login?jumpUrl=' + href
        }, function (response) {
          console.info(response)
        })
      },
      toLogin: function () {
        window.location.href = '/login?jumpUrl=' + window.location.href.split(window.location.host)[1]
      }

    }
  }

</script>

<style scoped>

</style>
