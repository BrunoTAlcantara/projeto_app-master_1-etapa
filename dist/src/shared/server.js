"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../../swagger.json"));
const donation_routes_1 = require("./routes/donation.routes");
const AppError_1 = require("./util/AppError");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(donation_routes_1.donationRoutes);
app.use((err, request, response, next) => {
    if (err instanceof AppError_1.AppError) {
        return response.status(400).json(err);
    }
    return response.status(500).json({
        status: "error",
        message: `Internal Server error - ${err.message}`,
    });
});
