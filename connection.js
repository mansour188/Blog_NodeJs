const  mongoose=require("mongoose")
require("dotenv").config();
console.log(process.env.DB_USERNAME)
console.log(process.env.DB_PASSWORD)



mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.aot4fyq.mongodb.net/mydatabase?retryWrites=true&w=majority`).then(()=>{
    console.log("mongoose connected ...")
}).catch((err)=>{
    console.log(err.message)
})

