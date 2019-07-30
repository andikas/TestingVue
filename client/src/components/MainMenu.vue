<template>
    <nav class="navbar">
        <div class="container">
            <h1 class="logo"><a href="#">Vue Program</a></h1>
            <ul class="nav nav-right">
                <li><router-link :to="{ name: 'Category' }" class="btn">Category</router-link></li>
                <li><router-link :to="{ name: 'Book' }" class="btn">Book</router-link></li>
                <li><a @click="logout">Logout</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
  export default {
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    }
  }
</script>

