<template>
    <div>
        <section class="main">
            <div class="maincontent">
                <h2 v-if="user"> Welcome <span class="moto">{{user.name}}</span> </h2>
                <h2 v-if="!user"> Welcome Rider </h2>
                <h1 v-if="user"><span class="moto">Buy</span>  Your First Bike</h1>
                <h1 v-if="!user">Join us and <span class="moto">Ride</span></h1>
               <a href="/login" v-if="!user" class="btn">Login and Buy</a>
                <a href="/myCart" v-if="user" class="btn">My Cart</a>
            </div>

            
            <div class="typesmoto">
                <div class="inli">
                <ul class="types">
                    <li><router-link v-bind:to="{name: 'Motorcycle', params:{
                        id:motor.title, 
                        }}" v-for="motor in motors" :key="motor"  >{{motor.title}}</router-link></li>
                </ul>
            </div>
            </div>
            </section>
    </div>
</template>

<script>
import axios from 'axios';
import {ref,onMounted} from 'vue'
export default {
   
    name:'HomePage',
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
     setup(){
        const motors = ref([])
        
        onMounted(() => {
            getMotors()
        })
        
        async function getMotors(){
            try {
                const response = await fetch('http://localhost:5000/motor')
                const json = await response.json()
                motors.value = json
            } catch (error) {
                console.log(error)
            }
        }
    return{
        motors,
    }
}
}
</script>

<style scoped>
.main::before{
 content: 'HomePage';
}
.maincontent h2{
    margin-top: 30px;
    color: white;
    font-size: 3em;
    font-weight: 300;
}
.inli{
    
    display: inline-block;
    max-width: 200vh;
    height: 200px;
}
.inli ul{
    margin-top: 100px;
    
}
.types li {
  
    display: flex;
    flex-direction:row;
    justify-content:space-between;
    flex-wrap: wrap;
    
}

.types li a{
    box-sizing: border-box;
 margin-left: 70px;
   margin-top: 70px;
   position: relative;
}


</style>