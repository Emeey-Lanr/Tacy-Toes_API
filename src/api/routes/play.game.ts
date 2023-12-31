import express from "express";
import { PlayGameC } from "../controllers/play.game";

export const playGameRoute = express.Router()


playGameRoute.get("", PlayGameC.verifyUser)