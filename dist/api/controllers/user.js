"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.signupC = void 0;
const user_1 = require("../services/user");
const response_1 = require("../utils/response");
const signupC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registerUser = yield user_1.UserS.signup(req.body);
        if (registerUser instanceof Error) {
            return (0, response_1.errorResponse)(res, 400, registerUser.message);
        }
        return (0, response_1.succesResponse)(res, 201, registerUser, 'Registartion Sucessfull');
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, 400, error.message);
    }
});
exports.signupC = signupC;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verification = yield user_1.UserS.verifyEmail(`${req.params.id}`, req.body.token);
        if (verification instanceof Error) {
            return (0, response_1.errorResponse)(res, 404, verification.message);
        }
        return (0, response_1.succesResponse)(res, 200, verification, 'Verification Successful');
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, 404, "An error during verification");
    }
});
exports.verifyEmail = verifyEmail;
