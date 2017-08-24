<template>
  <div class="login">
    <div style="text-align: right">
      <router-link to="/register">
          <span class="input">
          <a class="pull-right login-register-jump-a">No Account,To Register!</a>
          </span>
      </router-link>
    </div>
    <br>
    <div class="container">
      <section class="content">
        <h1>{{ msg }}</h1>
        <span class="input--minoru" v-if="responseCode!=1000">
          <span class="input__label-content input__label-content--minoru">{{errorMsg}}</span>
        </span>
        <span class="input input--minoru">
					<label class="input__label input__label--minoru" for="mobile">
						<span class="input__label-content input__label-content--minoru" >Your phone number</span>
					</label>
          <input class="input__field input__field--minoru" id="mobile" v-model="mobile" @keyup.13="login()"/>
				</span>
        <br>
        <span class="input input--minoru">
					<label class="input__label input__label--minoru" for="password">
						<span class="input__label-content input__label-content--minoru">Your password</span>
					</label>
					<input class="input__field input__field--minoru" id="password" type="password" v-model="password"
                 @keyup.13="login()"/>
				</span>

        <br>
        <span class="input input--minoru span-login">
          <a @click="login" class="button button-royal button-pill button-giant">Login</a>
        </span>
      </section>
    </div>
  </div>
</template>
<script src="../../static/js/classie.js"></script>
<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome To Afflatus Street',
        mobile: '',
        password: '',
        responseCode: 1000,
        errorMsg: ''
      }
    },
    methods: {
      login: function () {
        var _self = this
        var url = 'http://localhost:8081/v1/uc/login'
        var params = {mobile: _self.mobile, password: _self.password}
        console.log(params)
        this.$http.post(url, params).then(function (data) {
          if (data.body.responseCode == 1000) {
            this.$router.push('/home')
          } else {
            console.log(data)
            this.responseCode = data.body.responseCode
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

<style scoped>
  @import '../../static/css/normalize.css';
  @import '../../static/css/demo.css';
  @import '../../static/css/component.css';
  @import '../../static/fonts/font-awesome-4.2.0/css/font-awesome.min.css';
  @import '../../static/css/buttons.css';

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

  .span-login {
    margin-top: 20px;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    -webkit-text-fill-color: #333;
  }
</style>
