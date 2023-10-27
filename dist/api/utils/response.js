"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.succesResponse = exports.errorResponse = void 0;
const errorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({ message, status: false });
};
exports.errorResponse = errorResponse;
const succesResponse = (res, statusCode, info, message) => {
    res.status(statusCode).json({ info, message, status: true });
};
exports.succesResponse = succesResponse;
