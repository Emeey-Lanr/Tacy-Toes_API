"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = exports.swaggerOption = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
exports.swaggerOption = {
    definition: {
        tacky: "1.00",
        info: {
            title: "Tacky Toes API",
            version: "1.0.0",
        },
    },
    apis: ["./api/routes/user.ts", "./src/api/routes/*.ts"],
};
exports.swaggerDocs = (0, swagger_jsdoc_1.default)(exports.swaggerOption);
