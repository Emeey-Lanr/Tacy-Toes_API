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
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use(express_1.default.urlencoded({ extended: true }));
(0, user_1.middleWare)(app);
const io = new socket_io_1.Server(httpServer, { cors: { origin: "*" } });
io.on("connection", (socket) => {
    socket.on("Hello", (data) => {
        console.log(data);
    });
    socket.emit("id", socket.id);
    socket.on("disconnect", () => {
        // console.log("someone disconnected")
    });
});
httpServer.listen(process.env.PORT, () => {
    console.log(`app has started @ ${process.env.PORT}`);
});
