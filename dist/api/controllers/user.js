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
exports.updateViewedNotification = exports.changePassword = exports.getUserDetails = exports.verifyEmail = exports.signinC = exports.signupC = void 0;
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
const signinC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginUser = yield user_1.UserS.signin(req.body);
        if (loginUser instanceof Error) {
            return (0, response_1.errorResponse)(res, 400, loginUser.message);
        }
        return (0, response_1.succesResponse)(res, 201, loginUser, 'Valid Crendetials');
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, 400, error.message);
    }
});
exports.signinC = signinC;
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
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userDetails = yield user_1.UserS.getUserDetails(req.params.id, `${(_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]}`);
        if (userDetails instanceof Error) {
            return (0, response_1.errorResponse)(res, 404, userDetails.message);
        }
        return (0, response_1.succesResponse)(res, 200, userDetails, 'Verification Succesfull');
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, 404, "An error occured fetching user's data");
    }
});
exports.getUserDetails = getUserDetails;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { old_password, new_password, email } = req.body;
    try {
        console.log(req.body);
        const changeUserPassword = yield user_1.UserS.changePassword(old_password, new_password, email);
        if (changeUserPassword instanceof Error) {
            return (0, response_1.errorResponse)(res, 404, changeUserPassword.message);
        }
        return (0, response_1.succesResponse)(res, 200, "", "Password Updated Successfully");
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, 404, "An error occured updating user's password");
    }
});
exports.changePassword = changePassword;
const updateViewedNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield user_1.UserS.updateNotificationViewed(`${req.body.username}`);
        if (update instanceof Error) {
            return (0, response_1.errorResponse)(res, 404, "An error occured");
        }
        return (0, response_1.succesResponse)(res, 200, update.updated, "Updated successfully");
    }
    catch (error) {
        (0, response_1.errorResponse)(res, 4000, "An error occured");
    }
});
exports.updateViewedNotification = updateViewedNotification;
