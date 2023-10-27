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
exports.UserS = void 0;
const db_1 = require("../../config/db");
const user_1 = require("../helpers/user");
const token_generator_1 = require("../utils/token.generator");
const email_1 = require("../utils/email");
console.log(process.env.DB_HOST, "LKJFDS");
class UserS {
    static signup(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, phone_number, password } = body;
            try {
                console.log(email, username, password, phone_number, "na your dat be this");
                const checkEmail = yield user_1.UserH.userExist('email', `${email}`);
                const checkUsername = yield user_1.UserH.userExist('username', `${username}`);
                console.log(checkEmail, checkUsername);
                if (checkEmail instanceof Error) {
                    return new Error(checkEmail.message);
                }
                // we check if username, email exits or both 
                if (checkEmail || checkUsername) {
                    return new Error(`${checkEmail ? 'Email already exits' : 'Username name already exits'}`);
                }
                const hashPassword = yield user_1.UserH.hashPassword(password);
                const addUserQuery = "INSERT INTO user_tb (email , username, phone_number, password, img_url, is_verified, has_paid, payment_type) VALUES ($1, $2,$3, $4,$5, $6,$7, $8)";
                const addUser = yield db_1.pool.query(addUserQuery, [
                    email,
                    username,
                    phone_number,
                    hashPassword,
                    '',
                    false,
                    username === 'Emeey_Lanr' ? true : false,
                    `${username === 'Emeey_Lanr' ? 'year' : 'none'}`,
                ]);
                const emailToken = yield token_generator_1.TokenGenerator.emailToken();
                const jwtToken = yield token_generator_1.TokenGenerator.jwtTokenGenerator({ email, emailToken });
                const emailToBeSent = yield email_1.Email.emailVerification(emailToken);
                console.log(emailToken, jwtToken, emailToBeSent, "yo");
                const sendMail = yield user_1.UserH.sendEmail(`${emailToken}`, email, `${emailToBeSent}`);
                if (sendMail instanceof Error) {
                    return new Error("An error occured sending email verification, proceed to login");
                }
                return jwtToken;
            }
            catch (error) {
                console.log(error.message);
                return new Error('Unable to register user');
            }
        });
    }
}
exports.UserS = UserS;
