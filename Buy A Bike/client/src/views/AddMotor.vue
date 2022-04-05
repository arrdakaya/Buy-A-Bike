<template>
    <div class="main">
     <div class="logindivin">
        <h1>AddMotor</h1>
         <form @submit.prevent = "addMotor">
            <div class="txt-field">
             <input type="text" v-model="motorForm.title" required>
             <span></span>
             <label>Title</label>
             </div>
             <div class="txt-field">
             <input type="text" v-model="motorForm.model" required>
             <span></span>
             <label>Model</label>
             </div>
             <div class="txt-field">
             <input type="text" v-model="motorForm.image" required>
             <span></span>
             <label>Image</label>
             </div>
             <div class="txt-field">
             <input type="text" v-model="motorForm.price" required>
             <span></span>
             <label>Price</label>
             </div>
             <input type="submit" value="Add">
             
         </form>
      </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return {
            motorForm:{},
        }
    },
   
    methods:{
        addMotor(){

            axios.post('http://localhost:5000/motor', this.motorForm)
            .then((res) =>{
                console.log('success'+ res)
            }).catch((err) =>{
                console.log(err)
            })
            alert('Successfully Added')
        }
    }

}
</script>

<style>

</style>