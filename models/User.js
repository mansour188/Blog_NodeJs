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
UserSchema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject()
    delete userObject.password
    return userObject
}
UserSchema.pre('save', function (next) {
    const user = this;
  
    // Check if the password field has been modified; if not, move to the next middleware
    if (!user.isModified('password')) {
      return next();
    }
  
    // Generate a salt and hash the password
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }
  
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) {
          return next(error);
        }
        user.password = hash;
        next();
      });
    });
  });
UserSchema.statics.findByCridentiel=async (email,password)=>{
    var user =await User.findOne({email})
   if(!user){
    throw new Error("account not found ")
   }

   const isMatch= await bcrypt.compare(password,user.password);
   console.log("______"+isMatch)
   if(!isMatch){
    throw new Error("ivalid email or password")
   }
   return user


}
const User=mongoose.model("User",UserSchema)


module.exports=User