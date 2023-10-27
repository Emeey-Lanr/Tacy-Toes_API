"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupValidationSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phone_number: joi_1.default.number().min(10).required(),
    password: joi_1.default.string().min(6).required()
});
