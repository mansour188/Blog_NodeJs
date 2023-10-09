const router=require('express').Router();
const User=require('../models/User')
router.post("/",async (req,res)=>{
    try {
        const {name,email,password,picture}=req.body
        console.log(req.body)
        const user=await User.create({name,email,password,picture})
        res.status(201).json(user)
        
    } catch (error) {
        let msg;
        if(error.code==11000){
            msg="user already exist"
        }else{
            
        }
        
         res.status(400).json(msg)
        
    }

})

router.post("/login", async (req,res)=>{
    try {
        const {email,password}=req.body
        const user =await User.findByCridentiel(email,password)
        user.status='online'
        const  user.save();
        res.status(200).json(user)
        
    } catch (error) {
        res.status(400).json(error.message)
        
    }

})