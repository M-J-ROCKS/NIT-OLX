const express = require('express');//package
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adRoutes = require('./routes/adRoutes');
const chatRoutes = require('./routes/chatRoutes');
// const noteRoutes = require('./routes/noteRoutes');
// const chatRoutes = require('./routes/chatRoutes');
// const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const app = express();//object of the imported package
dotenv.config();
connectDB();
const cors=require('cors')
app.use(cors())
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API running...");
})

/*MiddleWares */
// // app.use(path, middleware) is used to call middleware function that needs to be called before the route is hit for the corresponding path.
// Middleware functions are functions that have access to the request object(req), the response object(res), and the next middleware function in the application’s request - response cycle. 
// next() fn needs to be called within each middleware function when multiple middleware functions are passed to app.use, else the next middleware function won’t be called.
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/chat',chatRoutes)
// app.use('/api/notes',noteRoutes);
// app.use('/api/chat', chatRoutes);
// app.use('/api/message', messageRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
//We need this to build our server together with socket.io
const http=require('http')
const {Server}=require('socket.io')


const server=http.createServer(app)

const io=new Server(server,{
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'mode' : 'no-cors'
      },
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
})
io.on('connection',(socket)=>{
    console.log(socket.id)
    //To join to the specific room based on frontend
    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`User with ID:${socket.id} joined room ${data}`)
    })
    socket.on('send_message',(data)=>{
        socket.to(data.room).emit("receive_message",data)
    })
    socket.on('disconnect',()=>{
        console.log("User disconnected",socket.id)
    })
})






server.listen(5000,()=>{
    console.log("Connected")
})
