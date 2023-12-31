"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playGameRoute = void 0;
const express_1 = __importDefault(require("express"));
const play_game_1 = require("../controllers/play.game");
exports.playGameRoute = express_1.default.Router();
exports.playGameRoute.get("", play_game_1.PlayGameC.verifyUser);
