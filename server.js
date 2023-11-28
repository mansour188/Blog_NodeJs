const express=require("express")
const cors= require("cors")
const userRoutes=require('./routes/UserRouters')
const { Socket } = require("socket.io")
const Message =require('./models/Message')
const { get } = require("http")
const User = require("./models/User")
const app=express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/users',userRoutes)
require("./connection")
const server =require("http").createServer(app)
const PORT=5000
const io=require("socket.io")(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})
const rooms=['general','crypto','dev','devOps','dataScience']
app.get('/rooms',(req,res)=>{
    res.json(rooms)

})
async function getLastMessagesFromRoom(room){
    let roomMessages=await Message.aggregate(
      [
        {$match:{to:room}},
        {$group:{_id:'$date',messagesByDate:{$push:'$$ROOT'}}}
      ]
    )


    return roomMessages;
}

function sortRoomMessageByDate(messages){
    return messages.sort((a,b)=>{
        let date1=a._id.split("/")
        let date2=b._id.split("/")
        date1=date1[2]+date1[0]+date1[1]
        date2=date2[2]+date2[0]+date2[1]
        return  date2>date1 ? -1 : 1
    })
}

io.on('connection', (socket)=>{

    socket.on('new-user',async ()=>{
        const members= await User.find();
        io.emit('new-user',members)
    })



socket.on('join-room',async(room)=>{
    socket.join(room);
    let roomMessages=await getLastMessagesFromRoom(room);
    roomMessages=sortRoomMessageByDate(roomMessages)
    socket.emit('room-messages',roomMessages)

})

socket.on('message-room',async(room,content,sender,time,date)=>{
    console.log(content)
    const newMessage=await Message.create({content,from:sender,time,date,to:room})
    let roomMessages=await getLastMessagesFromRoom(room);
    roomMessages=sortRoomMessageByDate(roomMessages)
    //send message to room
    io.to(room).emit('room-messages',roomMessages)
    socket.broadcast.emit('notifications',room)

})

})

server.listen(PORT,()=>{
    console.log("lestning port "+PORT)
})