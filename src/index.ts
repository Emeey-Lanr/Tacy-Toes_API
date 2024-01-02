import express, { Express } from "express";
import dotenv from "dotenv"
import { createServer } from "http"
import {Server, Socket} from "socket.io"
import { middleWare } from "./api/middlewares/user";
import { SocketLogicF } from "./socket/socketLogic";

dotenv.config()

const app: Express = express() 
const httpServer = createServer(app)
app.use(express.urlencoded({ extended: true }))
middleWare(app)


const io = new Server(httpServer, { cors: { origin: "*" } })

io.on("connection", (socket: Socket) => {
    const joinRoom = (roomId:string) => {
        socket.join(roomId)
    }
    socket.on("joinGame", (data) => {
       
    // Join room for different and the same emiting of message

    joinRoom(`${data.isOwner ?  data.gameDetails.creator_username : data.gameDetails.player_username}`);
    joinRoom(`${data.gameDetails.gameid + data.gameDetails.player_username}`)
   
        const addUserReturnedData = SocketLogicF.addUser(data)
        if (addUserReturnedData.statusNumber === 0) {
            // No one starts cause no one has started
           io.sockets.to(data.isOwner ? `${data.gameDetails.creator_username}` : `${data.gameDetails.player_username}`).emit("onePersonJoined", {message:"You can only start if your opponent joins", joined:false})
        
        } else if (addUserReturnedData.statusNumber === 1) {
             console.log(socket.rooms)
            addUserReturnedData.whoHasJoined.length > 1 && io.sockets.to(`${data.gameDetails.creator_username}`).emit("startGameNotification", {startGame:true, opponentsName:data.gameBoxDetails.player_username})
            
        }
    
    
})
  

    socket.on("disconnect", () => {
        // console.log("someone disconnected")
    })
})

httpServer.listen(process.env.PORT, () => {
    console.log(`app has started @ ${process.env.PORT}`)
})