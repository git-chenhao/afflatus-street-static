<template>
  <div class="login">
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="width-limit">
        <!-- 左上方 Logo -->
        <a class="logo" href=""><i class="fa fa-ravelry fa-2x"></i> Afflatus Street</a>


        <!-- 右上角 -->
        <!-- 未登录显示登录/注册/写文章 -->
        <a class="btn write-btn" target="_blank" href="/editor">
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          写文章
        </a>
        <a class="btn sign-up" v-if="nickName == ''" href="/register">注册</a>
        <a class="btn log-in" v-if="nickName == ''" href="/login">登录</a>
        <div class="user">
          <div data-hover="dropdown">
            <a class="avatar" href=""><img
              :src="avatar"
              alt="120"></a>
          </div>
          <ul class="dropdown-menu">
            <li>
              <a href="/u/1817e5e604c0">
                <i class="iconfont ic-navigation-profile"></i><span>我的主页</span>
              </a></li>
            <li>
              <!-- TODO bookmarks_path -->
              <a href="/bookmarks">
                <i class="iconfont ic-navigation-mark"></i><span>收藏的文章</span>
              </a></li>
            <li>
              <a href="/users/1817e5e604c0/liked_notes">
                <i class="iconfont ic-navigation-like"></i><span>喜欢的文章</span>
              </a></li>
            <li>
              <a href="/wallet">
                <i class="iconfont ic-navigation-wallet"></i><span>我的钱包</span>
              </a></li>
            <li>
              <a href="/settings">
                <i class="iconfont ic-navigation-settings"></i><span>设置</span>
              </a></li>
            <li>
              <a href="/faqs">
                <i class="iconfont ic-navigation-feedback"></i><span>帮助与反馈</span>
              </a></li>
            <li>
              <a rel="nofollow" data-method="delete" href="/sign_out">
                <i class="iconfont ic-navigation-signout"></i><span>退出</span>
              </a></li>
          </ul>
        </div>


        <!-- 如果用户登录，显示下拉菜单 -->

        <!--<div class="style-mode"><a class="style-mode-btn"><i class="iconfont ic-navigation-mode"></i></a> <div class="popover-modal" style="left: 0px; display: none;"><div class="meta"><i class="iconfont ic-navigation-night"></i><span>夜间模式</span></div> <div class="switch day-night-group"><a class="switch-btn">开</a> <a class="switch-btn active">关</a></div> <hr> <div class="switch font-family-group"><a class="switch-btn font-song">宋体</a> <a class="switch-btn font-hei active">黑体</a></div> <div class="switch"><a class="switch-btn active">简</a> <a class="switch-btn">繁</a></div></div></div>-->
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu"
                    aria-expanded="false">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse" id="menu">
            <ul class="nav navbar-nav">
              <li class="active">
                <a href="">
                  <i class="fa fa-safari" aria-hidden="true"></i><span class="menu-text">&nbsp;首页</span>
                </a></li>
              <li class="search">
                <form target="_blank" action="" accept-charset="UTF-8" method="get"><input
                  name="utf8" type="hidden" value="✓">
                  <input type="text" name="q" id="q" value="" autocomplete="off" placeholder="搜索" class="search-input">
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <section class="content">
        <div class="list-container">
          <!-- 文章列表模块 -->
          <ul class="note-list" infinite-scroll-url="/">
            <div class="opus-content" v-for="content in contents">
              <li id="note-16377151" data-note-id="16377151" class="have-img">

                <a class="wrap-img" href="" target="_blank" v-if="content.coverUrl != ''">
                  <img class="img-blur-done" :src='content.coverUrl' alt="120">
                </a>
                <a class="wrap-img" href="" target="_blank" v-if="content.coverUrl == ''">
                  <img class="img-blur-done" :src='content.userInfo.avatar' alt="120">
                </a>
                <div class="content">
                  <div class="author">
                    <img class="circular" :src="content.userInfo.avatar"/>
                    <div class="name">
                      <span> {{content.userInfo.nickName}}</span>
                      <span> {{content.updateTime}}</span>
                    </div>
                  </div>
                  <a class="title">{{content.title}}</a>
                  <p class="summary">{{content.summary}}...</p>
                  <!--<i class="fa fa-eye" aria-hidden="true"></i>-->
                </div>
              </li>
            </div>
          </ul>
        </div>
      </section>
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
        msg: 'Welcome  Afflatus Street Home!',
        contents: [],
      }
    },
    mounted () {
      this.nickName = getCookie('nickName')
      this.avatar = getCookie('avatar')
      this.init()
    },
    methods: {
      init: function () {
        var url = global_.host + '/v1/home/content/1'
        this.$http.get(url).then(function (data) {
          console.log(data)
          if (data.body.responseCode == 1000) {
            this.contents = data.body.data.rows
            console.log(this.contents)
          } else {
            alert(data.body.errorMsg)
          }
        }, function (response) {
          this.responseCode = 9999
          this.errorMsg = '服务器忙,请稍候重试'
          console.info(response)
        })
      }

    }
  }



  // WEBPACK FOOTER //
  // ./javascripts/web/jquery_extensions/twitter-bootstrap-hover-dropdown.js
</script>

<style scoped>
  @import "../../static/css/search/normalize.css";
  @import "../../static/css/search/style.css";
  @import '../../static/css/buttons.css';
  @import "../../static/css/entry-77546c6f8c0324385f5b.css";
  @import "../../static/css/web-21eccb433ed09b492030.css";

  .circular {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
  }

  .opus-content {
    text-align: left;
    /*margin-left: 10%;*/
    width: 60%;
  }

  .content {
    font-size: 100%;
    padding: 1em 0;
  }

  .opus-content .name {
    display: inline-block;
    vertical-align: middle;
  }

  .author {
    margin-bottom: 14px;
    font-size: 13px;
  }

  .summary {
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
  }

  .title {
    margin: -7px 0 4px;
    display: inherit;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    color: #333333;
    font-family: -apple-system, SF UI Display, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
  }

  .list-container {
    margin-top: 40px;
  }

  .circular {
    width: 40px;
    height: 40px;
  }


</style>
