<template>
  <div class="editor">
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="width-limit">
        <!-- 左上方 Logo -->
        <a class="logo" href="/"><i class="fa fa-home fa-2x"></i>&nbsp;首页</a>

        <!-- 右上角 -->
        <!-- 未登录显示登录/注册/写文章 -->
        <a class="btn write-btn" href="/home">
          <i class="fa fa-home" aria-hidden="true"></i>
          回首页
        </a>
        <a class="btn log-in" href="/">陈浩</a>

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
        </div>
      </div>
    </nav>
    <div class="title">
      <input class="title" placeholder="请输入标题" v-model="title"/>
      <br>
    </div>
    <div id="editorElem" style="text-align:left;" ></div>
    <br>
    <div>
      <!--是否公开-->
      <!--<el-switch-->
        <!--v-model="open"-->
        <!--on-text=""-->
        <!--off-text="">-->
      <!--</el-switch>-->
      <a v-if="clickSave" @click="saveOpus" class="disabled button button-glow button-rounded button-raised button-primary">发布</a>
      <a v-else @click="saveOpus" class="button button-glow button-rounded button-raised button-primary">发布</a>

    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import global_ from './config.vue'

  export default {
    name: 'editor',
    data () {
      return {
        editorContent: '',
        title: '',
        open: true,
        clickSave:false,
        errorMsg: ''
      }
    },
    methods: {
      getContent: function () {
        alert(this.editorContent)
      },
      saveOpus: function () {
        var _self = this
        if (this.title == '') {
          this.$notify.error({
            title: '错误',
            message: '标题不能为空'
          })
          return
        }
        if (this.editorContent == '') {
          this.$notify.error({
            title: '错误',
            message: '内容不能为空'
          })
          return
        }
        this.clickSave = true
        var url = global_.host + '/v1/as/opus/save'
        var params = {content: _self.editorContent, title: _self.title}
        this.$http.post(url, params).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.$notify.success({
              title: '成功',
              message: '发布成功，正在前往首页'
            })
            window.setTimeout(function () {
              _self.$router.push('/')
            }, 2000)

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
    },
    mounted () {
      var editor = new E('#editorElem')
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.customConfig.withCredentials = true
      editor.customConfig.uploadFileName = 'file'
      editor.customConfig.uploadImgServer =global_.host + '/v1/common/upload/batch'
      editor.create()
    }
  }
</script>

<style scoped>
  @import "../../static/css/bootstrap.min.css";
  @import "../../static/css/entry-77546c6f8c0324385f5b.css";
  @import "../../static/css/web-21eccb433ed09b492030.css";
  @import '../../static/css/buttons.css';

  .title {
    width: 98%;
    height: 50px;
    margin-left: 5px;
    background: none;
    border: none;
  }
</style>
