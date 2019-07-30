<template>
  <div id="app" style="margin-top:0px;">
    <MainMenu msg="Welcome to Your Vue.js App" v-if="isLoggedIn"/>
    <!-- <Category msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Category from './components/Category.vue'
// import CreateCategory from './components/CreateCategory.vue'
import MainMenu from './components/MainMenu.vue'

export default {
  name: 'app',
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  components: {
    // Category,
    // CreateCategory,
    MainMenu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
