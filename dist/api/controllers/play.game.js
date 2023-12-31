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
exports.PlayGameC = void 0;
const play_game_1 = require("../services/play.game");
const response_1 = require("../utils/response");
class PlayGameC {
    static verifyUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verificationDetails = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                const detailsSplit = verificationDetails === null || verificationDetails === void 0 ? void 0 : verificationDetails.split("/");
                const jwt = detailsSplit[0];
                const ownerUsername = detailsSplit[1];
                const playerUsername = detailsSplit[2];
                const gameId = detailsSplit[3];
                const verifyUserF = yield play_game_1.PlayGameS.verifyUserS(jwt, ownerUsername, playerUsername, gameId);
                if (verifyUserF instanceof Error) {
                    if (verifyUserF.message === "Invalid Token") {
                        return (0, response_1.errorResponse)(res, 404, "Redirect-To-Login");
                    }
                    return (0, response_1.errorResponse)(res, 404, verifyUserF.message);
                }
                return (0, response_1.succesResponse)(res, 200, verifyUserF, "Verification Successful");
            }
            catch (error) {
                return (0, response_1.errorResponse)(res, 400, "An error occcured");
            }
        });
    }
}
exports.PlayGameC = PlayGameC;
