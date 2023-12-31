"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGame = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createGame = joi_1.default.object({
    game_name: joi_1.default.string().required(),
    player_username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().required(),
});
