import { pool } from "../../config/db";
import { UserH } from "../helpers/user";
import { TokenGenerator } from "../utils/token.generator";

export class GAMES {
    static async createGame(body:{game_name:string, player_username:string, email:string, username:string}) {
        try {
            const ifPlayerExist = await pool.query("SELECT email FROM user_tb WHERE username = $1", [body.player_username])
            if (ifPlayerExist.rows.length < 1) {
                return new Error("Username Doesn't Exist")
            }
            const searchGameExist  = await pool.query("SELECT game_name FROM game_tb WHERE game_name = $1 AND creator_username = $2",[body.game_name, body.username])
            if (searchGameExist.rows.length > 0) {
                return new Error("Game Name Already Exist")
            }
            const gameId = await TokenGenerator.gameId(body.username);
            const createGameQuery =
              "INSERT INTO game_tb( creator_username, creator_email, game_name, player_username, game_id, creator_score, player_score, played) VALUES($1,$2,$3,$4,$5,$6,$7,$8)";
            const createNewGame = await pool.query(  createGameQuery,[body.username, body.email, body.game_name, body.player_username, gameId, 0, 0, false]);

            const createdGameQuery = "SELECT game_name, player_username, game_id  FROM game_tb WHERE game_name = $1 AND creator_username = $2"
            const getCreatedGame = await pool.query(createdGameQuery, [body.game_name, body.username])
            const nofication = await pool.query("INSERT INTO notification_tb(username, notification, game_title, game_id, viewed) VALUES($1, $2, $3, $4, $5)", [body.player_username, `@${body.username} added you as a versus`, body.game_name, gameId, false])
            return getCreatedGame.rows
        } catch (error:any) {
              return new Error("An error occured, creating new game");
        }
    }
    static async deleteGame(payload:string[]) {
        try {
      
            const deleteQuiz = await pool.query("DELETE FROM game_tb WHERE game_name = $1 AND creator_username = $2 AND game_id = $3", [payload[2], payload[1], payload[0]])
            const getAllGames = await pool.query("SELECT * FROM game_tb WHERE creator_username = $1", [payload[1]])
            
            return getAllGames.rows
        } catch (error) {
      
            return new Error("An error occured unable to delete game")
        }
    }
    static async getCurrentGame(username:string, game_id:string) {
        try {
          
            const searchIfUserExist = await UserH.userExist('username', username)
            if (!searchIfUserExist) {
                return new Error("Invalid Access")
            }
            const searchGameExist = await pool.query( "SELECT * FROM game_tb WHERE creator_username = $1 AND game_id = $2", [username, game_id]);
             
            if (searchGameExist.rows.length < 1) {
              return new Error("Invalid Acess")
            }
          
            return searchGameExist.rows[0]
        } catch (error:any) {
            return new Error(`${error.message}`)
        }
        
    }
}