const express=require("express")
const cors= require("cors")
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("./connection")
const server =require("http").createServer(app)
const PORT=5000
const io=require("socket.io")(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

server.listen(PORT,()=>{
    console.log("lestning port "+PORT)
})