<template>
    <div class="main">
     <div v-if="!user" class="logindivin">
          <div v-if="error" class="error" role="alert">
                    {{error}}
          </div>
            <h1>Login</h1>
         <form  @submit.prevent = "login">
             <div class="txt-field">
             <input type="text" v-model="email" required>
             <span></span>
             <label>Email</label>
             </div>
             <div class="txt-field">
             <input type="password" v-model="password" required>
             <span></span>
             <label>Password</label>
             </div>
             <input type="submit" value="Login">
             <div class="signup">
             Not a member? <a href="/register">Signup</a>
            </div>
         </form>
      </div>
       <div class="cart" v-if="user">
             <p>Hello <span> {{user.name}}</span> glad to see you among us! </p>
             <a href="/"  class="btn">Home</a>
         </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Login',
    data(){
        return {
            email:'',
            name:'',
            password:'',
            user:null,
            error:''
        }
    },
     mounted() {
        axios.get('http://localhost:5000/user', { headers: { token: localStorage.getItem('token')}})
      .then(res => {
        this.user = res.data.user
      })
  },
    methods:{
        async login(){
            try{
            const user = await axios.post('http://localhost:5000/login',{
                email: this.email,
                name: this.name,
                password: this.password,
                
            });
            console.log(user)
            localStorage.setItem('token', user.data.token)
            this.$router.go('/');
            }catch(e){
                this.error = 'Invalid username/password!'
            }
            
        }
        
    }
}
</script>

<style scoped>
.main::before{
     content: 'Login';
}
.cart {
    font-size: 50px;
    width: 900px;
    margin-bottom: 200px;
    background-color: #1a1a1a;
    color: white;
    align-items: center;
    padding: 0 50px;
}
.cart span{
    color: red;
    font-weight: 700;
}
.btn{
    text-align: center;
    width: 300px;
   
}

</style>