import Joi from "joi";
export const createGame = Joi.object({
  game_name: Joi.string().required(),
  player_username:Joi.string().required(),
  email:  Joi.string().email().required(),
  username: Joi.string().required(),
});