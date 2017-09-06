<template>
  <div class="login">
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="width-limit">
        <!-- 左上方 Logo -->
        <a class="logo" href="/"><i class="fa fa-home fa-2x"></i>&nbsp;Afflatus Street</a>


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
            <a class="avatar" :href="'/personal/'+userId">
              <img :src="avatar" alt="120"></a>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <a href="/setting">
                  <i class="fa fa-cog" aria-hidden="true"></i>
                  &nbsp;个人设置
                </a>
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
        <!--<div class="container">-->
        <!--<div class="navbar-header">-->
        <!--<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu"-->
        <!--aria-expanded="false">-->
        <!--<span class="icon-bar"></span>-->
        <!--<span class="icon-bar"></span>-->
        <!--<span class="icon-bar"></span>-->
        <!--</button>-->
        <!--</div>-->
        <!--<div class="collapse navbar-collapse" id="menu">-->
        <!--<ul class="nav navbar-nav">-->
        <!--<li class="search">-->
        <!--<form target="_blank" action="" accept-charset="UTF-8" method="get"><input-->
        <!--name="utf8" type="hidden" value="✓">-->
        <!--<input type="text" name="q" id="q" value="" autocomplete="off" placeholder="搜索" class="search-input">-->
        <!--</form>-->
        <!--</li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--</div>-->
      </div>
    </nav>

    <!--中间板块-->
    <div class="container">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="url in bannerImgUrls" :key="item">
          <img :src=url />
          <!--<div style="width:465px;height:200px;background:url(http://ov2efupn7.bkt.clouddn.com/16875441_xl.jpg?imageView2/1/w/465/h/200);text-align: center">-->
          <!--<p>title</p>-->
          <!--</div>-->
        </el-carousel-item>
      </el-carousel>

      <!--<el-carousel height="300px" >-->
        <!--<el-carousel-item v-for="url in bannerImgUrls" :key="item">-->
          <!--<img :src=url />-->
        <!--</el-carousel-item>-->
      <!--</el-carousel>-->
      <section class="content">
        <div class="list-container">
          <!-- 文章列表模块 -->
          <ul class="note-list" infinite-scroll-url="/" v-loading="loading"
              element-loading-text="拼命加载中">
            <div class="opus-content" v-for="content in contents">
              <li class="have-img">
                <a class="wrap-img" :href='"/opus/" + content.id' v-if="content.coverUrl != ''">
                  <img class="img-blur-done" :src='content.coverUrl' alt="120">
                </a>
                <a class="wrap-img" :href='"/opus/" + content.id' v-if="content.coverUrl == ''">
                  <img class="img-blur-done" :src='content.userInfo.avatar' alt="120">
                </a>
                <div class="content">
                  <div class="author">
                    <a :href="'/personal/'+content.userId"><img class="circular" :src="content.userInfo.avatar"/></a>
                    <div class="name">
                      <a :href="'/personal/'+content.userId"><span> {{content.userInfo.nickName}}</span></a>
                      <span> {{content.updateTime}}</span>
                    </div>
                  </div>
                  <a class="title" :href='"/opus/" + content.id'>{{content.title}}</a>
                  <p class="summary">{{content.summary}}...</p>
                  <div style="color: #b4b4b4;font-size: 12px;">
                    <i class="fa fa-eye" aria-hidden="true"></i>&nbsp;{{content.readNum}}
                    &nbsp;&nbsp;<i class="fa fa-heart" aria-hidden="true"></i>&nbsp;{{content.likeNum}}
                  </div>
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
        userId: '',
        msg: 'Welcome  Afflatus Street Home!',
        contents: [],
        bannerImgUrls: [
          'http://ov2efupn7.bkt.clouddn.com/default.jpg?imageView2/1/w/930/h/300',
          'http://ov2efupn7.bkt.clouddn.com/image_large_2x.jpg?imageView2/1/w/930/h/300',
          'http://ov2efupn7.bkt.clouddn.com/16875441_xl.jpg?imageView2/1/w/930/h/300',
          'http://ov2efupn7.bkt.clouddn.com/33963984465_6a9dcd84a3_k.jpg?imageView2/1/w/930/h/300',
          'http://ov2efupn7.bkt.clouddn.com/25596863_xl.jpg?imageView2/1/w/930/h/300'
        ],
        loading: true,
        item: ''

      }
    },
    mounted () {
      this.nickName = getCookie('nickName')
      this.avatar = getCookie('avatar')
      this.userId = getCookie('userId')
      console.log(this.nickName)
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
            this.loading = false
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
      }

    }
  }

</script>

<style scoped>
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
    margin-left: 5%;
    width: 90%;
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

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
