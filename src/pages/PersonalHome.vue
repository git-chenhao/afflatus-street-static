<template>
  <div class="opus">
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="width-limit">
        <!-- 左上方 Logo -->
        <a class="logo" href="/"><i class="fa fa-home fa-2x"></i>&nbsp;首页</a>


        <!-- 右上角 -->
        <!-- 未登录显示登录/注册/写文章 -->
        <a class="btn write-btn" href="/editor">
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          写文章
        </a>
        <a class="btn sign-up" v-if="nickName == null" href="/register">注册</a>
        <a class="btn log-in" v-if="nickName == null" href="/login">登录</a>
        <div class="user" v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
            <a class="avatar" href="/login"><img
              :src="avatar"
              alt="120"></a>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i class="fa fa-home" aria-hidden="true"></i>
                &nbsp;个人主页
              </el-dropdown-item>
              <el-dropdown-item>
                <i class="fa fa-cog" aria-hidden="true"></i>
                &nbsp;个人设置
              </el-dropdown-item>
              <el-dropdown-item>
                <a href="/login">
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                  &nbsp;退出登录
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </nav>

    <!--中间板块-->
    <div class="container">

    </div>
  </div>
</template>
<script>
  import global_ from './config.vue'
  import { getCookie } from '../../static/js/util.js'

  export default {
    name: 'hello',
    data () {
      return {
        nickName: '',
        avatar: '',
        isLike: false,
        opusId: this.$route.params.opusId,
        data: '',
        userInfo: '',
        loading: true
      }
    },
    mounted () {
      this.nickName = getCookie('nickName')
      this.avatar = getCookie('avatar')
      this.init()
    },
    methods: {
      init: function () {
        var url = global_.host + '/v1/as/opus/detail/' + this.opusId
        this.$http.get(url).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.loading = false
            this.data = data.body.data
            this.userInfo = this.data.userInfo
          } else {
            this.loading = false
            this.$notify.error({
              title: '错误',
              message: data.body.errorMsg
            })
          }
        }, function (response) {
          this.loading = false
          this.$notify.error({
            title: '糟糕',
            message: '服务器忙,请稍候重试'
          })
          console.info(response)
        })
      },
      like: function () {
        if (this.isLike) {
          this.$notify.info({
            title: '提示',
            message: '你已经赞过了'
          })
          return
        }
        this.isLike = true
      },
      share: function () {
        this.$notify.success({
          title: '提示',
          message: '分享功能暂未开放'
        })
      }
    }
  }

</script>

<style scoped>
  @import '../../static/css/buttons.css';
  @import "../../static/css/entry-77546c6f8c0324385f5b.css";
  @import "../../static/css/web-21eccb433ed09b492030.css";

</style>
