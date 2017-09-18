<template>
  <div class="login">
    <!--top-->
    <top-bar></top-bar>

    <!--中间板块-->
    <div class="container">

      <el-row>
        <el-col :span="15" :offset="4" class="meta">
          <el-carousel height="300px">
            <el-carousel-item v-for="item in bannerImgUrls" :key="item">
              <img :src=item class="aaa"/>
            </el-carousel-item>
          </el-carousel>
          <!--<el-carousel :interval="4000" type="card" height="240px">-->
          <!--<el-carousel-item v-for="url in bannerImgUrls" :key="item">-->
          <!--<img :src=url />-->
          <!--</el-carousel-item>-->
          <!--</el-carousel>-->
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="11" :offset="4">
          <div v-for="content in contents">
            <el-row align="middle" type="flex">
              <el-col :span="16" class="meta">
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
                            <a
                              :href="'/personal?userId='+content.userId"><span> {{content.userInfo.nickName}}</span></a>
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
              <el-col :span="6" class="meta">
                <a class="wrap-img" :href='"/opus?opusId=" + content.id' v-if="content.coverUrl != ''">
                  <img class="img-blur-done" :src='content.coverUrl' @error="errorImg"/>
                </a>
                <a class="wrap-img" :href='"/opus?opusId=" + content.id' v-if="content.coverUrl == ''">
                  <img class="img-blur-done" :src='content.userInfo.avatar'/>
                </a>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col span="4" style="margin-top: 30px;" v-if="contents.length != 0">
          <el-col :span="24" class="label">
            <a class="label-banner"><img class="label-img"
                                         src="http://ov2efupn7.bkt.clouddn.com/banner-s-1-b8ff9ec59f72ea88ecc8c42956f41f78.png"/></a>
            <a class="label-banner"><img class="label-img"
                                         src="http://ov2efupn7.bkt.clouddn.com/banner-s-4-b70da70d679593510ac93a172dfbaeaa.png"/></a>
            <a class="label-banner"><img class="label-img"
                                         src="http://ov2efupn7.bkt.clouddn.com/banner-s-3-7123fd94750759acf7eca05b871e9d17.png"/></a>
            <div class="title" style="text-align: left;margin-top: 30px">
              <span style="color: #969696">推荐作者</span>
              <span style="float: right;color: #969696;"><i class="fa fa-refresh"></i>&nbsp;换一批</span>
            </div>
            <ul>
              <li style="float: left">
                <div style="height: 60px;border-bottom: 1px solid #f0f0f0;width: 100%">
                  <img class=" big-circular" src="http://ov2efupn7.bkt.clouddn.com/WechatIMG4.jpeg?imageView2/1/w/150/h/120"
                       style="float: left"/>
                  <div style="float:left;text-align: left;margin-left: 10px;display: inline-block">
                    <div style="height: 30px;margin-top: 0px">chenhao
                      <i class="fa fa-mars"></i>
                    </div>
                    <div style="font-size: 8px;display: inline-block">
                      302作品 2022点赞
                    </div>
                  </div>
                  <div style="float: right;">
                    <i class="fa fa-plus"></i>关注
                  </div>

                </div>
              </li>
            </ul>
          </el-col>
        </el-col>
      </el-row>

      <BackTop></BackTop>
    </div>

  </div>
</template>
<script>
  import global_ from './config.vue'
  import { getCookie } from '../../static/js/util.js'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'

  export default {
    components: {
      ElCol,
      ElRow
    },
    name: 'hello',
    data () {
      return {
        nickName: '',
        avatar: '',
        userId: '',
        msg: 'Welcome  Afflatus Street Home!',
        contents: [],
        bannerImgUrls: [
          'http://ov2efupn7.bkt.clouddn.com/default.jpg?imageView2/3/w/950/h/300/interlace/1',
          'http://ov2efupn7.bkt.clouddn.com/image_large_2x.jpg?imageView2/3/w/950/h/300/interlace/1',
          'http://ov2efupn7.bkt.clouddn.com/16875441_xl.jpg?imageView2/3/w/950/h/300/interlace/1',
          'http://ov2efupn7.bkt.clouddn.com/33963984465_6a9dcd84a3_k.jpg?imageView2/3/w/950/h/300/interlace/1',
          'http://ov2efupn7.bkt.clouddn.com/25596863_xl.jpg?imageView2/3/w/950/h/300/interlace/1'
        ],
        loading: true,
        item: '',
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
        var url = global_.host + '/v1/home/content/1'
        this.$http.get(url, {credentials: true}).then(function (data) {
          console.log(data)
          if (data.body.responseCode == 1000) {
            this.contents = data.body.data.rows
            console.log(this.contents)
            this.loading = false
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
  .big-circular{
    width: 50px;
    height: 50px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
  }

  .opus-content {
    text-align: left;
    /*margin-left: 5%;*/
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

  .label-img {
    margin-bottom: 20px;
  }


</style>
<style>
  .menu-discover {
    color: #47b755;
  }
</style>
