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
exports.GAMES = void 0;
const db_1 = require("../../config/db");
const user_1 = require("../helpers/user");
const token_generator_1 = require("../utils/token.generator");
class GAMES {
    static createGame(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ifPlayerExist = yield db_1.pool.query("SELECT email FROM user_tb WHERE username = $1", [body.player_username]);
                if (ifPlayerExist.rows.length < 1) {
                    return new Error("Username Doesn't Exist");
                }
                const searchGameExist = yield db_1.pool.query("SELECT game_name FROM game_tb WHERE game_name = $1 AND creator_username = $2", [body.game_name, body.username]);
                if (searchGameExist.rows.length > 0) {
                    return new Error("Game Name Already Exist");
                }
                const gameId = yield token_generator_1.TokenGenerator.gameId(body.username);
                const createGameQuery = "INSERT INTO game_tb( creator_username, creator_email, game_name, player_username, game_id, creator_score, player_score, played) VALUES($1,$2,$3,$4,$5,$6,$7,$8)";
                const createNewGame = yield db_1.pool.query(createGameQuery, [body.username, body.email, body.game_name, body.player_username, gameId, 0, 0, false]);
                const createdGameQuery = "SELECT game_name, player_username, game_id  FROM game_tb WHERE game_name = $1 AND creator_username = $2";
                const getCreatedGame = yield db_1.pool.query(createdGameQuery, [body.game_name, body.username]);
                const nofication = yield db_1.pool.query("INSERT INTO notification_tb(username, notification, game_title, game_id, viewed) VALUES($1, $2, $3, $4, $5)", [body.player_username, `@${body.username} added you as a versus`, body.game_name, gameId, false]);
                return getCreatedGame.rows;
            }
            catch (error) {
                return new Error("An error occured, creating new game");
            }
        });
    }
    static deleteGame(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteQuiz = yield db_1.pool.query("DELETE FROM game_tb WHERE game_name = $1 AND creator_username = $2 AND game_id = $3", [payload[2], payload[1], payload[0]]);
                const getAllGames = yield db_1.pool.query("SELECT * FROM game_tb WHERE creator_username = $1", [payload[1]]);
                return getAllGames.rows;
            }
            catch (error) {
                return new Error("An error occured unable to delete game");
            }
        });
    }
    static getCurrentGame(username, game_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchIfUserExist = yield user_1.UserH.userExist('username', username);
                if (!searchIfUserExist) {
                    return new Error("Invalid Access");
                }
                const searchGameExist = yield db_1.pool.query("SELECT * FROM game_tb WHERE creator_username = $1 AND game_id = $2", [username, game_id]);
                if (searchGameExist.rows.length < 1) {
                    return new Error("Invalid Acess");
                }
                return searchGameExist.rows[0];
            }
            catch (error) {
                return new Error(`${error.message}`);
            }
        });
    }
}
exports.GAMES = GAMES;
