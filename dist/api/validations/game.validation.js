"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameValidation = void 0;
const game_schema_1 = require("../utils/game.schema");
const response_1 = require("../utils/response");
class GameValidation {
    static validateBeforeCreation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = game_schema_1.createGame.validate(req.body, { abortEarly: false });
            if (error) {
                return (0, response_1.errorResponse)(res, 422, `${error.message}`);
            }
            return next();
        });
    }
}
exports.GameValidation = GameValidation;
