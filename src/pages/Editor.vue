<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="width-limit">
        <!-- 左上方 Logo -->
        <a class="logo" href=""><i class="fa fa-home fa-2x"></i> Afflatus Street</a>

        <!-- 右上角 -->
        <!-- 未登录显示登录/注册/写文章 -->
        <a class="btn write-btn" target="_blank" href="/editor">
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
    <div id="editorElem" style="text-align:left"></div>
    <br>
    <a v-on:click="getContent" class="button button-primary button-pill button-giant">存草稿</a>
    <a @click="saveOpus" class="button button-royal button-pill button-giant">发布</a>
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
        title:'',
        responseCode: 1000,
        errorMsg: ''
      }
    },
    methods: {
      getContent: function () {
        alert(this.editorContent)
      },
      saveOpus:function () {
        var _self = this
        if (this.title == '') {
          alert("标题不能为空")
          return
        }
        if (this.editorContent == '') {
          alert("内容不能为空")
          return
        }
        var url = global_.host + '/v1/as/opus/save'
        var params = {content: _self.editorContent, title: _self.title}
        console.log(params)
        this.$http.post(url, params).then(function (data) {
          if (data.body.responseCode == 1000) {
            _self.$router.push('/home')
          } else {
            console.log(data)
            this.responseCode = data.body.responseCode
            this.errorMsg = data.body.errorMsg
            alert(this.errorMsg)
          }
        }, function (response) {
          console.info(response)
          this.responseCode = 9999
          this.errorMsg = '服务器忙,请稍候重试'
          alert(this.errorMsg)
        })
      }
    },
    mounted () {
      var editor = new E('#editorElem')
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
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
    width: 100%;
    height: 50px;
    margin-left: 5px;
    background: none;
    border: none;
  }
</style>
