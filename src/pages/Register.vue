<template>
  <div class="login">
    <div style="text-align: right">
      <router-link to="/">
          <span class="input">
          <a class="pull-right login-register-jump-a">I Have Account,To Login!</a>
          </span>
      </router-link>
    </div>
    <div class="container">

      <section class="content">
        <h1>{{ msg }}</h1>
        <span class="input--minoru" v-if="responseCode!=1000">
          <span class="input__label-content input__label-content--minoru">{{errorMsg}}</span>
        </span>
        <span class="input--minoru" v-if='success'>
          <span class="input__label-content input__label-content--minoru">Register Success,Skipping To Login!
            <div class="spinner">
              <div class="double-bounce1"></div>
              <div class="double-bounce2"></div>
            </div>
          </span>
        </span>
        <span class="input input--minoru">
					<label class="input__label input__label--minoru" for="nickName">
						<span class="input__label-content input__label-content--minoru">Your NickName</span>
					</label>
					<input class="input__field input__field--minoru" id="nickName" v-model="nickName"/>
				</span>
        <br>
        <span class="input input--minoru">
					<label class="input__label input__label--minoru" for="mobile">
						<span class="input__label-content input__label-content--minoru">Your phone number</span>
					</label>
					<input class="input__field input__field--minoru" id="mobile" v-model="mobile" style="font-size: 100%"/>
				</span>
        <br>
        <span class="input input--minoru">
					<label class="input__label input__label--minoru" for="password">
						<span class="input__label-content input__label-content--minoru">Your password</span>
					</label>
					<input type="password" class="input__field input__field--minoru" id="password" v-model="password"/>
				</span>
        <br>
        <span class="input input--minoru span-register">
          <a @click="register" class="button button-royal button-pill button-giant">Register</a>
        </span>
      </section>
    </div>

  </div>
</template>
<script src="../../static/js/classie.js"></script>
<script>
  import global_ from './config.vue'

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Register Afflatus Street Account',
        mobile: '',
        password: '',
        nickName: '',
        responseCode: 1000,
        errorMsg: '',
        success: false
      }
    },
    methods: {
      register: function () {
        if (this.mobile == '') {
          this.responseCode = 1001
          this.errorMsg = '手机号不能为空'
          return
        }
        if (this.password == '') {
          this.responseCode = 1001
          this.errorMsg = '密码不能为空'
          return
        }
        if (this.nickName == '') {
          this.responseCode = 1001
          this.errorMsg = '昵称不能为空'
          return
        }
        var _self = this
        var url = global_.host + '/v1/uc/register'
        var params = {mobile: _self.mobile, password: _self.password, nickName: _self.nickName}
        console.log(params)
        this.$http.post(url, params).then(function (data) {
          this.responseCode = data.body.responseCode
          if (data.body.responseCode == 1000) {
            this.success = true
            window.setTimeout(function () {
              _self.$router.push('/')
            }, 2000)

          } else {
            console.log(data)
            this.errorMsg = data.body.errorMsg
          }
        }, function (response) {
          this.responseCode = 9999
          this.errorMsg = '服务器忙,请稍候重试'
          console.info(response)
        })
      }
    }
  }
</script>


<!--<script src="../../static/js/demo-1.js"></script>-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<link rel="stylesheet" type="text/css" href="css/normalize.css"/>
<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.2.0/css/font-awesome.min.css"/>
<link rel="stylesheet" type="text/css" href="css/demo.css"/>
<!--<link rel="stylesheet" type="text/css" href="css/component.css"/>-->
<style scoped>
  @import '../../static/fonts/font-awesome-4.2.0/css/font-awesome.min.css';
  /*@import '../../static/css/bootstrap.min.css';*/
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
