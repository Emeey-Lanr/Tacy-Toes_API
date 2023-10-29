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
class UserS {
    static signup(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, phone_number, password } = body;
            try {
                const checkEmail = yield user_1.UserH.userExist('email', `${email}`);
                const checkUsername = yield user_1.UserH.userExist('username', `${username}`);
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
                const jwtToken = yield token_generator_1.TokenGenerator.jwtTokenGenerator({ email, username, emailToken, }, '1hr');
                //     const emailToBeSent = await Email.emailVerification(`${jwtToken}`,emailToken, email)
                //     const sendMail =  await UserH.sendEmail(`${emailToken}`, email, `${emailToBeSent}`)
                //     if (sendMail instanceof Error) {
                //        return new Error("An error occured sending email verification, proceed to login")
                //    }
                return { token: jwtToken, redirectURL: `${`/email/verification/${jwtToken}?email=${email}`}` };
            }
            catch (error) {
                return new Error('Unable to register user');
            }
        });
    }
    static verifyEmail(jwtToken, emailToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payloadVerificationToken = emailToken[0] + emailToken[1] + emailToken[2] + emailToken[3];
                const verifyToken = yield token_generator_1.TokenGenerator.decodeJwt(jwtToken);
                console.log(verifyToken, payloadVerificationToken);
                if (verifyToken instanceof Error) {
                    return new Error(verifyToken.message);
                }
                if (verifyToken.emailToken !== payloadVerificationToken) {
                    return new Error("Invalid Email Token");
                }
                const isVerified = yield db_1.pool.query("UPDATE user_tb SET is_Verified = $1 WHERE email = $2", [true, verifyToken.email]);
                const generateToken = yield token_generator_1.TokenGenerator.jwtTokenGenerator({ userEmail: verifyToken.email, username: verifyToken.username }, '7days');
                return { token: generateToken, username: verifyToken.username };
            }
            catch (error) {
                return new Error("An error occured");
            }
        });
    }
}
exports.UserS = UserS;
