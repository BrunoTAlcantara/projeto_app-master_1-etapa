"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError {
    constructor(errorMessage, error, requiredFields) {
        this.error = error;
        this.requiredFields = requiredFields;
        this.errorMessage = errorMessage;
    }
}
exports.AppError = AppError;
