"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const user_1 = require("./api/middlewares/user");
const socketLogic_1 = require("./socket/socketLogic");
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use(express_1.default.urlencoded({ extended: true }));
(0, user_1.middleWare)(app);
const io = new socket_io_1.Server(httpServer, { cors: { origin: "*" } });
io.on("connection", (socket) => {
    const joinRoom = (roomId) => {
        socket.join(roomId);
    };
    socket.on("joinGame", (data) => {
        // Join room for different and the same emiting of message
        joinRoom(`${data.isOwner ? data.gameDetails.creator_username : data.gameDetails.player_username}`);
        joinRoom(`${data.gameDetails.gameid + data.gameDetails.player_username}`);
        const addUserReturnedData = socketLogic_1.SocketLogicF.addUser(data);
        if (addUserReturnedData.statusNumber === 0) {
            // No one starts cause no one has started
            io.sockets.to(data.isOwner ? `${data.gameDetails.creator_username}` : `${data.gameDetails.player_username}`).emit("onePersonJoined", { message: "You can only start if your opponent joins", joined: false });
        }
        else if (addUserReturnedData.statusNumber === 1) {
            console.log(addUserReturnedData.whoHasJoined);
            addUserReturnedData.whoHasJoined.length > 1 && io.sockets.to(`${data.gameDetails.creator_username}`).emit("startGameNotification", { startGame: true });
        }
    });
    socket.on("disconnect", () => {
        // console.log("someone disconnected")
    });
});
httpServer.listen(process.env.PORT, () => {
    console.log(`app has started @ ${process.env.PORT}`);
});
