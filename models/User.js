const mongoose=require('mongoose')
const {isEmail} =require('validator') 
const bcrypt=require('bcrypt')

//model of user

const UserSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"can't blanck"]
        },
        email:{
            type:String,
            required:[true,"can't blanck"],
            lowercase:true,
            unique:true,
            index:true,
            validate:[isEmail,'invalid email']

        },
        password:{
            type:String,
            required:[true,"can't blanck"]

        },
        picture:{
            type:String
        },
        newMessage:{
            type:Object,
            default:{}


        },
        status:{
            type:String,
            default:"online"
        },
        
    },
    {minimize:false}
)

const User=mongoose.model("User",UserSchema)

module.exports=User