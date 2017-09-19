<template>
  <div class="login">
    <!--top-->
    <top-bar></top-bar>

    <!--中间板块-->
    <div class="container">

      <div v-for="content in contents">
        <el-row align="middle " type="flex">
          <el-col :span="12" :offset="4" class="meta">
            <!-- 文章列表模块 -->
            <ul class="note-list" infinite-scroll-url="/" v-loading="loading"
                element-loading-text="拼命加载中">
              <div class="opus-content">
                <li class="have-img">
                  <div class="content">
                    <div class="author">
                      <a :href="'/personal?userId='+content.userId"><img class="circular"
                                                                         :src="content.userInfo.avatar"/></a>
                      <div class="name">
                        <a :href="'/personal?userId='+content.userId"><span> {{content.userInfo.nickName}}</span></a>
                        <span> {{content.updateTime}}</span>
                      </div>
                    </div>
                    <a class="title" :href='"/opus?opusId=" + content.id'>{{content.title}}</a>
                    <p class="summary">{{content.summary}}...</p>
                    <div style="color: #b4b4b4;font-size: 12px;">

                          <span v-for="labelInfo in content.labelInfoList">
                          <el-tag :type="labelInfo.styleType">{{labelInfo.name}}</el-tag>&nbsp;&nbsp;
                            </span>
                      <i class="fa fa-eye" aria-hidden="true"></i>&nbsp;{{content.readNum}}
                      &nbsp;&nbsp;<i class="fa fa-heart" aria-hidden="true"></i>&nbsp;{{content.likeNum}}
                    </div>
                  </div>
                </li>
              </div>
            </ul>
          </el-col>
          <el-col :span="3" class="meta">
            <a class="wrap-img" :href='"/opus?opusId=" + content.id' v-if="content.coverUrl != ''">
              <img class="img-blur-done" :src='content.coverUrl' @error="errorImg"/>
            </a>
            <a class="wrap-img" :href='"/opus?opusId=" + content.id' v-if="content.coverUrl == ''">
              <img class="img-blur-done" :src='content.userInfo.avatar'/>
            </a>
          </el-col>
        </el-row>
        <BackTop></BackTop>
      </div>
      <el-row align="middle " type="flex">
        <el-col :span="12" :offset="6" class="meta">
          <div v-if="noFollow">
            <img width="100px" style="margin-top: 100px"
                 src="http://cdn2.jianshu.io/assets/web/icon_nocontent-00c423de394b9184d467f2f2a7284b54.png"/>
            <div>当前还没有关注</div>
          </div>
        </el-col>
      </el-row>
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
          'http://ov2efupn7.bkt.clouddn.com/default.jpg?imageView2/3/w/930/h/300/interlace/1',
          'http://ov2efupn7.bkt.clouddn.com/image_large_2x.jpg?imageView2/3/w/930/h/300/interlace/1',
          'http://ov2efupn7.bkt.clouddn.com/16875441_xl.jpg?imageView2/3/w/930/h/300/interlace/1',
          'http://ov2efupn7.bkt.clouddn.com/33963984465_6a9dcd84a3_k.jpg?imageView2/3/w/930/h/300/interlace/1',
          'http://ov2efupn7.bkt.clouddn.com/25596863_xl.jpg?imageView2/3/w/930/h/300/interlace/1'
        ],
        loading: true,
        item: '',
        noFollow: false,
        errorImg: 'http://ov2efupn7.bkt.clouddn.com/default.jpg?imageView2/3/q/30'

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
        var url = global_.host + '/v1/as/follow/opus/list/1'
        this.$http.get(url, {credentials: true}).then(function (data) {
          console.log(data)
          if (data.body.responseCode == 1000) {
            this.loading = false
            this.contents = data.body.data.rows
            if (this.contents.length == 0) {
              this.noFollow = true
            }
            console.log(this.contents)

          } else if (data.body.responseCode == 1004) {
            window.location.href = 'login'
          } else {
            this.loading = false
            this.$message({
              showClose: true,
              message: data.body.errorMsg,
              type: 'error'
            })
          }
        }, function (response) {
          this.loading = false
          this.$message({
            showClose: true,
            message: '服务器忙,请稍候重试',
            type: 'error'
          })
          console.info(response)
        })
      },
      getAllLabel: function () {
        var url = global_.host + '/v1/as/label/all'
        this.$http.get(url).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.labelList = data.body.data
          } else {
            this.clickSave = false
            this.$notify.error({
              title: '错误',
              message: data.body.errorMsg
            })
          }
        }, function (response) {
          console.info(response)
          this.clickSave = false
          this.$notify.error({
            title: '糟糕',
            message: '服务器繁忙，请稍候重试'
          })
        })
      }

    }
  }

</script>

<style scoped>
  @import '../../static/css/buttons.css';
  @import '../../static/css/topbar.css';

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

  .login-home-jump-a {
    color: #ffffff;
    font-size: 24px;
    margin-top: 10px;
    margin-right: 20px;
  }

  .pull-left {
    float: left;
    margin-left: 10px;
  }

</style>
<style>
  .menu-follow {
    color: #47b755;
  }
</style>
