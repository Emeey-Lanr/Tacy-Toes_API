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
exports.getCurrentGame = exports.deleteGame = exports.createGame = void 0;
const game_1 = require("../services/game");
const response_1 = require("../utils/response");
const createGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const create = yield game_1.GAMES.createGame(req.body);
        if (create instanceof Error) {
            return (0, response_1.errorResponse)(res, 400, `${create.message}`);
        }
        return (0, response_1.succesResponse)(res, 200, create, "Game created succesfully");
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, 400, `An error occured creating new game`);
    }
});
exports.createGame = createGame;
const deleteGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.params.id.split("-");
        const deleteFromGame = yield game_1.GAMES.deleteGame(data);
        if (deleteFromGame instanceof Error) {
            return (0, response_1.errorResponse)(res, 404, deleteFromGame.message);
        }
        return (0, response_1.succesResponse)(res, 200, deleteFromGame, "deleted succesfully");
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, 400, `An error occured deleting game`);
    }
});
exports.deleteGame = deleteGame;
const getCurrentGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        console.log((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1].split("-"));
        const currentGame = yield game_1.GAMES.getCurrentGame(`${(_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1].split("-")[0]}`, `${(_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1].split("-")[1]}`);
        if (currentGame instanceof Error) {
            return (0, response_1.errorResponse)(res, 400, `${currentGame.message}`);
        }
        console.log(currentGame);
        return (0, response_1.succesResponse)(res, 200, currentGame, 'Data gotten succesfully');
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, 400, `An error occured getting game details`);
    }
});
exports.getCurrentGame = getCurrentGame;
