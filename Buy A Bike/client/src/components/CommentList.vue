<template>
    <div>
        <section>
    
                <div v-for="comment in comments" :key="comment._id" class="commentModal">
                   
                    <div class="mycart">
                            <h1><span>{{comment.username}}</span></h1>
                        <div class="text">
                            <h2>{{comment.content}}</h2>
                        </div>
                   </div>   
               
               <div class="button">
                    <div v-if="comment.useremail === user.email" class="editbut">
                         <input @click="editComment(comment._id)" type="submit" value="Edit">
                    </div>
                    <div v-if="comment.useremail === user.email" class="deletebut">
                         <input @click="removeComment(comment._id)" type="submit" value="Delete">
                    </div> 
                </div>  
             </div>
        </section>
                 
    </div>
</template>

<script>
import {ref,onMounted} from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'
export default {
    
    data() {
        return{
            user: '',
        }
    },
     mounted() {
        axios.get('http://localhost:5000/user', { headers: { token: localStorage.getItem('token')}})
      .then(res => {
        this.user = res.data.user
      })
      
  },
    setup(){
        const router = useRouter()
        const comments = ref([])
        
        onMounted(() => {
            getComments()
        })
        
        async function getComments(){
            try {
                const response = await fetch('http://localhost:5000/comments')
                const json = await response.json()
                comments.value = json
            } catch (error) {
                console.log(error)
            }
            this.username = JSON.parse(atob(localStorage.token.split(".")[1])).username
            this.useremail =JSON.parse(atob(localStorage.token.split(".")[1])).useremail
        }
        async function removeComment(_id){
            await fetch(`http://localhost:5000/comments/${_id}`,{
            method: 'DELETE'
            })
            getComments()
        }
        async function editComment(_id){
            router.push({
                name:'Update',
                params:{
                    id: _id},
            })
        }
        
    return{
        comments,
        removeComment,
        editComment,
    }
}
}
</script>

<style scoped>

span{
    font-size: 40px;
    color: red;
    
}
.commentModal{
   margin-top: 10px;
   margin-bottom: 10px;
     border: solid 5px #707070;
     border-radius: 10px;
}
h1{
    margin-left: 20px;
    margin-top: -100px;
    font-weight: 400;
}
h2{
    font-size: 25px;
    color: white;
    font-weight: 100;
}
.text{
    display: inline-block;
    flex-wrap: wrap;
    width: 1750px;
     
}
.mycart{
    
    margin-left: 10px;
    width: 1000px;
    position: relative;
    text-align: left;
    
    margin-top: 100px;
    font-size: 5px;
   
   
}

.editbut{
  
    display: inline-block;
    background: orange;
    color:white;
    width: 100px;
    border-radius: 10px;
  
    
}
.editbut input{
    background: 0;
    border: 0;
}

.deletebut{
    display: inline-block;
    background: red;
    color:white;
    width: 100px;
    border-radius: 10px;
   
}
.button{
   text-align: right;
}
</style>