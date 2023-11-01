"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleWare = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../routes/user");
const cors_1 = __importDefault(require("cors"));
const game_1 = require("../routes/game");
const middleWare = (app) => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use("/user", user_1.userRoute);
    app.use("/game", game_1.gameRoute);
};
exports.middleWare = middleWare;
