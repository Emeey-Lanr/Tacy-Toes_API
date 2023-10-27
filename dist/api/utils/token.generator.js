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
exports.TokenGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenGenerator {
    static jwtTokenGenerator(the_token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const generatedToken = yield jsonwebtoken_1.default.sign({ data: the_token }, `${process.env.JWT_SECRET}`, { expiresIn: "1hr" });
                return generatedToken;
            }
            catch (error) {
            }
        });
    }
    static emailToken() {
        return __awaiter(this, void 0, void 0, function* () {
            let token = String(Math.floor(Math.random() * 10)) +
                String(Math.floor(Math.random() * 10)) +
                String(Math.floor(Math.random() * 10)) +
                String(Math.floor(Math.random() * 10));
            return token;
        });
    }
}
exports.TokenGenerator = TokenGenerator;
