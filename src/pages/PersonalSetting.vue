<template>
  <div class="personal-setting">
    <!--top-->
    <top-bar></top-bar>

    <!--中间板块-->
    <div class="container">

      <el-row >
        <el-col :span="16" offset="1" style="text-align: left;margin-top: 40px">
          <el-form ref="form" :model="userInfo" label-width="150px">
            <el-form-item label="头像">
              <img :src=userInfo.avatar class="maincircular"/>
              <input id="avatarFile" type="file" style="display: none" @change="uploadAvatar"/>
              <el-button @click="clickUpload" type="primary">上传<i class="el-icon-upload2 el-icon--right"></i>
              </el-button>
              <el-progress style="width: 130px" :percentage="avatarUploadPercentage" :status="avatarUploadStatus"
                           v-if="avatarUploadPercentage > 0"></el-progress>
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
              <el-input v-model="userInfo.weiboUrl" placeholder="请输入微博主页地址"></el-input>
            </el-form-item>
            <el-form-item label="个人介绍">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 10}"
              placeholder="请输入内容"
              v-model="userInfo.personalIntroduction">
            </el-input>
            </el-form-item>
            <el-form-item label="微信二维码">
              <img class="wechatQrCode" :src=userInfo.wechatQrCodeUrl
                   v-if="userInfo.wechatQrCodeUrl != '' && userInfo.wechatQrCodeUrl !=undefined"/>
              <input id="wechatQrCodeFile" type="file" style="display: none" @change="uploadWechatQrCode"/>
              <el-button type="primary" @click="clickWechatQrCodeUpload">上传<i class="el-icon-upload2 el-icon--right" ></i></el-button>
              <el-progress style="width: 150px" :percentage="wechatQrCodeUploadPercentage"
                           :status="wechatQrCodeUploadStatus"
                           v-if="wechatQrCodeUploadPercentage > 0"></el-progress>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即修改</el-button>
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
  import { getCookie,setCookie } from '../../static/js/util.js'
  import ElUploadDrag from '../../node_modules/element-ui/packages/upload/src/upload-dragger.vue'
  import ElFormItem from '../../node_modules/element-ui/packages/form/src/form-item.vue'

  export default {
    components: {
      ElFormItem,
      ElUploadDrag},
    name: 'hello',
    data () {
      return {
        nickName: '',
        userId: '',
        data: '',
        userInfo: '',
        loading: true,
        status: '',
        avatarUploadPercentage: 0,
        avatarUploadStatus: '',
        wechatQrCodeUploadPercentage: 0,
        wechatQrCodeUploadStatus: '',
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
            this.avatar = this.userInfo.avatar
          } else if (data.body.responseCode == 1004) {
            this.userId = ''
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
      clickUpload: function () {
        $('#avatarFile').click()
      },
      clickWechatQrCodeUpload:function () {
        $('#wechatQrCodeFile').click()
      },
      uploadAvatar: function () {
        var iconTxtFile
        iconTxtFile = document.getElementById('avatarFile').files[0]
        if (iconTxtFile == '' || iconTxtFile == null || iconTxtFile == undefined) {
          return
        }
        if (iconTxtFile != null && iconTxtFile.size > 3 * 1024 * 1024) {
          this.$notify.info({
            title: '提示',
            message: '上传的图片不能超过3M'
          })
          return
        }
        this.avatarUploadPercentage = 10
        this.avatarUploadStatus = ''
        var _self = this
        var time = window.setInterval(function () {
          console.log(11111)
          if (_self.avatarUploadPercentage <= 80) {
            _self.avatarUploadPercentage = _self.avatarUploadPercentage + _self.getRandomNum(1, 8)
          } else if (_self.avatarUploadPercentage <= 97) {
            _self.avatarUploadPercentage = _self.avatarUploadPercentage + _self.getRandomNum(1, 2)
          } else {
            clearInterval(time)
          }
        }, 100)

        var formData = new FormData()
        formData.append('file', iconTxtFile)
        var url = global_.host + '/v1/common/upload/batch'
        this.$http.post(url, formData).then(function (data) {
          if (data.body.errno == 0) {
            this.avatarUploadPercentage = 100
            this.avatarUploadStatus = 'success'
            this.userInfo.avatar = data.body.data[0]
            window.setTimeout(function () {
              _self.avatarUploadPercentage = 0
            }, 3000)
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
      uploadWechatQrCode: function () {

        var iconTxtFile
        iconTxtFile = document.getElementById('wechatQrCodeFile').files[0]
        if (iconTxtFile == '' || iconTxtFile == null || iconTxtFile == undefined) {
          return
        }
        if (iconTxtFile != null && iconTxtFile.size > 3 * 1024 * 1024) {
          this.$notify.info({
            title: '提示',
            message: '上传的图片不能超过3M'
          })
          return
        }
        this.wechatQrCodeUploadPercentage = 10
        this.wechatQrCodeUploadStatus = ''
        var _self = this
        var time = window.setInterval(function () {
          console.log(11111)
          if (_self.wechatQrCodeUploadPercentage <= 80) {
            _self.wechatQrCodeUploadPercentage = _self.wechatQrCodeUploadPercentage + _self.getRandomNum(1, 8)
          } else if (_self.wechatQrCodeUploadPercentage <= 97) {
            _self.wechatQrCodeUploadPercentage = _self.wechatQrCodeUploadPercentage + _self.getRandomNum(1, 2)
          } else {
            clearInterval(time)
          }
        }, 100)

        var formData = new FormData()
        formData.append('file', iconTxtFile)
        var url = global_.host + '/v1/common/upload/batch'
        this.$http.post(url, formData).then(function (data) {
          if (data.body.errno == 0) {
            this.wechatQrCodeUploadPercentage = 100
            this.wechatQrCodeUploadStatus = 'success'
            this.userInfo.wechatQrCodeUrl = data.body.data[0]
            window.setTimeout(function () {
              _self.wechatQrCodeUploadPercentage = 0
            }, 3000)
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
      onSubmit: function () {
        var url = global_.host + '/v1/uc/update'
        var params = this.userInfo;
        this.$http.post(url, params).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.$message({
              showClose: true,
              message: '资料修改成功',
              type: 'success'
            });
            this.status='success'
            setCookie('avatar', this.userInfo.avatar, 7)
            setCookie('nickName', this.userInfo.nickName, 7)
            window.setTimeout(function () {
//              window.location.reload()
            },1500)
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
      getRandomNum (Min, Max) {
        var Range = Max - Min
        var Rand = Math.random()
        return (Min + Math.round(Rand * Range))
      }
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

  .wechatQrCode {
    width: 150px;
    height: 150px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
