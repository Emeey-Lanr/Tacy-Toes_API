import express from "express"
import { gameC } from "../controllers/index.game"
import { GameValidation } from "../validations/game.validation"
export const gameRoute = express.Router()

gameRoute.post("/create", GameValidation.validateBeforeCreation,  gameC.createGame)
gameRoute.delete("/delete/:id", gameC.deleteGame)
gameRoute.get("/get/current/game",gameC.getCurrentGame)