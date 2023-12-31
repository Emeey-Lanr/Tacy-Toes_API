import { Response, Request } from "express"
import { GAMES } from "../services/game"
import { errorResponse, succesResponse } from "../utils/response"
export const createGame = async (req:Request, res:Response) => {
    try {
        const create = await GAMES.createGame(req.body)
        if (create instanceof Error) {
            return errorResponse(res, 400, `${create.message}`)
        }
        return succesResponse(res, 200, create, "Game created succesfully")
    } catch (error) {
          return errorResponse(res, 400, `An error occured creating new game`);
    }
}

export const deleteGame = async (req:Request, res:Response) => {
    try {
       
        const data = req.params.id.split("-")
        const deleteFromGame = await GAMES.deleteGame(data)
        if (deleteFromGame instanceof Error) {
            return errorResponse(res, 404, deleteFromGame.message)
        }
       return  succesResponse(res, 200, deleteFromGame, "deleted succesfully")
    } catch (error) {
          return errorResponse(res, 400, `An error occured deleting game`);
    }
}
export const getCurrentGame = async (req:Request, res:Response) => {
    try {
        console.log(req.headers.authorization?.split(" ")[1].split("-"))
        const currentGame = await GAMES.getCurrentGame(
          `${req.headers.authorization?.split(" ")[1].split("-")[0]}`,
          `${req.headers.authorization?.split(" ")[1].split("-")[1]}`
        );
        if (currentGame instanceof Error) {
            return errorResponse(res, 400, `${currentGame.message}`)
        }
        console.log(currentGame)
        return succesResponse(res, 200, currentGame, 'Data gotten succesfully')

    } catch (error) {
          return errorResponse(res, 400, `An error occured getting game details`);
    }
}