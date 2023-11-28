const router=require('express').Router();
const User=require('../models/User')
router.post("/signup", async (req,res)=>{
    try {
        const {name,email,password,picture}=req.body
       

        const user=await User.create({name,email,password,picture})
        console.log(3)

        res.status(201).json(user)
        console.log(4)

        
    } catch (error) {
        let msg;
        if(error.code==11000){
            msg="user already exist"
        }else{
            msg=error.message
            
        }

         res.status(400).json("error :"+msg)
        
    }

})


router.post("/login", async (req,res)=>{
    try {
        const {email,password}=req.body
         const user =await User.findByCridentiel(email,password)

        user.status='online'

        
    

        res.status(200).json(user)

        
    } catch (error) {
        res.status(400).json(error.message)
        
    }

})


module.exports=router
