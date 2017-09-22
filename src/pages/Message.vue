<template>
  <div class="message">
    <Header></Header>
    <div class="container">
      <el-row>
        <el-col :offset="4" :span="4">
          <ul class="left-menu-ul">
            <li :class="{active : activeId== 1}" @click="switchMeun(1)"><i class="fa  fa-reply">&nbsp;&nbsp;&nbsp;评论</i></li>
            <li :class="{active : activeId== 2}" @click="switchMeun(2)"><i class="fa fa-thumbs-up">&nbsp;&nbsp;&nbsp;点赞</i></li>
            <li :class="{active : activeId== 3}" @click="switchMeun(3)"><i class="fa fa-user-plus">&nbsp;&nbsp;&nbsp;关注</i></li>
            <li :class="{active : activeId== 4}" @click="switchMeun(4)"><i class="fa fa-money">&nbsp;&nbsp;&nbsp;赞赏</i></li>
            <li :class="{active : activeId== 5}" @click="switchMeun(5)"><i class="fa fa-bars">&nbsp;&nbsp;&nbsp;系统消息</i></li>
          </ul>
        </el-col>
        <el-col :span="12">
          <img width="100px" style="margin-top: 60px"
               src="http://ov2efupn7.bkt.clouddn.com/icon_nocontent-00c423de394b9184d467f2f2a7284b54.png"/>
          <div>这里还木有内容哦~</div>
        </el-col>
      </el-row>
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
    name: 'message',
    data () {
      return {
        nickName: '',
        avatar: '',
        userId: '',
        activeId: 1,
      }
    },
    mounted () {
      this.nickName = getCookie('nickName')
      this.avatar = getCookie('avatar')
      this.userId = getCookie('userId')
    },
    methods: {
      switchMeun: function (activeId) {
        this.activeId = activeId
      }
    }
  }

</script>

<style scoped>
  .left-menu-ul li {
    height: 50px;
    line-height: 50px;
    text-align: left;
    padding-left: 30px;
    cursor: pointer;
  }

  .left-menu-ul li:hover {
    background-color: #f0f0f0;
    border-radius: 4px;
  }

  .left-menu-ul .active {
    background-color: #f0f0f0;
    border-radius: 4px;
  }

</style>
<style>
  .menu-message {
    color: #47b755;
  }
  .menu-message:hover {
    color: #47b755 !important;
  }

</style>
