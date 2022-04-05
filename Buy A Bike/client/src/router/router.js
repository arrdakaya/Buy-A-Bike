import {createRouter, createWebHistory} from "vue-router"
import HomePage from "../views/HomePage"
import Login from "../views/Login"
import Register from "../views/Register"
import MyCartList from "../components/myCartList"
import Motorcycle from "../components/Motorcycle"
import AddMotor from '../views/AddMotor'
import Update from '../views/Update'




   const routes = [
        {path: "/", name:"Home" ,component: HomePage},
        {path: "/login", name:"Login", component: Login},
        {path: "/register", name:"Register", component: Register},
        {path: "/myCart", name: "MyCart",component: MyCartList},
        {path: "/Motorcycle/:id", name:"Motorcycle", component: Motorcycle},
        {path: "/addmotor", name:"addMotor", component: AddMotor},
        {path: "/update/:id", name:"Update", component: Update},
       
    ];

    const router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes,

    })

    router.beforeEach((to,from,next) => {
        let documentTitle = `AKY Moto - ${to.name}`
        if(to.params.title){
            documentTitle +=` | ${to.params.title}`
        }
       document.title = documentTitle
        next()
    })

export default router;
