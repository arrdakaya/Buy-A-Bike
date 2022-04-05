<template>
    <div class="main">
     <div class="logindivin">
          <div v-if="error" class="error" role="alert">
                    {{error}}
          </div>
        <h1>Register</h1>
         <form @submit.prevent ="signup">
             <div class="txt-field">
             <input type="text" v-model="email"  required>
             <span></span>
             <label>Email</label>
             </div>
              <div class="txt-field">
             <input type="text" v-model="name" onkeyup="this.value = this.value.charAt(0).toUpperCase()+value.slice(1)"  required>
             <span></span>
             <label>Your Name</label>
             </div>
             <div class="txt-field">
             <input type="password" v-model="password" required>
             <span></span>
             <label>Password</label>
             </div>
             <input type="submit" value="Signup">
         </form>
      </div>
      
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'Register',
 
    data(){
        return{
            email:'',
            name:'',  
            password:'',
            error:'',
        }
    },
    methods:{
       async signup(){
           try{
            const newUser = await axios.post('http://localhost:5000/register', {
                email: this.email,
                name: this.name,
                password: this.password,
                
            })
           console.log(newUser);
           this.$router.push('/login');
           }catch(e){
               this.error ='This email is already used'
           }
        }
    }
}
</script>

<style scoped>
.main::before{
    content: 'Register';
}
</style>