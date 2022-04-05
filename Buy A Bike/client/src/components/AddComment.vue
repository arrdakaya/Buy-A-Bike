<template>
<div class="main">
        
 <div class="logindivin">
    <div  v-if="user" class="loggedin">
        <h1 >Rate This Bike</h1>
         <form  @submit.prevent = "addComment">
            <div class="txt-field">
             <textarea type="text" v-model="commentForm.content" cols="27" rows="10" placeholder="Content" onkeyup="this.value = this.value.charAt(0).toUpperCase()+value.slice(1)" required minlength="3"></textarea>
             <span></span>
             </div>
             <input type="submit" value="Send">
         </form>
         </div>
         <div class="notuser" v-if="!user">
             <h1>Please sign up to comment</h1>
             <a href="/login">Sign Up</a>
         </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            commentForm:{},
            user:'',
        }
    },
    
     mounted() {
        axios.get('http://localhost:5000/user', { headers: { token: localStorage.getItem('token')}})
      .then(res => {
        this.user = res.data.user
      })
  },
    methods:{
        addComment(){
            this.commentForm.username= JSON.parse(atob(localStorage.token.split(".")[1])).username
            this.commentForm.useremail= JSON.parse(atob(localStorage.token.split(".")[1])).useremail
            axios.post('http://localhost:5000/comments', this.commentForm)
            .then((res) =>{
                console.log('success'+ res)
            }).catch((err) =>{
                console.log(err)
            })
            this.$router.go()
        }
        
    },
   
}
</script>

<style scoped>
.main{
    margin-top: -80px;
}

textarea{
    border: 2px solid;
    border-radius: 5px;
    background: #1c1c1c;
    border-color: red;
    font-size: 20px;
    font-weight: 400;
    color: white;
}
.notuser h1{
    font-size: 50px;
}
.notuser a{
    font-size: 30px;
    margin-top: 20px;
    color: red;
   
}

</style>