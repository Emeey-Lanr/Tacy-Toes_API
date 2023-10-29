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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserH = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../config/db");
const nodemailer_1 = __importDefault(require("nodemailer"));
class UserH {
    static userExist(columnName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // two username should exit, same goes for email also
            try {
                const query = `SELECT email FROM user_tb WHERE ${columnName} = $1`;
                const checkIfQuery = yield db_1.pool.query(`${query}`, [data]);
                if (checkIfQuery.rows.length > 0) {
                    return true;
                }
                return false;
            }
            catch (error) {
                return new Error(error.message);
            }
        });
    }
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordHashing = yield bcryptjs_1.default.hash(password, 10);
                return passwordHashing;
            }
            catch (error) {
                return new Error("Unable to hash password");
            }
        });
    }
    static verifyPassword(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifiedPassword = yield bcryptjs_1.default.compare(password, hashedPassword);
            return verifiedPassword;
        });
    }
    static checkIfEmailOrUsername(emailUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            let type = '';
            const check = emailUsername.split("@");
            if (check.length > 1) {
                return type = 'email';
            }
            return type = 'username';
        });
    }
    static sendEmail(token, userEmail, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transporter = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: `${process.env.APP_EMAIL}`,
                        pass: `${process.env.EMAIL_PASS}`,
                    }
                });
                const mailOption = {
                    from: '',
                    to: `${userEmail}`,
                    subject: 'Email Verification',
                    text: '',
                    html: `${email}`
                };
                const sendMail = yield transporter.sendMail(mailOption);
            }
            catch (error) {
                return new Error("An error occured, couldn't send email");
            }
        });
    }
}
exports.UserH = UserH;
