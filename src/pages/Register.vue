<template>
  <div class="login" >
    <!--<h1>{{ msg }}</h1>-->
    <!--<ul id="background" class="background"><li class="fadein"></li></ul>-->
    <div class="container">
      <section class="content">
        <h1>{{ msg }}</h1>
        <span class="input input--minoru">
					<label class="input__label input__label--minoru" for="nickName">
						<span class="input__label-content input__label-content--minoru">Your NickName</span>
					</label>
					<input class="input__field input__field--minoru" id="nickName"/>
				</span>
        <br>
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
					<input class="input__field input__field--minoru" id="password"/>
				</span>
        <br>
        <router-link to="/">
          <span class="input">
            <a href="#" class="pull-right ">I Have Account,To Login!</a>
          </span>
        </router-link>
        <br>
        <span class="input input--minoru span-register">
        <a href="http://www.bootcss.com/"
           class="button button-block button-rounded button-primary button-large">Go</a>
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
        msg: 'Register Afflatus Street Account'
      }
    }
  }
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

  .span-register {
    margin-top: 20px;
  }
</style>
