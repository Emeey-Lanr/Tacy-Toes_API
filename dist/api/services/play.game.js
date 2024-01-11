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
exports.PlayGameS = void 0;
const db_1 = require("../../config/db");
const token_generator_1 = require("../utils/token.generator");
class PlayGameS {
    static verifyUserS(jwt, ownerUsername, playerUsername, gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyJwt = yield token_generator_1.TokenGenerator.decodeJwt(jwt);
                if (verifyJwt instanceof Error) {
                    // Tell them to sign in or signup
                    return new Error("Invalid Token");
                }
                // Check who is trying to access the link in correlation to the jwt verification details
                const checkWhoIsTryingToAcessTheLinkArray = [ownerUsername, playerUsername];
                const checkWhoIsTryingToAcessTheLink = checkWhoIsTryingToAcessTheLinkArray.find((value) => value === verifyJwt.username);
                if (!checkWhoIsTryingToAcessTheLink) {
                    return new Error("Invalid Acess");
                }
                // Check if is the owner, if it's the owner, set it to true,
                // if not the owner set it to false, that means it the player he
                // wants to play with cause a verification for both users have been done
                let isOwner = ownerUsername === verifyJwt.username ? true : false;
                //Checking if Game Exist 
                const checkifGameExist = yield db_1.pool.query("SELECT * FROM game_tb WHERE creator_username = $1 AND player_username = $2 AND game_id = $3", [ownerUsername, playerUsername, gameId]);
                if (checkifGameExist.rows.length < 1) {
                    return new Error("Invalid Game Link, Game Doesn't exist");
                }
                if (checkifGameExist.rows[0].played) {
                    return new Error("Game Played Already, Create a New Game");
                }
                return { isOwner, gameDetails: checkifGameExist.rows[0] };
            }
            catch (error) {
                console.log(error);
                return new Error(error.message);
            }
        });
    }
    static saveGame(creatorScore, versusScore, gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateGame = yield db_1.pool.query("UPDATE game_tb SET creator_score = $1, player_score = $2, played = $3 WHERE game_id = $4", [creatorScore, versusScore, true, gameId]);
                return true;
            }
            catch (error) {
            }
        });
    }
}
exports.PlayGameS = PlayGameS;
