"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
exports.userRoute = express_1.default.Router();
const user_validation_1 = require("../validations/user.validation");
const controllers_1 = require("../controllers");
/**
 * @tacky
 *  /signup:
 *   post:
 *     description:register user
 *       responses:
 *        200:
 *          description:success
 */
exports.userRoute.post("/signup", user_validation_1.userValidation.signup, controllers_1.userC.signupC);
exports.userRoute.put("/verify/email/:id", controllers_1.userC.verifyEmail);
