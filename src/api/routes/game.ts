import express from "express"
import { gameC } from "../controllers/index.game"
export const gameRoute = express.Router()

gameRoute.post("/create", gameC.createGame)