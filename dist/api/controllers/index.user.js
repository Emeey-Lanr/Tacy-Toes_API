"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userC = void 0;
const user_1 = require("./user");
exports.userC = {
    signupC: user_1.signupC,
    signinC: user_1.signinC,
    verifyEmail: user_1.verifyEmail,
    getUserDetails: user_1.getUserDetails
};
