<template>
    <div class="main">
     <div class="logindivin">
            <h1>Edit</h1>
         <form  @submit.prevent = "updateComment">
             <div class="txt-field">
                   
             <textarea cols="27"  rows="10" v-model="comment.content" required></textarea>
             <span></span>
          
             </div>
             <input type="submit" value="Edit">
            
         </form>
      </div>
      
    </div>
</template>

<script>

import { useRouter,useRoute } from 'vue-router'
import {ref, onMounted} from 'vue'

export default {
    name:"Update",
   
    setup(){
        const router = useRouter()
        const route = useRoute()
        const comment = ref({
            content:'',
        })
        onMounted(() => {
            getComment()
        })

        async function getComment(){
            const {id} = route.params
            const response = await fetch(`http://localhost:5000/comments/${id}`)
            const json = await response.json()
            comment.value = json
            console.log(comment)
          
        }
  

        async function updateComment(){
           const {id} = route.params
           const response = await fetch (`http://localhost:5000/comments/${id}` , {
               method: 'PUT',
               headers: {
                   'content-type': 'application/json'
               },
               body: JSON.stringify({
                   username: comment.value.username,
                   useremail:comment.value.useremail,
                   content: comment.value.content,
               }),
           })
            await response.json()
          
           router.push('/')
               
              
               
    
              

            
        }
        return{
            comment,
            updateComment
        }
    },
   
}
</script>

<style scoped>

textarea{
    border: 2px solid;
    border-radius: 5px;
    background: #1c1c1c;
    border-color: red;
    font-size: 20px;
    font-weight: 400;
    color: white;
}
</style>