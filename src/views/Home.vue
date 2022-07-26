<template>
  <div class="home">
      
  </div>
</template>

<script>

export default {
  name: 'home',
  created(){
    console.log(this.$config_env.VUE_APP_ENV)
  }
}
</script>
