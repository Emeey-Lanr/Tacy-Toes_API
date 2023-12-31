"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameRoute = void 0;
const express_1 = __importDefault(require("express"));
const index_game_1 = require("../controllers/index.game");
const game_validation_1 = require("../validations/game.validation");
exports.gameRoute = express_1.default.Router();
exports.gameRoute.post("/create", game_validation_1.GameValidation.validateBeforeCreation, index_game_1.gameC.createGame);
exports.gameRoute.delete("/delete/:id", index_game_1.gameC.deleteGame);
exports.gameRoute.get("/get/current/game", index_game_1.gameC.getCurrentGame);
