<template>
  <div class="login">
    <Header></Header>

    <!--中间板块-->
    <div class="container">

      <el-row>
        <el-col :span="15" :offset="4" class="meta">
          <el-carousel height="300px">
            <el-carousel-item v-for="item in bannerImgUrls" :key="item">
              <img :src=item class="aaa"/>
            </el-carousel-item>
          </el-carousel>
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
                          <a :href="'/personal?userId='+content.userId" target="_blank"><img class="circular"
                                                                             :src="content.userInfo.avatar"/></a>
                          <div class="name">
                            <a :href="'/personal?userId='+content.userId" target="_blank"><span style="font-size: 12px"> {{content.userInfo.nickName}}</span></a>
                            <span style="color: #b4b4b4"> {{content.updateTime}}</span>
                          </div>
                        </div>
                        <a class="title" :href='"/opus?opusId=" + content.id' target="_blank">{{content.title}}</a>
                        <p class="summary">{{content.summary}}...</p>
                        <div style="color: #b4b4b4;font-size: 12px;">
                          <span v-for="label in content.labelInfoList">
                            <a :href="'/label?labelId='+label.id" target="_blank"><el-tag :type="label.styleType">{{label.name}}</el-tag>&nbsp;&nbsp;</a>
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
                <a class="wrap-img" :href='"/opus?opusId=" + content.id' target="_blank" v-if="content.coverUrl != ''">
                  <img class="img-blur-done" :src='content.coverUrl' @error="errorImg"/>
                </a>
                <a class="wrap-img" :href='"/opus?opusId=" + content.id' target="_blank" v-if="content.coverUrl == ''">
                  <img class="img-blur-done" :src='content.userInfo.avatar'/>
                </a>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col span="4" style="margin-top: 30px;" v-if="contents.length != 0">
          <el-col :span="24" class="label">
            <Card dis-hover>
              <p slot="title">热门标签</p>
              <div class="homepage-tag-div">
                 <span v-for="label in labelList">
                   <a :href="'/label?labelId='+label.id" target="_blank"> <el-tag :type="label.styleType">{{label.name}}</el-tag>&nbsp;&nbsp;</a>
                  </span>
              </div>
            </Card>
            <br>
            <a href="/hot?type=weekly" target="_blank"><Alert><i class="fa fa-star"></i>&nbsp;7日热门</Alert></a>
            <a href="/hot?type=monthly" target="_blank"><Alert type="success"><i class="fa fa-line-chart"></i>&nbsp;30日热门</Alert></a>
            <a href="/hot?type=new" target="_blank"><Alert type="warning"><i class="fa fa-paint-brush"></i>&nbsp;新上榜</Alert></a>
            <a href="/hot?type=like" target="_blank"><Alert type="error"><i class="fa fa-heart"></i>&nbsp;最受喜欢</Alert></a>
            <div v-if="recommendFollows.length > 0">
              <div class="title" style="text-align: left;margin-top: 30px">
                <span style="color: #969696;font-size: 16px">推荐作者</span>
                <span class="recommend-follow-change" @click="getRecommendFollows"><i class="fa fa-refresh"></i>&nbsp;换一批</span>
              </div>
              <ul style="margin-top: 10px" v-for="item in recommendFollows">
                <li style="float: left;width: 100%;margin-top: 5px">
                  <div style="height: 60px;border-bottom: 1px solid #f0f0f0;width: 100%">
                    <a :href="'/personal?userId='+item.userId">
                      <img class=" big-circular"
                           :src=item.avatar
                           style="float: left"/>
                    </a>
                    <div style="float:left;text-align: left;margin-left: 10px;display: inline-block;height: 55px">
                      <a :href="'/personal?userId='+item.userId">
                        <div style="height: 20px;margin-top: 0px;font-size: 1px">{{item.nickName}}
                          <i class="fa fa-mars"></i>
                        </div>
                      </a>
                      <div style="font-size: 5px;display: inline-block">
                        {{item.opusNum}}作品 {{item.likeNum}}点赞
                      </div>
                    </div>

                    <div v-if="followList.indexOf(item.userId) != -1"
                         style="float: right;color: #969696;height: 60px;line-height:50px;cursor: pointer"
                         @click="follow(item.userId)">
                      <i class="fa fa-check"></i>已关注
                    </div>
                    <div v-else style="float: right;color: #47b755;height: 60px;line-height:50px;cursor: pointer"
                         @click="follow(item.userId)">
                      <i class="fa fa-plus"></i>关注
                    </div>
                  </div>
                </li>
              </ul>
            </div>
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
  import Header from './Header.vue'
  export default {
    components: {
      Header
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
          'http://ov2efupn7.bkt.clouddn.com/25596863_xl.jpg?imageView2/1/w/950/h/350/interlace/1',
          'http://ov2efupn7.bkt.clouddn.com/image_large_2x.jpg?imageView2/1/w/950/h/350/interlace/1',
          'http://ov2efupn7.bkt.clouddn.com/51332686_xl.jpg?imageView2/1/w/950/h/350/interlace/1',
          'http://ov2efupn7.bkt.clouddn.com/33963984465_6a9dcd84a3_k.jpg?imageView2/1/w/950/h/350/interlace/1',
          'http://ov2efupn7.bkt.clouddn.com/default.jpg?imageView2/1/w/950/h/350/interlace/1',
        ],
        loading: true,
        item: '',
        errorImg: 'http://ov2efupn7.bkt.clouddn.com/default.jpg?imageView2/3/q/30',
        recommendFollows: [],
        followList: [],
        labelList: []
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
        this.getRecommendFollows()
        this.getAllLabel()
      },
      getRecommendFollows: function () {
        var url = global_.host + '/v1/as/follow/recommend'
        this.$http.get(url, {credentials: true}).then(function (data) {
          console.log(data)
          if (data.body.responseCode == 1000) {
            this.recommendFollows = data.body.data
          } else {
//            this.loading = false
//            this.$message({
//              showClose: true,
//              message: data.body.errorMsg,
//              type: 'error'
//            })
          }
        }, function (response) {
          console.info(response)
        })
      },
      follow: function (userId) {
        var url = global_.host + '/v1/as/follow/' + userId
        this.$http.post(url).then(function (data) {
          console.log(data)
          if (data.body.responseCode == 1000) {
            if (this.followList.indexOf(userId) != -1) {
              for (var i = 0; i < this.followList.length; i++) {
                if (this.followList[i] == userId) {
                  this.followList.splice(i, 1)
                  break
                }
              }
            } else {
              this.followList.push(userId)
            }
          } else {
            this.$message({
              showClose: true,
              message: data.body.errorMsg,
              type: 'error'
            })
          }
        }, function (response) {
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
            this.$message({
              showClose: true,
              message: data.body.errorMsg,
              type: 'error'
            })
          }
        }, function (response) {
          console.info(response)
          this.clickSave = false
          this.$message({
            showClose: true,
            message: '服务器忙,请稍候重试',
            type: 'error'
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

  .big-circular {
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
  .name{
    font-size: 12px;
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

  .homepage-tag-div span {
    margin-top: 5px;
  }

  .recommend-follow-change:hover {
    color: #777777;

  }

  .recommend-follow-change {
    font-size: 16px;
    float: right;
    color: #969696;
    cursor: pointer
  }

  .ivu-alert {
    cursor: pointer
  }


</style>
<style>
  .menu-discover {
    color: #47b755;
  }
</style>
