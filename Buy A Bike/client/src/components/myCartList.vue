<template>
    <div>
        <section class="main">
            <div class="inline">
            <div class="maincontent">
                <div v-for="cart in carts" :key="cart._id" class="cart">
                    <div class="mycart">
                        <h1>{{cart.title}}</h1>
                    </div>
                    <div class="image">
                       <img :src="cart.image" class="bike">
                    </div>
                    <div class="price">
                        <h3> {{cart.price}} </h3>
                    </div>
                    <div class="deletebut">
                         <input @click="removeCart(cart)" type="submit" value="Delete">
                    </div>
                </div>   
                
            </div>
            
            </div>
            
         </section>
        
    </div>
</template>

<script>
import {ref,onMounted} from 'vue'

export default {
    created(){
        if(localStorage.getItem('token') === null){
            this.$router.push('/login')
        }

    },
    setup(){
        const carts = ref([])
        
        onMounted(() => {
            getCarts()
        })
        
        function getCarts(){
        let motor = JSON.parse(localStorage.cart)
        carts.value = motor
        }
        function removeCart(motor){

            let index = carts.value.indexOf(motor)
            carts.value.splice(index,1)
            localStorage.cart = JSON.stringify(carts.value)
           
        }
        return{
            carts,
            removeCart,
        }
    },
}
</script>

<style scoped>
.main{
    position: relative;
    display: flex;
}
.main::before{
 content: 'MyCart';
}
.bike{
    margin-top: 60px;
    max-width: 260px;
}
.inline{
    max-width: 200vh;
    display: inline-block;
}
.maincontent{
    margin-top: 0px;
    display: flex;
    flex-direction: row;
    justify-content:row;
    flex-wrap: wrap;
    text-align: center;
}
.cart{
    margin-left: 40px;
   margin-top: 50px;
   position: relative;
   display: flex;
   flex-direction: row;
}
.mycart{
    position: absolute;
    
}
.mycart h1{
    margin-left: 20px;
    font-size: 50px;
    color: white;
    margin-top: 15px;
    border-bottom: 2px solid red;
}

.price h3{
  
    z-index: 10;
    font-size: 35px;
    color: white;
    margin-top: 270px;
    margin-left: 20px;
}
.deletebut{
    background: red;
    color:white;
    text-decoration: none;
    padding: 5px 10px;
    margin-top: 260px;
    margin-bottom: -20px;
    margin-left: 40px;
    border-radius: 20px;
    transition: 0.20s;
    z-index: 100;
}
.image{
    position: absolute;
}

</style>