import express, { Express } from "express";
import dotenv from "dotenv"
import { createServer } from "http"
import {Server, Socket} from "socket.io"
import { middleWare } from "./api/middlewares/user";

dotenv.config()

const app: Express = express() 
const httpServer = createServer(app)
app.use(express.urlencoded({ extended: true }))
middleWare(app)


const io = new Server(httpServer, { cors: { origin: "*" } })

io.on("connection", (socket: Socket) => {
    
socket.on("Hello", (data)=>{
    console.log(data)
})
    socket.emit("id", socket.id)

    socket.on("disconnect", () => {
        // console.log("someone disconnected")
    })
})

httpServer.listen(process.env.PORT, () => {
    console.log(`app has started @ ${process.env.PORT}`)
})