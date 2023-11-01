"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
exports.userRoute = express_1.default.Router();
const user_validation_1 = require("../validations/user.validation");
const index_user_1 = require("../controllers/index.user");
/**
 * @tacky
 *  /signup:
 *   post:
 *     description:register user
 *       responses:
 *        200:
 *          description:success
 */
exports.userRoute.post("/signup", user_validation_1.userValidation.signup, index_user_1.userC.signupC);
exports.userRoute.post("/signin", index_user_1.userC.signinC);
exports.userRoute.get("/getUser/:id", index_user_1.userC.getUserDetails);
exports.userRoute.put("/verify/email/:id", index_user_1.userC.verifyEmail);
exports.userRoute.put("/changePassword", index_user_1.userC.changePassword);
