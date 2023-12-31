import { pool } from "../../config/db"
import { TokenGenerator } from "../utils/token.generator"


export  class PlayGameS {
    static async verifyUserS(jwt: string,ownerUsername:string, playerUsername: string, gameId: string,) {
        try {
            const verifyJwt = await TokenGenerator.decodeJwt(jwt)
            if (verifyJwt instanceof Error) {
                // Tell them to sign in or signup
                return new Error("Invalid Token")
            }
            // Check who is trying to access the link in correlation to the jwt verification details
            const checkWhoIsTryingToAcessTheLinkArray = [ownerUsername,playerUsername]
            const checkWhoIsTryingToAcessTheLink = checkWhoIsTryingToAcessTheLinkArray.find((value) => value === verifyJwt.username)
            if (!checkWhoIsTryingToAcessTheLink ) {
               return new Error("Invalid Acess")
            }
            // Check if is the owner, if it's the owner, set it to true,
            // if not the owner set it to false, that means it the player he
            // wants to play with cause a verification for both users have been done
            let isOwner = ownerUsername === verifyJwt.username ? true : false
            
             
            //Checking if Game Exist 
            const checkifGameExist = await pool.query("SELECT * FROM game_tb WHERE creator_username = $1 AND player_username = $2 AND game_id = $3", [ownerUsername, playerUsername, gameId])
            if (checkifGameExist.rows.length < 1) {
                return new Error("Invalid Game Link, Game Doesn't exist")
            }

            return {isOwner, gameDetails:checkifGameExist.rows[0]}


        } catch (error: any) {
            console.log(error)
            return new Error(error.message)
        }
        
    }
}