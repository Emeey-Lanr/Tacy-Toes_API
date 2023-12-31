import express,{ Express, Request, Response } from "express"
import { userRoute } from "../routes/user"
import cors from "cors"
import { gameRoute } from "../routes/game"
import { playGameRoute } from "../routes/play.game"

export const middleWare = (app: Express) => {
  app.use(cors())
  app.use(express.urlencoded({extended:true}))
  app.use(express.json())

  app.use("/user", userRoute)   
  app.use("/game", gameRoute)
  app.use("/play/game", playGameRoute)

}