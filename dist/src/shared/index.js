"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("./server");
dotenv_1.default.config();
const API_PORT = process.env.PORT || 3333;
server_1.app.listen(API_PORT, () => console.log(`Servidor rodando na porta ${API_PORT}`));
