<template>
  <div class="login">
    <div style="text-align: right">
      <a class="pull-left login-home-jump-a" href="/"><i class="fa fa-home fa-2x "></i>Home</a>
      <router-link to="/login">
          <span class="input">
          <a class="pull-right login-register-jump-a">I Have Account,To Login!</a>
          </span>
      </router-link>
    </div>
    <div class="container">

      <!--<section class="content">-->
        <!--<h1>{{ msg }}</h1>-->
        <!--<span class="input input&#45;&#45;minoru">-->
					<!--<label class="input__label input__label&#45;&#45;minoru" for="mobile">-->
						<!--<span class="input__label-content input__label-content&#45;&#45;minoru">Your phone number</span>-->
					<!--</label>-->
					<!--<input class="input__field input__field&#45;&#45;minoru" id="mobile" v-model="mobile" style="font-size: 100%"/>-->
				<!--</span>-->
        <!--<br>-->
        <!--<span class="input input&#45;&#45;minoru">-->
					<!--<label class="input__label input__label&#45;&#45;minoru" for="password">-->
						<!--<span class="input__label-content input__label-content&#45;&#45;minoru">Your password</span>-->
					<!--</label>-->
					<!--<input type="password" class="input__field input__field&#45;&#45;minoru" id="password" v-model="password"/>-->
				<!--</span>-->

        <!--<br>-->
        <!--<span class="input input&#45;&#45;minoru">-->
					<!--<label class="input__label input__label&#45;&#45;minoru" for="nickName">-->
						<!--<span class="input__label-content input__label-content&#45;&#45;minoru">Your Captcha</span>-->
					<!--</label>-->
					<!--<input class="input__field input__field&#45;&#45;minoru" id="nickName" v-model="nickName" placeholder="点击获取验证码" />-->
				<!--</span>-->

        <!--<span class="input input&#45;&#45;minoru span-register">-->
          <!--<a @click="register" class="button button-primary button-pill button-giant">Register</a>-->
        <!--</span>-->
      <!--</section>-->

      <section class="content">
        <h1>{{ msg }}</h1><br>
        <span class="input input--hideo">
					<input class="input__field input__field--hideo" type="text" id="input-41" v-model="mobile" placeholder="手机号码"/>
					<label class="input__label input__label--hideo" for="input-41">
						<i class="fa fa-fw fa-mobile icon icon--hideo"></i>
						<span class="input__label-content input__label-content--hideo"></span>
					</label>
				</span><br><br>

        <span class="input input--hideo">
					<input class="input__field input__field--hideo" type="text" id="input-43" v-model="password" placeholder="密码" />
					<label class="input__label input__label--hideo" for="input-43">
						<i class="fa fa-fw fa-lock icon icon--hideo"></i>
						<span class="input__label-content input__label-content--hideo">Password</span>
					</label>
				</span><br><br>
        <span class="input input--hideo">
					<input class="input__field input__field--hideo" type="text" id="input-42" v-model="captcha" placeholder="点击左侧获取验证码" />
					<label class="input__label input__label--hideo" for="input-42" @click="sendSms">
						<i class="fa fa-fw   fa-paper-plane icon icon--hideo"></i>
						<span class="input__label-content input__label-content--hideo">Email</span>
					</label>
				</span><br>
        <span class="input input--minoru span-register">
        <a @click="register" class="button button-primary button-pill button-giant">注册</a>
        </span>
      </section>
    </div>

  </div>
</template>
<script>
  import global_ from './config.vue'

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Register Afflatus Street Account',
        mobile: '',
        password: '',
        captcha: '',
        responseCode: 1000,
        errorMsg: '',
        success: false
      }
    },
    methods: {
      register: function () {
        if (this.mobile == '') {
          this.$message({
            showClose: true,
            message: '手机号不能为空',
            type: 'warning'
          });
          return
        }
        if (this.password == '') {
          this.$message({
            showClose: true,
            message: '密码不能为空',
            type: 'warning'
          });
          return
        }
        if (this.captcha == '') {
          this.$message({
            showClose: true,
            message: '验证码不能为空',
            type: 'warning'
          });
          return
        }
        var _self = this
        var url = global_.host + '/v1/uc/register'
        var params = {mobile: _self.mobile, password: _self.password, nickName: _self.nickName}
        console.log(params)
        this.$http.post(url, params).then(function (data) {
          this.responseCode = data.body.responseCode
          if (data.body.responseCode == 1000) {
            this.$notify({
              title: '成功',
              message: '注册成功,正在前往登录',
              type: 'success'
            });
            window.setTimeout(function () {
              _self.$router.push('/login')
            }, 2000)

          } else {
            console.log(data)
            this.$notify.error({
              title: '错误',
              message: data.body.errorMsg
            });
          }
        }, function (response) {
          this.$notify.error({
            title: '糟糕',
            message: '服务器繁忙,请稍候重试'
          });
          console.info(response)
        })
      },
      sendSms:function () {
        if (this.mobile == '') {
          this.$message({
            showClose: true,
            message: '手机号不能为空',
            type: 'warning'
          });
          return
        }

        var url = global_.host + '/v1/uc/captcha/'+this.mobile
        this.$http.post(url).then(function (data) {
          this.responseCode = data.body.responseCode
          if (data.body.responseCode == 1000) {
            this.$message({
              showClose: true,
              message: '验证码已经发送至手机',
              type: 'warning'
            });
          } else {
            this.$message({
              showClose: true,
              message: data.body.errorMsg,
              type: 'error'
            });
          }
        }, function (response) {
          this.$notify.error({
            title: '糟糕',
            message: '服务器繁忙,请稍候重试'
          });
          console.info(response)
        })

      }
    }
  }
</script>

<style scoped>
  @import '../../static/css/buttons.css';
  @import '../../static/css/demo.css';
  @import '../../static/css/normalize.css';
  @import '../../static/css/component.css';

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

  .span-register {
    margin-top: 20px;
  }

  .content {
    padding: 2em 0;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    -webkit-text-fill-color: #333;
  }

  .spinner {
    width: 30px;
    height: 30px;

    position: relative;
    margin: 0px auto;
  }

  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #67CF22;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: bounce 1.0s infinite ease-in-out;
    animation: bounce 1.0s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes bounce {
    0%, 100% {
      -webkit-transform: scale(0.0)
    }
    50% {
      -webkit-transform: scale(1.0)
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    }
    50% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
  }

</style>
