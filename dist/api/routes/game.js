"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameRoute = void 0;
const express_1 = __importDefault(require("express"));
const index_game_1 = require("../controllers/index.game");
exports.gameRoute = express_1.default.Router();
exports.gameRoute.post("/create", index_game_1.gameC.createGame);
