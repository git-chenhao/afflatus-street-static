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
                <i class="fa fa-cog" aria-hidden="true"></i>
                &nbsp;个人设置
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
      </div>
    </nav>
    <div class="title">
      <input class="title" placeholder="请输入标题" v-model="title"/>
      <br>
    </div>
    <div id="editorElem" style="text-align:left;"></div>
    <br>
    <div>
      <!--是否公开-->
      <!--<el-switch-->
      <!--v-model="open"-->
      <!--on-text=""-->
      <!--off-text="">-->
      <!--</el-switch>-->
      <a v-if="clickSave" @click="saveOpus"
         class="disabled button button-glow button-rounded button-raised button-primary">发布</a>
      <a v-else @click="saveOpus" class="button button-glow button-rounded button-raised button-primary">发布</a>

    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import global_ from './config.vue'
  import { getCookie } from '../../static/js/util.js'

  export default {
    name: 'editor',
    data () {
      return {
        editorContent: '',
        title: '',
        nickName: '',
        userId: '',
        avatar: '',
        open: true,
        clickSave: false,
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
      this.nickName = getCookie('nickName')
      this.avatar = getCookie('avatar')
      this.userId = getCookie('userId')
      editor.customConfig.withCredentials = true
      editor.customConfig.uploadFileName = 'file'
      editor.customConfig.uploadImgServer = global_.host + '/v1/common/upload/batch'
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
