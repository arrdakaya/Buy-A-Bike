<template>
    <div>
        <section class="main">
            <div class="cursor"> 
            <h1 class="content">{{motor.title}}</h1>
            </div>
            <input class="commentbox" @click="commandModal=true;" :disabled="commandModel" type="submit" value="Comments">
            <input class="ratebox" @click="rateModal=true;" :disabled="rateModal" type="submit" value="Rate This Bike">
            
            <div class="maincontent">
                <h1>Ready to <span class="moto">Ride</span></h1>
                <input @click="addToCart(); showModal=true;" :disabled="showModal" type="submit" value="Buy Now!">
                
                <transition name ="fade" appear>
                    <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
                </transition>
                <transition name ="slide" appear>
                 <div  class="modal" v-if="showModal" @click.self="showModal = false" >
                    <h1>Added to Cart  </h1><br>
                    <h2>{{motor.title}} </h2><br>
                    <h3>{{motor.model}}</h3>
                    <input type="submit"  @click="showModal = false" value="Thank You">
                 </div>
                 </transition>
    <!-- ------------------------------------------------------------------------readcomment- -->

 <transition name ="fade" appear>
    <div class="modal-overlay" v-if="commandModal" @click.self="commandModal = false"></div>
 </transition>
<transition name ="slide" appear>
  <div class="commentModal" v-if="commandModal" @click.self="commandModal = false">
     
      <CommentList />
  </div>
</transition>

  <!-- ------------------------------------------------------------------------------------------  -->
   <!-- ------------------------------------------------------------------------comment- -->
 <transition name ="fade" appear>
    <div class="modal-overlay" v-if="rateModal" @click.self="rateModal = false"></div>
 </transition>
<transition name ="slide" appear>
  <div class="rateModal" v-if="rateModal" @click.self="rateModal = false" >
      <AddComment />
  </div>
</transition>
  <!-- ------------------------------------------------------------------------------------------  -->
                <img v-bind:src="motor.image" class="bike">
            </div> 
            <div class="feat">
                <h2><span>{{motor.title}}</span><br>{{motor.model}}</h2>
                <h2><span>Price</span><br>{{motor.price}} ₺</h2>
            </div>
        </section>
        
    </div>
</template>

<script>
import AddComment from '../components/AddComment.vue'
import CommentList from '../components/CommentList.vue'
import {ref,onMounted} from 'vue'
import { useRoute } from "vue-router";

export default {
   
    name:'Motorcycle',
    components:{
         CommentList,
         AddComment,
    },
     setup(){
        
        const motor = ref([])
        
        onMounted(() => {
            getMotor()
        })
        
        async function getMotor(){
            try {
                const route =useRoute();
                const response = await fetch('http://localhost:5000/motor/'+ route.params.id)
                const json = await response.json()
                motor.value = json
            } catch (error) {
                console.log(error)
            }

        }
    return{
        motor,
    }
    
},
    data(){
        return{
        showModal:false,
        commandModal:false,
        rateModal:false
        }
    },
    methods:{
        addToCart(){   
            if(localStorage.cart){
                let currentCart = JSON.parse(localStorage.cart)
                currentCart.push(this.motor)
                localStorage.cart = JSON.stringify(currentCart)
            }else{
            localStorage.cart = JSON.stringify([this.motor])
            }
        },
        
    }
}
    


</script>

<style scoped>

.content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 22vw;
    font-weight: 700;
    opacity: 0.1;
}
.moto{
    
    animation: animate-ride 1s ease-in-out infinite;
}
.maincontent{
    margin-top: -25px;
}

@keyframes animate-ride {
    50%{
        color:limegreen ;
    }
}

input[type="submit"]{
    width: 200px;
    margin-top: 20px;
    height: 50px;
    border: 2px solid;
    background: red;
    border-color: red;
    border-radius: 25px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    color: white;
}
.ratebox{
    position: absolute;
  top: 0;
  left: 0;
  margin-left:140px ;
}
.commentbox{
  position: absolute;
  top: 0;
  right: 0;
  margin-right:140px ;
  
}
.bike{
    
    width: 740px;
    
}
.btn{
    width: 200px;
    font-size: 20px;
    text-align: center;
}
.modal-overlay{
    
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    height: 846px;
    width: 1920px;
    z-index: 98;
    top: -50;
    bottom: -50; 
}
.rateModal{
     margin-top: 50px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 99;
    width: 100%;
    max-height: 750px;
    max-width: 800px;
    background-color: #1c1c1c;
    border-radius: 16px;
    text-align: center;
    overflow:auto;
}
.commentModal{
    
    margin-top: 50px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 99;
    width: 100%;
    max-height: 750px;
    max-width: 1800px;
    background-color: #1c1c1c;
    border-radius: 16px;
    text-align: center;
    overflow:auto;
    
}
.modal{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 99;
    width: 100%;
    max-width: 600px;
    background-color: #1c1c1c;
    border-radius: 16px;
    text-align: center;
}
.modal input{
    width: 200px;
    margin-top: 60px;
    margin-bottom: 20px;
    
}
.modal h1{
   
    font-size: 90px;
    animation: animate 0.7s ease-in-out infinite;
}
@keyframes animate{
    50% {
        color: #707070;
    }
}
.modal h2{
    font-size: 70px;
    color: #32CD32;
}
.modal h3{
    font-size: 40px;
    color: #32CD32;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.7s;
}
.fade-enter,
.fade-leave-to{
    opacity: 0;
}
.slide-enter-active,
.slide-leave-active{
    transition: transform .5s;
}
.slide-enter,
.slide-leave-to{
    transform: translateY(-50%) translateX(100vw);
}
.cursor{
    cursor: default;
}
</style>