<template>
  <div class="personal-setting">
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="width-limit">
        <!-- 左上方 Logo -->
        <a class="logo" href="/"><i class="fa fa-home fa-3x"></i>&nbsp</a>

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
      </div>
    </nav>

    <!--中间板块-->
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="20" style="text-align: left;margin-top: 40px">
          <el-form ref="form" :model="userInfo" label-width="150px">
            <el-form-item label="头像">
              <img class="maincircular" :src=userInfo.avatar />
                <el-button type="primary">更改头像<i class="el-icon-upload2 el-icon--right" @click="document.getElementById('file').click();"></i>
                  <input id="file" type="file" style="display: none"/>
                </el-button>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="userInfo.mobile" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="userInfo.nickName"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="userInfo.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="微博主页">
              <el-input v-model="userInfo.weiboUrl"></el-input>
            </el-form-item>
            <el-form-item label="微信二维码">
              <img class="wechatQrCode" :src=userInfo.wechatQrCodeUrl />
              <el-button type="primary">修改<i class="el-icon-upload2 el-icon--right"></i></el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即修改</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8" style="text-align: left;">

        </el-col>
      </el-row>


    </div>
  </div>
</template>
<script>
  import global_ from './config.vue'
  import { getCookie } from '../../static/js/util.js'
  import ElUploadDrag from '../../node_modules/element-ui/packages/upload/src/upload-dragger.vue'

  export default {
    components: {ElUploadDrag},
    name: 'hello',
    data () {
      return {
        nickName: '',
        avatar: '',
        userId: '',
        data: '',
        userInfo: '',
        loading: true,
      }
    },
    mounted () {
      this.nickName = getCookie('nickName')
      this.avatar = getCookie('avatar')
      this.userId = getCookie('userId')
      this.getUserInfo()
    },
    methods: {
      getUserInfo: function () {
        var url = global_.host + '/v1/uc/info/' + this.userId
        this.$http.get(url).then(function (data) {
          console.log(data)
          if (data.body.responseCode == 1000) {
            this.userInfo = data.body.data
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
      uploadAvatar: function () {
        var iconTxtFile
        iconTxtFile = document.getElementById('file').files[0]
        var formData = new FormData()
        formData.append('file', iconTxtFile)
      },
      onSubmit: function () {

      }
    }
  }

</script>

<style scoped>
  @import '../../static/css/buttons.css';
  @import "../../static/css/entry-77546c6f8c0324385f5b.css";
  @import "../../static/css/web-21eccb433ed09b492030.css";

  .maincircular {
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
  }

  .wechatQrCode {
    width: 150px;
    height: 150px;
  }


</style>
