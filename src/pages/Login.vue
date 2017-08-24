<template>
  <div class="login">
    <!--<div class="login" style="float: right;margin-right: 0px">-->
    <!--<router-link to="/register">-->
    <!--<span class="input">-->
    <!--<a href="http://www.bootcss.com/" class="pull-right ">No Account Click Me!</a>-->
    <!--</span>-->
    <!--</router-link>-->
    <!--</div>-->
    <!--<ul id="background" class="background"><li class="fadein"></li></ul>-->
    <div class="container">
      <section class="content">
        <h1>{{ msg }}</h1>
        <span class="input input--minoru">
					<label class="input__label input__label--minoru" for="mobile">
						<span class="input__label-content input__label-content--minoru">Your phone number</span>
					</label>
          <input class="input__field input__field--minoru" id="mobile"/>
				</span>
        <br>
        <span class="input input--minoru">
					<label class="input__label input__label--minoru" for="password">
						<span class="input__label-content input__label-content--minoru">Your password</span>
					</label>
					<input class="input__field input__field--minoru" id="password" type="password"/>
				</span>
        <br>
        <router-link to="/register">
        <span class="input">
        <a href="#" class="pull-right ">No Account Click Me!</a>
        </span>
        </router-link>
        <br>
        <span class="input input--minoru span-login">
        <a href="#" @click="login"
           class="button button-block button-rounded button-primary button-large">Go</a>
        </span>


        <!--<a href="#" class="button button-3d button-primary button-rounded">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login in&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>-->
      </section>
    </div>

  </div>
</template>
<script src="https://unpkg.com/vue"></script>

<script src="../../static/js/classie.js"></script>
<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome To Afflatus Street'
      }
    },
    methods: {
      login: function () {
        var url = 'http://localhost:8080/v1/uc/login'

        this.$http.post(url).then(function (data) {
//          console.log(data)
//          var json = data.body
//          this.data = eval('(' + json + ')')
        }, function (response) {
          console.info(response)
        })
      }
    }
  }
  //  }
  // var demo = new Vue({
  //    el:'#app',
  //    data:{data:""},
  //    created:function(){
  //      var url="json.jsp";
  //
  //      this.$http.get(url).then(function(data){
  //        var json=data.body;
  //        this.data=eval("(" + json +")");
  //      },function(response){
  //        console.info(response);
  //      })
  //    }
  //  });
</script>


<!--<script src="../../static/js/demo-1.js"></script>-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<link rel="stylesheet" type="text/css" href="css/normalize.css"/>
<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.2.0/css/font-awesome.min.css"/>
<link rel="stylesheet" type="text/css" href="css/demo.css"/>
<link rel="stylesheet" type="text/css" href="css/component.css"/>
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
</style>
