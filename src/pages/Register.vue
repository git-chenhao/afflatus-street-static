<template>
  <div class="login">
    <!--<h1>{{ msg }}</h1>-->
    <div class="container">
      <section class="content">
        <h1>{{ msg }}</h1>
        <span class="input input--minoru">
					<input class="input__field input__field--minoru" id="nickName"/>
					<label class="input__label input__label--minoru" for="nickName">
						<span class="input__label-content input__label-content--minoru">Your NickName</span>
					</label>
				</span>
        <br>
        <span class="input input--minoru">
					<input class="input__field input__field--minoru" id="mobile"/>
					<label class="input__label input__label--minoru" for="mobile">
						<span class="input__label-content input__label-content--minoru">Your phone number</span>
					</label>
				</span>
        <br>
        <span class="input input--minoru">
					<input class="input__field input__field--minoru" id="password"/>
					<label class="input__label input__label--minoru" for="password">
						<span class="input__label-content input__label-content--minoru">Your password</span>
					</label>
				</span>

        <br>
        <span class="input input--minoru">
        <a href="#"
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

  a {
    color: #42b983;
  }

  body {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: #ffffff;
  }
</style>
