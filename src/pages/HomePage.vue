<template>
  <div class="login">
    <div class="homepage-top">
      <span class="homepage-top-span" style="float: left">
          <a href="http://www.bootcss.com/" class="button button-block button-rounded button-large"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>记录</a>
      </span>
      <!--<span class="homepage-top-span" style="width: 100%;text-align: center;display: inline-block">-->
        <!--静极而生灵感，烦极而生智慧-->
      <!--</span>-->
      <span class="homepage-top-span">
        <router-link to="/login" >
          <a href="http://www.bootcss.com/" class="button button-primary button-pill ">注册</a>
        </router-link>
      </span>
      <span class="homepage-top-span">
        <router-link to="/login">
          <a href="http://www.bootcss.com/" class="button  button-pill ">登录</a>
        </router-link>
      </span>
      <form style="text-align: center">
        <input type="text" placeholder="搜索从这里开始...">
        <button type="submit"></button>
      </form>
    </div>
    <div class="container">
      <section class="content">
        <h1>{{ msg }}</h1>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'hello',
    data () {
      return {
        nickName: 'Tony Chen !!!',
        msg: 'Welcome  Afflatus Street Home!',
      }
    },
    methods: {}
  }
</script>

<style scoped>
  @import "../../static/css/search/normalize.css";
  @import "../../static/css/search/style.css";
  @import '../../static/css/buttons.css';

  h1, h2 {
    font-weight: normal;
    margin-top: 200px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  .homepage-top {
    padding: 10px;
    border-bottom: rgba(200,200,200,0.5) 1px solid;
  }
  .homepage-top-span{
    float:right;
    display: inline-block;
    margin-left: 10px;
  }

</style>
