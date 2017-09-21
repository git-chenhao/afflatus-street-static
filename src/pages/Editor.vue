<template>
  <div class="editor">
    <top-bar></top-bar>

    <div style="margin-top: 60px;text-align: left;">
      <div class="title">

      </div>

      <el-row :gutter="1">
        <el-col :span="4" style="text-align: left">
          <el-row class="tac">
            <el-col :span="24">
              <!--<a style="margin-left: 20px" class="logo" href="/"><i-->
              <!--class="fa fa-home fa-2x"></i>&nbsp;Afflatus Street</a>-->
              <!--<br>-->
              <!--<br>-->
              <el-collapse v-model="collapseValue" accordion>
                <el-collapse-item name="1">
                  <template slot="title">
                    <i class="fa fa-pencil"></i>&nbsp;草稿箱
                  </template>
                  <div style="max-height:400px;overflow-y:auto;">
                    <p v-if="opusListInDraft.length == 0" style="color:#7f868e;">
                      <i class="fa fa-inbox"></i>&nbsp;当前无数据
                    </p>
                    <span v-for="item in opusListInDraft">
                    <span v-if="item.id == opusId">
                    <p @click="switchOpus(item.id,false)" class="nav-title nav-title-select">
                      <i class="fa fa-trash" @click="saveOpus(-1,'成功移至垃圾箱')"></i>
                      &nbsp;{{item.title}}
                    </p>
                    </span>
                    <span v-else>
                    <p @click="switchOpus(item.id,false)" class="nav-title">
                      <i class="fa fa-bookmark" ></i> &nbsp;{{item.title}}
                    </p>
                    </span>
                    </span>
                  </div>
                </el-collapse-item>

                <el-collapse-item name="2">
                  <template slot="title">
                    <i class="fa fa-trash"></i>&nbsp;垃圾箱
                  </template>
                  <p v-if="opusListInDustbin.length == 0" style="color:#7f868e;">
                    <i class="fa fa-inbox"></i>&nbsp;当前无数据
                  </p>
                  <div style="max-height:400px;overflow-y:auto;">
                  <span v-for="item in opusListInDustbin">
                    <span v-if="item.id == opusId">
                    <p @click="switchOpus(item.id,true)" class="nav-title nav-title-select">
                      <i class="fa fa-trash" @click="deleteOpus"></i>
                      &nbsp;{{item.title}}
                    </p>
                    </span>
                    <span v-else>
                    <p @click="switchOpus(item.id,true)" class="nav-title" >
                      <i class="fa fa-bookmark"></i> &nbsp;{{item.title}}
                    </p>
                    </span>

                    </span>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="15">
          <el-input placeholder="请输入标题" v-model="title" style="margin-bottom: 5px" value="">
            <template slot="prepend">标题</template>
          </el-input>
          <div id="editorElem"></div>
        </el-col>
        <el-col :span="4" style="margin-left: 10px">

          <el-form label-position="top" :model="opusInfo" style="margin-top: 10px" v-if="!dustbin">
            <el-form-item>
              <el-button type="primary" @click="clearContent"><i class="fa fa-pencil-square-o"></i>&nbsp;新建</el-button>
              <el-button type="danger" @click="saveOpus(-1,'成功移至垃圾箱')"><i class="fa fa-trash"></i>&nbsp;删除</el-button>
            </el-form-item>
            <!--<el-form-item label="标题">-->
            <!--<el-input v-model="title" placeholder="请输入标题" value="无标题"></el-input>-->
            <!--</el-form-item>-->
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
            <el-form-item>
              <el-button :disabled="clickSave" @click="saveOpus(1,'保存成功')"><i class="fa  fa-floppy-o"></i>&nbsp;保存
              </el-button>
              <el-button type="primary" :disabled="clickSave" @click="saveOpus(3,'发布成功')"><i
                class="fa  fa-cloud-upload"></i>&nbsp;发布
              </el-button>
            </el-form-item>
          </el-form>
          <el-form v-else style="margin-top: 10px">
            <el-form-item>
              <el-button type="primary" @click="rollback">
                <i class="fa fa-reply-all">&nbsp;恢复</i>
              </el-button>
              <el-button type="danger" @click="deleteOpus">
                <i class="fa fa-trash">&nbsp;删除</i>
              </el-button>
            </el-form-item>
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
  import { getCookie, getUrlKey } from '../../static/js/util.js'

  export default {
    components: {
    },
    name: 'editor',
    data () {
      return {
        editorContent: '',
        title: '无标题文章',
        nickName: '',
        userId: '',
        avatar: '',
        open: true,
        clickSave: false,
        opusInfo: '',
        opusId: getUrlKey('opusId'),
        labelInfoList: [],
        labelIdList: [],
        editor: '',
        opusListInDraft: '',
        opusListInDustbin: '',
        saveTimer: '',
        dustbin: false,
        collapseValue: '1'
      }
    },
    methods: {
      init: function () {
        var url = global_.host + '/v1/as/label/all'
        this.$http.get(url).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.labelInfoList = data.body.data
          } else {
//            this.clickSave = false
//            this.$notify.error({
//              title: '错误',
//              message: data.body.errorMsg
//            })
          }
        }, function (response) {
          console.info(response)
//          this.clickSave = false
//          this.$notify.error({
//            title: '糟糕',
//            message: '服务器繁忙，请稍候重试'
//          })
        })

        //拉取垃圾箱、草稿数据
        this.getOpusList(-1)
        this.getOpusList(1)

        this.timingSave()

        if (this.opusId == '' || this.opusId == undefined) {
          return
        }
        this.loadingOpusInfo()
      },
      switchOpus: function (opusId, dustbin) {
        this.dustbin = dustbin
        this.opusId = opusId
        this.loadingOpusInfo()
        history.pushState(null, '', '/editor?opusId=' + opusId)
      },
      loadingOpusInfo: function () {
        var url = global_.host + '/v1/as/opus/detail/' + this.opusId
        this.$http.get(url, {credentials: true}).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.loading = false
            this.opusInfo = data.body.data
            this.title = this.opusInfo.title
            this.editorContent = this.opusInfo.content
            if (this.opusInfo.labelList != '' && this.opusInfo.labelList != null) {
              var dataIntArr = []//保存转换后的整型字符串
              this.opusInfo.labelList.split(',').forEach(function (data, index, arr) {
                dataIntArr.push(+data)
              })
              this.labelIdList = dataIntArr
            } else {
              this.labelIdList = []
            }
            this.editor.txt.html(this.editorContent)
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
      timingSave: function () {
        //10s保存一次
        var _self = this
        this.saveTimer = window.setInterval(function () {
          if (_self.editorContent == '' || _self.editorContent == undefined || _self.editorContent == null || _self.dustbin) {
            return
          }
          _self.saveOpus(1, null)
        }, 30000)
      },
      getOpusList: function (state) {
        var url = global_.host + '/v1/as/opus/list/state/' + state + '/page/1'
        this.$http.get(url).then(function (data) {
          console.log(data)
          if (data.body.responseCode == 1000) {
            if (state == -1) {
              this.opusListInDustbin = data.body.data.rows
            } else if (state == 1) {
              this.opusListInDraft = data.body.data.rows
              if (this.opusListInDraft.length > 0) {
                this.opusId = this.opusListInDraft[0].id
                this.loadingOpusInfo()
                history.pushState(null, '', '/editor?opusId=' + this.opusId)
              }
            }

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
      },
      saveOpus: function (state, notifyMessage) {
        /**
         * 只验证发布状态
         */
        if (state == 3) {
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
          if (this.labelIdList.length == 0) {
            this.$notify.error({
              title: '错误',
              message: '请选择标签'
            })
            return
          }
          if (this.labelIdList.length > 2) {
            this.$notify.error({
              title: '错误',
              message: '最多只能选择2个标签'
            })
            return
          }
        }

        var url = global_.host + '/v1/as/opus/save'
        var params = {
          content: this.editorContent,
          title: this.title,
          labelList: this.labelIdList,
          id: this.opusId,
          state: state
        }
        this.$http.post(url, params).then(function (data) {
          if (data.body.responseCode == 1000) {

            if (notifyMessage != null && notifyMessage != '') {
              this.$message({
                showClose: true,
                message: notifyMessage,
                type: 'success'
              })
            }
            if (state == 3 || state == -1 || state == -2) {
              this.clearContent()
            }
            if (state == 1) {
              this.opusId = data.body.data
            }
            if (state != -2){
              this.getOpusList(1)
            }
            this.getOpusList(-1)
          } else {
            this.clickSave = false
            if (state == 3) {
              this.$message({
                showClose: true,
                message: data.body.errorMsg,
                type: 'error'
              })
            }
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
      },
      clearContent: function () {
        this.opusId = ''
        this.title = ''
        this.opusInfo = ''
        this.labelIdList = []
        this.editor.txt.html('')
        this.editorContent = ''
        history.pushState(null, '', '/editor')
      },
      deleteOpus: function () {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.saveOpus(-2, '删除成功')
        }).catch(() => {
        })
      },
      rollback: function () {
        this.collapseValue = '1'
        this.dustbin = false
        this.loadingOpusInfo()
        this.saveOpus(1, '成功移至草稿箱')
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
      this.editor = editor
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

  .nav-title {
    cursor: pointer;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nav-title-select {
    color: #47b755;
  }
</style>
