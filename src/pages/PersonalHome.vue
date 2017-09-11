<template>
  <div class="personal-home">
    <top-bar></top-bar>

    <!--中间板块-->
    <div class="container">
      <el-row :gutter="20" align="top " type="flex">
        <el-col :span="12" :offset="4">
          <div style="padding-bottom:140px;border-bottom: 1px solid #f0f0f0;">
            <img class="maincircular" :src=userInfo.avatar style="float: left"/>
            <div style="float:left;text-align: left;margin-left: 10px;display: inline-block">
              <div style="height: 30px;margin-top: 10px">{{userInfo.nickName}}</div>
              <div style="height: 30px"><i class="fa fa-book" aria-hidden="true"></i>&nbsp;作品&nbsp;{{userInfo.opusNum}}
                &nbsp;&nbsp;<i class="fa fa-heart" aria-hidden="true"></i>&nbsp;点赞&nbsp;{{userInfo.likeNum}}
              </div>
            </div>
            <!--<div style="display:inline-block; border: 1px red solid;">-->
            <i style="float: right;margin: 23px 10px 23px 20px;" class="fa fa-weibo fa-2x" aria-hidden="true"></i>
            <i style="float: right;margin: 23px 10px 23px 20px;" class="fa fa-weixin fa-2x" aria-hidden="true"></i>
          </div>

          <div class="clear"></div>
          <div v-for="content in contents">
            <el-row :gutter="20" align="middle " type="flex">
              <el-col :span="18" class="meta">
                <section class="content">
                  <div class="list-container">
                    <!-- 文章列表模块 -->
                    <ul class="note-list" infinite-scroll-url="/" v-loading="loading"
                        element-loading-text="拼命加载中">
                      <div class="opus-content">
                        <li class="have-img">
                          <div class="content">
                            <div class="author">
                              <a :href="'/personal?userId='+content.userId"><img class="circular"
                                                                          :src="userInfo.avatar"/></a>
                              <div class="name">
                                <a :href="'/personal?userId='+content.userId"><span> {{userInfo.nickName}}</span></a>
                                <span> {{content.updateTime}}</span>
                              </div>
                            </div>
                            <a class="title" :href='"/opus?opusId=" + content.id'>{{content.title}}</a>
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
              </el-col>
              <el-col :span="6" class="meta">
                <a class="wrap-img" :href='"/opus?opusId=" + content.id' v-if="content.coverUrl != ''">
                  <img class="img-blur-done" :src='content.coverUrl' />
                </a>
                <a class="wrap-img" :href='"/opus?opusId=" + content.id' v-if="content.coverUrl == ''">
                  <img class="img-blur-done" :src='userInfo.avatar'/>
                </a>
              </el-col>
            </el-row>

          </div>


        </el-col>
        <el-col :span="6" style="text-align: left;">

          <el-card class="box-card">
            <div class="text item">
              <p style="font-size: 14px">个人介绍</p>
              <p v-if="userInfo.personalIntroduction == null || userInfo.personalIntroduction == ''">
                暂无个人介绍
              </p>
              <p >{{userInfo.personalIntroduction}}</p>
            </div>
            <el-tag>读书</el-tag>
            <el-tag type="gray">生活家</el-tag>
            <el-tag type="primary">互联网</el-tag>
            <el-tag type="success">灵感街</el-tag>
            <!--<el-tag type="warning">人工智能</el-tag>-->
            <el-tag type="danger">旅行</el-tag>
          </el-card>

          <br>
          <el-alert title="千万不要天真的以为努力就能成功" type="success" :closable="false"></el-alert>
          <br>
          <el-alert title="为什么需要读书和旅行" type="info" :closable="false"></el-alert>
          <br>
          <el-alert title="人工智能、人工智能" type="warning" :closable="false"></el-alert>
        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script>
  import global_ from './config.vue'
  import { getCookie,getUrlKey } from '../../static/js/util.js'

  export default {
    name: 'hello',
    data () {
      return {
        nickName: '',
        avatar: '',
        isLike: false,
        userId: getUrlKey("userId"),
        data: '',
        userInfo: '',
        loading: true,
        contents: []
      }
    },
    mounted () {
      this.nickName = getCookie('nickName')
      this.avatar = getCookie('avatar')
      this.getUserInfo()
    },
    methods: {
      getUserInfo: function () {
        var url = global_.host + '/v1/uc/info/' + this.userId
        this.$http.get(url).then(function (data) {
          console.log(data)
          if (data.body.responseCode == 1000) {
            this.userInfo = data.body.data
            this.getOpusInfo()
          } else {
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
      getOpusInfo: function () {
        var url = global_.host + '/v1/as/opus/list/' + this.userId + '/page/1'
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
      },
    }
  }

</script>

<style scoped>
  @import '../../static/css/buttons.css';
  @import '../../static/css/topbar.css';

  .maincircular {
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
  }

  .container {
    margin-top: 80px;
  }

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
    /*width: 60%;*/
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

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .clear {
    clear: both;
  }


</style>
