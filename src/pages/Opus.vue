<template>
  <div class="opus">
    <top-bar></top-bar>

    <!--中间板块-->
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="10" :offset="7" class="meta">
          <h1 class="title">{{data.title}}</h1>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="10" :offset="7" class="meta">
          <div class="author">
            <a :href="'/personal?userId='+data.userId"><img class="circular" :src="userInfo.avatar"/></a>
            <div class="meta">
              <a :href="'/personal?userId='+data.userId"><span> {{userInfo.nickName}}</span></a>
              <span style="color: #b4b4b4"> {{data.updateTime}}</span>
              <span style="color: #b4b4b4;font-size: 12px;">
                <i class="fa fa-eye" aria-hidden="true"></i>&nbsp;阅读&nbsp;{{data.readNum}}
                &nbsp;&nbsp;<i class="fa fa-heart" aria-hidden="true"></i>&nbsp;点赞&nbsp;{{data.likeNum}}
                <span v-for="item in data.labelInfoList">
                  <el-tag :type="item.styleType">{{item.name}}</el-tag>
                </span>
              </span>

            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" :offset="7" style="line-height: 32px" v-html="data.content" class="meta meta-content">
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-popover
          ref="popover"
          placement="left"
          width="200"
          trigger="click">
          <qr-code :text="location"></qr-code>
        </el-popover>
        <el-col :span="10" :offset="7" class="meta meta-like-share">
          <span class="like">
                <el-button :plain="!likeFlag" type="danger" @click="like"><i
                  class="fa fa-thumbs-up"></i>&nbsp;{{data.likeNum}}</el-button>
          </span>
          <span class="share">
             <el-button type="success" v-popover:popover>分享到微信 &nbsp;<i class="fa fa-weixin"></i></el-button>
            <el-button type="warning">分享到微博 &nbsp;<i class="fa fa-weibo"></i></el-button>
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" :offset="7" class="meta meta-comment-write">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="写下你的评论..."
            v-model="commentBody">
          </el-input>

          <div style="float: right;margin-top: 10px">
            <el-button type="text">取消</el-button>
            <el-button type="primary">发送</el-button>
          </div>
        </el-col>
        <el-col :span="10" :offset="7" class="meta meta-comment-total">
          100条评论
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="author">
            <a href="'/personal?userId=1'"><img class="circular" src="http://oam3t77qi.bkt.clouddn.com/8530902f4d6ae97a99bd34e04a4fe760?imageView2/1/w/150/h/120"/></a>
            <div class="name">
              <a href="'/personal?userId=1'"><span style="font-size: 12px"> hahha</span></a>
              <span style="color: #b4b4b4"> 09月19日 15:59</span>
            </div>

          </div>
        </el-col>
      </el-row>
      <BackTop></BackTop>
    </div>
  </div>
</template>
<script>
  import global_ from './config.vue'
  import { getCookie, getUrlKey } from '../../static/js/util.js'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button.vue'
  import ElRow from 'element-ui/packages/row/src/row'
  import ElCol from 'element-ui/packages/col/src/col'

  export default {
    components: {
      ElCol,
      ElRow,
      ElButton},
    name: 'hello',
    data () {
      return {
        location: window.location.href,
        nickName: '',
        avatar: '',
        likeFlag: false,
        opusId: getUrlKey('opusId'),
        data: '',
        userInfo: '',
        loading: true,
        userId: '',
        commentBody: ''
      }
    },
    mounted () {
      this.nickName = getCookie('nickName')
      this.avatar = getCookie('avatar')
      this.userId = getCookie('userId')
      this.init()
    },
    methods: {
      init: function () {
        console.log(this.$route.params)
        var url = global_.host + '/v1/as/opus/detail/' + this.opusId
        this.$http.get(url, {credentials: true}).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.loading = false
            this.data = data.body.data
            this.userInfo = this.data.userInfo
            this.likeFlag = this.data.likeFlag
            this.read()
          } else {
            this.$message({
              showClose: true,
              message: data.body.errorMsg,
              type: 'error'
            })
            window.setTimeout(function () {
              window.location.href = '/'
            }, 2000)
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
      like: function () {
        if (this.likeFlag) {
          return
        }

        var url = global_.host + '/v1/as/opus/like/' + this.opusId
        this.$http.post(url).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.likeFlag = true
            this.data.likeNum = this.data.likeNum + 1
          } else if (data.body.responseCode == 1004) {
            this.$message({
              showClose: true,
              message: data.body.errorMsg,
              type: 'info'
            })
          }
        }, function (response) {
          console.info(response)
        })
      },
      read: function () {
        var url = global_.host + '/v1/as/opus/read/' + this.opusId
        this.$http.post(url).then(function (data) {
          console.info(data)
        }, function (response) {
          console.info(response)
        })
      },
      share: function () {
        this.$message({
          showClose: true,
          message: '分享功能暂未开放',
          type: 'success'
        })
      }
    }
  }

</script>

<style scoped>
  @import '../../static/css/buttons.css';
  @import "../../static/css/topbar.css";

  body {
    font-size: 16px;
  }

  .circular {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
  }

  .name, info-icon, .meta {
    display: inline-block;
    vertical-align: middle;
  }

  .author {
    font-size: 13px;
  }

  .title {
    display: inherit;
    font-weight: 700;
    line-height: 1.5;
    color: #333333;
    font-family: -apple-system, SF UI Display, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
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

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  /* table 样式 */
  table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }

  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }

  table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }

  /* blockquote 样式 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }

  /* code 样式 */
  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }

  pre code {
    display: block;
  }

  .author {
    margin-bottom: 14px;
    font-size: 13px;
  }

  /* ul ol 样式 */
  ul, ol {
    margin: 10px 0 10px 20px;
  }

  .meta {
    text-align: left;
  }

  .meta span {
    margin-left: 5px;
  }

  .meta-content, meta-like-share {
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 20px;
    padding-bottom: 20px;
    word-wrap: break-word;
    word-break: break-all;
  }

  .meta-content img {
    max-width: 100%;
  }

  .share {
    float: right;
  }

  .meta-comment-write{
    margin-top: 40px;
  }

  .meta-comment-total {
    margin-top: 10px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 20px;
    padding-bottom: 20px;
    word-wrap: break-word;
    word-break: break-all;
  }
</style>
