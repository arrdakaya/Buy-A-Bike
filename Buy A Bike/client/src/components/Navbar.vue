<template>
<div>
    <header class="navbar">
      <router-link to="/"><img src="../assets/logo.png"  class="logo"/></router-link>
      <ul v-if="!user" class="navi">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/myCart">My Cart</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
      </ul>
      <ul v-if="user" class="navi">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/myCart">My Cart</router-link></li>
        <li><a href="/" @click="logout">Logout</a></li>
      </ul>
    </header>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'Navbar',
    data() {
        return{
            user: null,
        }
    },
     mounted() {
        axios.get('http://localhost:5000/user', { headers: { token: localStorage.getItem('token')}})
      .then(res => {
        this.user = res.data.user
      })
  },
    methods: {
        logout(){
          localStorage.removeItem('token');
        }
    }
}
</script>
<style>
.logo{
  width: 140px;
  margin-left: 25px;
}
</style>

