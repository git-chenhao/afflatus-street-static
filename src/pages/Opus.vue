<template>
  <div class="opus">
    <Header></Header>

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
                  <a :href="'/label?labelId='+item.id" target="_blank"> <el-tag
                    :type="item.styleType">{{item.name}}</el-tag></a>
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

      <el-row :gutter="20" v-if="data != ''">
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

      <!--主评论框 -->
      <el-row :gutter="20" v-if="data != ''">
        <el-col :span="10" :offset="7" class="meta meta-comment-write">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="写下你的评论..."
            v-model="commentBody"
            v-focus>
          </el-input>
          <div style="float: right;margin-top: 10px">
            <el-button type="text">取消</el-button>
            <el-button type="primary" @click="comment(-1,1)">发送</el-button>
          </div>
        </el-col>
        <el-col :span="10" :offset="7" class="meta meta-comment-total">
          {{commentCount}} 条评论
        </el-col>
      </el-row>

      <el-row v-if="noComment">
        <el-col :span="10" :offset="7">
          <img width="100px" style="margin-top: 0px"
               src="http://ov2efupn7.bkt.clouddn.com/icon_nocontent-00c423de394b9184d467f2f2a7284b54.png"/>
          <div>暂时还木有评论哦</div>
        </el-col>
      </el-row>
      <!--评论内容区域-->
      <el-row v-if="data != ''">
        <el-col :span="10" :offset="7" style="text-align: left">
          <div v-for="item in comments" class="comment">
            <div>
              <a :href="'/personal?userId='+item.userId"><img class="circular" :src="item.userInfo.avatar"/></a>
              <div class="name">
                <a :href="'/personal?userId='+item.userId"><span
                  style="font-size: 13px"> {{item.userInfo.nickName}}</span></a><br>
                <span style="font-size: 10px"><span style="color: #969696">{{item.floor}}楼</span><span
                  style="color: #969696"> {{item.createTime}}</span></span>
              </div>
              <div style="margin: 10px">
                {{item.commentBody}}
              </div>
              <div style="margin: 10px;color: #969696;font-size: 13px">

                <span v-else style="cursor: pointer"  @click="likeComment(item.id)" v-if="item.likeFlag == 1">
                  <i style="color: #ea6f5a" class="fa fa-thumbs-up"></i>&nbsp;{{item.likeCount}}人赞
                </span>
                <i class="fa fa-thumbs-o-up" @click="likeComment(item.id)" v-else>&nbsp;
                  <span v-if="item.likeCount !=0">{{item.likeCount}}人赞</span>
                  <span v-else>赞</span>
                </i>
                &nbsp;&nbsp;<i class="fa  fa-reply hover-black" @click="openChildCommentFrame(item.id)">&nbsp;回复</i>&nbsp;&nbsp;&nbsp;
                <Poptip
                  style="float: right"
                  v-if="item.userId == userId"
                  confirm
                  title="确认删除此评论？"
                  @on-ok="deleteComment(item.id)"
                  @on-cancel="cancel">
                  <i class="fa fa-trash hover-black">&nbsp;删除</i>
                </Poptip>
              </div>

              <!--子评论 -->
              <div style="margin-left: 20px;border-left: 2px solid #d9d9d9;padding-left: 10px">
                <div v-for="(chlidItem, index) in item.childCommentDto"
                     style="padding: 10px;border-bottom: 1px dashed #f0f0f0 ">
                  <div class="name">
                    <a :href="'/personal?userId='+chlidItem.userId"
                       style="color: #3194d0;font-size: 14px"><span> {{chlidItem.userInfo.nickName}} </span></a>
                    <span style="font-size: 14px">: {{chlidItem.commentBody}}</span>
                    <br>
                    <span
                      style="color: #969696;font-size: 13px;"> {{chlidItem.createTime}}&nbsp;&nbsp;&nbsp;
                    <i class="fa  fa-reply hover-black"
                       @click="openChildCommentFrame(item.id,'回复了 '+ chlidItem.userInfo.nickName +'：')">&nbsp;回复</i>&nbsp;&nbsp;&nbsp;
                  </span>
                  </div>
                  <Poptip
                    style="float: right;color: #969696;font-size: 13px;margin-top: 30px"
                    v-if="chlidItem.userId == userId"
                    confirm
                    title="确认删除此评论？"
                    @on-ok="deleteComment(chlidItem.id)"
                    @on-cancel="cancel">
                    <i class="fa fa-trash hover-black">&nbsp;删除</i>
                  </Poptip>
                </div>
                <div style="padding: 10px;color: #969696;font-size: 14px;"
                     v-if="item.childCommentDto !=null && item.childCommentDto.length != 0">
                  <i class="fa fa-pencil hover-black" @click="openChildCommentFrame(item.id)">&nbsp;添加新评论</i>
                </div>
              </div>

              <!--子评论框-->
              <div style="margin-left: 20px;border-left: 2px solid #d9d9d9;padding: 10px;" transiton="fade"
                   v-show="childCommentShowId==item.id">
                <el-input
                  :id="item.id"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 6}"
                  placeholder="写下你的评论..."
                  v-model="childCommentBody"
                  v-focus>
                </el-input>
                <div style="text-align: right;margin-top: 10px;">
                  <el-button type="text" @click="closeChildCommentFram">取消</el-button>
                  <el-button type="primary" @click="comment(item.id,2)">发送</el-button>
                </div>
              </div>
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
  import Header from './Header.vue'

  export default {
    components: {
      Header
    },
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
        commentBody: '',
        childCommentBody: '',
        comments: '',
        childCommentShowId: '',
        handleFocus: true,
        commentCount: 0,
        noComment: false,
      }
    },
    inserted: function (el) {
      // 聚焦元素
      el.focus()
    },
    mounted () {
      this.nickName = getCookie('nickName')
      this.avatar = getCookie('avatar')
      this.userId = getCookie('userId')
      this.init()
      this.getComments()
      console.log(window)
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
      },
      getComments: function () {
        var url = global_.host + '/v1/as/comment/list/opus/' + this.opusId + '/page/1'
        this.$http.get(url).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.comments = data.body.data.comments
            this.commentCount = data.body.data.commentCount
            if (this.commentCount == 0) {
              this.noComment = true
            }
          } else {
          }
        }, function (response) {
        })
      },
      comment: function (parentId, type) {
        var url = global_.host + '/v1/as/comment'
        var commentBody = type == 1 ? this.commentBody : this.childCommentBody
        if (commentBody == '' || commentBody == undefined || commentBody == null) {
          this.$message({
            showClose: true,
            message: '请输入评论内容',
            type: 'error'
          })
          return
        }
        var params = {opusId: this.opusId, parentId: parentId, commentBody: commentBody}
        this.$http.post(url, params).then(function (data) {
          if (data.body.responseCode == 1000) {
            if (type == 1) {
              this.$message({
                showClose: true,
                message: '评论成功',
                type: 'success'
              })
            }
            if (type == 1) {
              this.commentBody = ''
            } else {
              this.closeChildCommentFram()
            }
            this.getComments()
          } else if (data.body.responseCode == 1004) {
            window.location.href = '/login?jumpUrl=' + window.location.href.split(window.location.host)[1]
          } else {
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
        })
      },
      openChildCommentFrame: function (childCommentShowId, content) {
        if (content != '' && content != undefined && content != null) {
          this.childCommentBody = content
        } else {
          this.childCommentBody = ''
        }
        this.childCommentShowId = childCommentShowId
        this.$nextTick(function () {
          document.getElementById(childCommentShowId).getElementsByTagName('textarea')[0].focus()
        })
      },
      closeChildCommentFram: function () {
        this.childCommentShowId = ''
      },
      deleteComment: function (commentId) {
        var url = global_.host + '/v1/as/comment/delete/' + commentId
        this.$http.post(url).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this.getComments()
          } else {
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
      likeComment: function (commentId) {
        var url = global_.host + '/v1/as/comment/like/' + commentId
        this.$http.post(url).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.getComments()
          } else {
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
            message: '点赞失败,请稍候重试',
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
  @import "../../static/css/topbar.css";

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

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

  .hover-black:hover {
    color: #333333;
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

  .comment {
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 20px;
    padding-bottom: 16px;
  }

  .meta-content img {
    max-width: 100%;
  }

  .share {
    float: right;
  }

  .meta-comment-write {
    margin-top: 40px;
  }

  .meta-comment-total {
    margin-top: 10px;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 20px;
    word-wrap: break-word;
    word-break: break-all;
  }
</style>
