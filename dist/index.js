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
    socket.on("joinSocketApp", (data) => {
        joinRoom(data.username);
    });
    socket.on("sendNotification", (data) => {
        io.sockets.to(`${data.info.player_username}`).emit(`incomingNotification`, { notification: { username: data.info.player_username, notification: `@${data.info.username} added you as a versus`, game_title: data.info.game_name, game_id: data.game_id, viewed: false } });
    });
    socket.on("joinGame", (data) => {
        // Join room for different users and the same emiting of message
        joinRoom(`${data.isOwner ? data.gameDetails.creator_username : data.gameDetails.player_username}`);
        joinRoom(`${data.gameDetails.game_id + data.gameDetails.player_username}`);
        const addUserReturnedData = socketLogic_1.SocketLogicF.addUser(data);
        if (addUserReturnedData.statusNumber === 0) {
            // No one starts cause no one has started
            io.sockets.to(data.isOwner ? `${data.gameDetails.creator_username}` : `${data.gameDetails.player_username}`).emit("onePersonJoined", { message: "You can only start if your opponent joins", joined: false });
        }
        else if (addUserReturnedData.statusNumber === 1) {
            addUserReturnedData.whoHasJoined.length > 1 && io.sockets.to(`${data.gameDetails.creator_username}`).emit("startGameNotification", { startGame: true, opponentsName: data.gameDetails.player_username });
        }
    });
    socket.on("navigateToStartGame", (data) => {
        const { creator, versus, gameId, startId } = data;
        const gameDetails = socketLogic_1.SocketLogicF.FindGameToStart(creator, versus, gameId);
        // if the error is true, then there will be no data
        // but if the error is false, there will be data
        if (!gameDetails.error) {
            io.sockets.to(`${startId}`).emit("changePhase", { start: true, gameInfo: gameDetails });
        }
    });
    socket.on("playGame", (data) => {
        const { signatureSign, arrayPositionId, isOwner, creator, versus, socketId, gameId } = data;
        const game = socketLogic_1.SocketLogicF.playGame(isOwner, creator, versus, gameId, arrayPositionId, signatureSign);
        // meaning no winner has occured, cause it only changes from
        // null to either true or false, and if it's false
        // if it's true there a winner,
        // if it's false, that means all boxes and that's a draw
        if ((game === null || game === void 0 ? void 0 : game.checkIfWinner.winner) === null) {
            io.sockets.to(socketId).emit("continueGame", { gameInfo: game.userCurrentGame, winnerChecker: game.checkIfWinner });
        }
        else {
            io.sockets.to(socketId).emit("checkWinnerDraw", { gameInfo: game === null || game === void 0 ? void 0 : game.userCurrentGame, winnerChecker: game === null || game === void 0 ? void 0 : game.checkIfWinner });
        }
    });
    socket.on("disconnect", () => {
        // console.log("someone disconnected")
    });
});
httpServer.listen(process.env.PORT, () => {
    console.log(`app has started @ ${process.env.PORT}`);
});
