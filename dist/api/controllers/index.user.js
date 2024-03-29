"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userC = void 0;
const user_1 = require("./user");
exports.userC = {
    signupC: user_1.signupC,
    signinC: user_1.signinC,
    verifyEmail: user_1.verifyEmail,
    getUserDetails: user_1.getUserDetails,
    changePassword: user_1.changePassword,
    verifyResetForgotPasssord: user_1.verifyResetForgotPasssord,
    verifyForgotPasswordToken: user_1.verifyForgotPasswordToken,
    newForgotPassword: user_1.newForgotPassword,
    updateViewedNotification: user_1.updateViewedNotification
};
