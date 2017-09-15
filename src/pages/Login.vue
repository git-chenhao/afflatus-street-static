<template>
  <div class="login">
    <!--<div style="text-align: left">-->
      <!--<router-link to="/register">-->
          <!--<span class="input">-->
            <!--<a style="float: left" class="login-register-jump-a">Afflatus Street</a>-->
          <!--</span>-->
      <!--</router-link>-->
    <!--</div>-->
    <div style="text-align: right">
      <a class="pull-left login-home-jump-a" href="/"><i class="fa fa-home fa-2x "></i>Home</a>
      <router-link to="/register">
        <span class="input">
            <a class="pull-right login-register-jump-a">No Account,To Register!</a>
          </span>
      </router-link>
    </div>
    <br>
    <div class="container" v-if="!loginSuccess">
      <section class="content">
        <h1>{{ msg }}</h1>
        <br>
        <!-- for disable autocomplete on chrome -->

        <form autocomplete="off">
        <span class="input input--hideo">
					<input class="input__field input__field--hideo" disableautocomplete type="text" id="input-41" autocomplete="off" v-model="mobile" placeholder="手机号码"/>
					<label class="input__label input__label--hideo" for="input-41">
						<i class="fa fa-fw fa-mobile icon icon--hideo"></i>
						<span class="input__label-content input__label-content--hideo"></span>
					</label>
				</span><br><br>

        <input type="hidden">
        <span class="input input--hideo">
					<input class="input__field input__field--hideo"  disableautocomplete type="password" id="input-43" v-model="password" placeholder="密码"/>
					<label class="input__label input__label--hideo" for="input-43">
						<i class="fa fa-fw fa-lock icon icon--hideo"></i>
						<span class="input__label-content input__label-content--hideo">Password</span>
					</label>
				</span><br>
        <span class="input input--minoru span-login">
          <a @click="login" class="button button-primary button-pill button-giant">
            Login
          </a>
        </span>
        </form>
      </section>

      <!--<section class="content">-->
        <!--<h1>{{ msg }}</h1>-->
        <!--<span class="input input&#45;&#45;minoru">-->
					<!--<label class="input__label input__label&#45;&#45;minoru" for="mobile">-->
						<!--<span class="input__label-content input__label-content&#45;&#45;minoru">Your phone number</span>-->
					<!--</label>-->
          <!--<input class="input__field input__field&#45;&#45;minoru" id="mobile" v-model="mobile" @keyup.13="login()"/>-->
				<!--</span>-->
        <!--<br>-->
        <!--<span class="input input&#45;&#45;minoru">-->
					<!--<label class="input__label input__label&#45;&#45;minoru" for="password">-->
						<!--<span class="input__label-content input__label-content&#45;&#45;minoru">Your password</span>-->
					<!--</label>-->
					<!--<input class="input__field input__field&#45;&#45;minoru" id="password" type="password" v-model="password"-->
                 <!--@keyup.13="login()"/>-->
				<!--</span>-->

        <!--<br>-->
        <!--<span class="input input&#45;&#45;minoru span-login">-->
          <!--<a @click="login" class="button button-primary button-pill button-giant">-->
            <!--Login-->
          <!--</a>-->
        <!--</span>-->
      <!--</section>-->
    </div>

  </div>
</template>
<script>
  import global_ from './config.vue'
  import { setCookie } from '../../static/js/util.js'
  import Cookies from 'js-cookie'

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome To Afflatus Street',
        mobile: '',
        password: '',
        clickLogin: false,
        responseCode: 1000,
        errorMsg: '',
        loginSuccess: false,
        loading: false
      }
    },
    methods: {
      login: function () {
        this.clickLogin = true
        var _self = this
        if (this.mobile == '') {
          this.$message({
            showClose: true,
            message: '手机号不能为空',
            type: 'error'
          });
          return
        }
        if (this.password == '') {
          this.$message({
            showClose: true,
            message: '密码不能为空',
            type: 'error'
          });
          return
        }
        var url = global_.host + '/v1/uc/login'
        var params = {mobile: _self.mobile, password: _self.password}
        this.$http.post(url, params).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.$message({
              showClose: true,
              message: '登录成功,正在跳转',
              type: 'success'
            });
            console.log(data)
            var mydata = data.body.data
            setCookie('SESSION', mydata.sessionId, 7)
            setCookie('nickName', mydata.nickName, 7)
            setCookie('userId', mydata.userId, 7)
            setCookie('avatar', mydata.avatar, 7)

            window.location.href = '/home'
          } else {
            this.$message({
              showClose: true,
              message: data.body.errorMsg,
              type: 'error'
            });
          }
        }, function (response) {
          console.info(response)
          this.$message({
            showClose: true,
            message: '服务器繁忙,请稍候重试',
            type: 'error'
          });
        })
      }
    }
  }
</script>

<style scoped>

  @import '/static/css/normalize.css';
  @import '/static/css/demo.css';
  @import '/static/css/component.css';
  @import '/static/css/buttons.css';
  @import '/static/css/style.css';

  a.brand svg {
    fill: #00495f;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  .content {
    padding: 4em 0;
  }

  .span-login {
    margin-top: 20px;
  }


  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    -webkit-text-fill-color: #333;
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
  }

</style>
