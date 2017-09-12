<template>
  <div class="editor">
    <top-bar></top-bar>

    <div style="margin-top: 60px;text-align: left;">
      <div class="title">

      </div>

      <el-row :gutter="1">
        <el-col :span="3" style="text-align: left">
          <el-row class="tac">
            <el-col :span="24">
              <!--<a style="margin-left: 20px" class="logo" href="/"><i-->
                <!--class="fa fa-home fa-2x"></i>&nbsp;Afflatus Street</a>-->
              <!--<br>-->
              <!--<br>-->
              <el-collapse value="2">
                <el-collapse-item name="1">
                  <template slot="title">
                    <i class="fa fa-book"></i>&nbsp;作品
                  </template>
                  <p style="color: #ea6f5a;cursor:pointer;width:100%; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">好的坏的，都是人生路上最好的经历</p>
                  <p style="cursor:pointer;width:100%; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">好的坏的，都是人生路上最好的经历</p>
                  <p style="cursor:pointer;width:100%; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">好的坏的，都是人生路上最好的经历</p>

                </el-collapse-item>

                <el-collapse-item name="2">
                  <template slot="title">
                    <i class="fa fa-pencil"></i>&nbsp;草稿箱
                  </template>
                  <p style="color: #ea6f5a;cursor:pointer;width:100%; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">好的坏的，都是人生路上最好的经历</p>
                  <p style="cursor:pointer;width:100%; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">好的坏的，都是人生路上最好的经历</p>
                  <p style="cursor:pointer;width:100%; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">好的坏的，都是人生路上最好的经历</p>

                </el-collapse-item>

                <el-collapse-item name="3">
                  <template slot="title">
                    <i class="fa fa-trash"></i>&nbsp;垃圾箱
                  </template>
                  <p style="color: #ea6f5a;cursor:pointer;width:100%; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">好的坏的，都是人生路上最好的经历</p>
                  <p style="cursor:pointer;width:100%; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">好的坏的，都是人生路上最好的经历</p>
                  <p style="cursor:pointer;width:100%; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">好的坏的，都是人生路上最好的经历</p>

                </el-collapse-item>
              </el-collapse>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="15">
          <div id="editorElem" ></div>
        </el-col>
        <el-col :span="5" style="margin-left: 10px">
          <el-form label-position="top" :model="opusInfo" style="margin-top: 10px">
            <el-form-item label="标题">
              <el-input v-model="opusInfo.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="标签">
              <el-select v-model="labelIdList" multiple placeholder="请选择标签">
                <el-option
                  v-for="item in labelInfoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否公开">
              <el-switch on-text="是" off-text="否" v-model="open"></el-switch>
            </el-form-item>
            <el-button type="primary" :disabled="clickSave" @click="saveOpus">立即发布</el-button>
          </el-form>
        </el-col>

      </el-row>

      <br>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import global_ from './config.vue'
  import { getCookie,getUrlKey } from '../../static/js/util.js'

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
        opusInfo: '',
        opusId:getUrlKey("opusId"),
        labelInfoList: [],
        labelIdList: [],
        editor:'',
      }
    },
    methods: {
      init: function () {
        var url = global_.host + '/v1/as/lable/all'
        this.$http.get(url).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.labelInfoList = data.body.data
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

        if (this.opusId == '' || this.opusId ==undefined){
          return;
        }
        var url = global_.host + '/v1/as/opus/detail/' + this.opusId
        this.$http.get(url, {credentials: true}).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.loading = false
            this.opusInfo = data.body.data
            this.editorContent = this.opusInfo.content
            var dataIntArr=[];//保存转换后的整型字符串
            this.opusInfo.labelList.split(",").forEach(function(data,index,arr){
              dataIntArr.push(+data);
            });
            this.labelIdList = dataIntArr;
            this.editor.txt.html( this.editorContent)
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
      getContent: function () {
        alert(this.editorContent)
      },
      saveOpus: function () {
        var _self = this
        if (this.opusInfo.title == '') {
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
        var params = {content: _self.editorContent, title: _self.title, labelList:this.labelIdList.join(",")}
        this.$http.post(url, params).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.$message({
              showClose: true,
              message: '发布成功',
              type: 'success'
            });
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
      this.editor = editor;
      this.init()
    }

  }
</script>

<style scoped>
  @import "../../static/css/bootstrap.min.css";
  @import '../../static/css/buttons.css';
  @import '../../static/css/topbar.css';

  nav .logo {
    float: left;
    height: 56px;
    padding: 7px 8px 8px;
  }

  a, body {
    color: #333;
    text-decoration: none;
    overflow-x: hidden;
  }

  .title {
    padding: 5px;
  }
</style>
