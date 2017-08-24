<template >
  <div class="login" >
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
        msg: 'Welcome  Afflatus Street Home!',
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

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


</style>
