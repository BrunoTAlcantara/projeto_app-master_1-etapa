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
const server_1 = require("./server");
const supertest_1 = __importDefault(require("supertest"));
describe("Create Donation Form", () => {
    it("should be send missing fields", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post("/donation").send({
            "name": "bruno",
            "email": "b@gmail.com",
            "phone": "11971944409",
            "zip": "38300-114",
        });
        expect(response.body.error).toBe(true);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("errorMessage");
        expect(response.body).toHaveProperty("requiredFields");
    }));
    it("should be inform an invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post("/donation").send({
            "name": "bruno",
            "email": "email",
            "phone": "236123136127",
            "zip": "3247324823478",
            "city": "Ituiutaba",
            "state": "Minas Gerais",
            "streetAddress": "23123",
            "number": "31837",
            "complement": "frente mercado",
            "neighborhood": "sei nao",
            "deviceCount": 2,
            "devices": [
                { "type": "notebook", "condition": "broken" },
                { "type": "desktop", "condition": "broken" }
            ]
        });
        expect(response.body.error).toBe(true);
        expect(response.statusCode).toBe(400);
        expect(response.body.errorMessage).toBe("Campo email esta no formato incorreto! Tente utilizar email@email.com");
    }));
    it("should be send complete personal data, but not send devices", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post("/donation").send({
            "name": "bruno",
            "email": "brunotheodoro123@gmail.com",
            "phone": "236123136127",
            "zip": "3247324823478",
            "city": "Ituiutaba",
            "state": "Minas Gerais",
            "streetAddress": "23123",
            "number": "31837",
            "complement": "frente mercado",
            "neighborhood": "sei nao",
            "deviceCount": 1
        });
        expect(response.body.error).toBe(true);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("errorMessage");
        expect(response.body.requiredFields).toStrictEqual(["devices"]);
    }));
    it("should be deviceCount is different from the amount of items sent on devices", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post("/donation").send({
            "name": "bruno",
            "email": "brunotheodoro123@gmail.com",
            "phone": "236123136127",
            "zip": "3247324823478",
            "city": "Ituiutaba",
            "state": "Minas Gerais",
            "streetAddress": "23123",
            "number": "31837",
            "complement": "frente mercado",
            "neighborhood": "sei nao",
            "deviceCount": 2,
            "devices": [
                { "type": "notebook", "condition": "broken" },
            ]
        });
        expect(response.body.error).toBe(true);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("errorMessage");
    }));
    it("should be that sends an invalid device type", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post("/donation").send({
            "name": "bruno",
            "email": "brunotheodoro123@gmail.com",
            "phone": "236123136127",
            "zip": "3247324823478",
            "city": "Ituiutaba",
            "state": "Minas Gerais",
            "streetAddress": "23123",
            "number": "31837",
            "complement": "frente mercado",
            "neighborhood": "sei nao",
            "deviceCount": 2,
            "devices": [
                { "type": "notebook", "condition": "broken" },
                { "type": "teste", "condition": "broken" }
            ]
        });
        expect(response.body.error).toBe(true);
        expect(response.statusCode).toBe(400);
        expect(response.body.errorMessage).toStrictEqual("teste NÃO é valido, tente uma das opções validas");
    }));
    it("should be that sends an invalid device condition", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post("/donation").send({
            "name": "bruno",
            "email": "brunotheodoro123@gmail.com",
            "phone": "236123136127",
            "zip": "3247324823478",
            "city": "Ituiutaba",
            "state": "Minas Gerais",
            "streetAddress": "23123",
            "number": "31837",
            "complement": "frente mercado",
            "neighborhood": "sei nao",
            "deviceCount": 2,
            "devices": [
                { "type": "notebook", "condition": "broken" },
                { "type": "desktop", "condition": "teste" }
            ]
        });
        expect(response.body.error).toBe(true);
        expect(response.statusCode).toBe(400);
        expect(response.body.errorMessage).toStrictEqual("teste NÃO é valido, tente uma das opções validas");
    }));
    it("should be that sends an invalid type form", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post("/donation").send({
            "name": 123231,
            "email": "brunotheodoro123@gmail.com",
            "phone": "236123136127",
            "zip": "3247324823478",
            "city": "Ituiutaba",
            "state": "Minas Gerais",
            "streetAddress": "23123",
            "number": "31837",
            "complement": "frente mercado",
            "neighborhood": "sei nao",
            "deviceCount": "dad",
            "devices": [
                { "type": "notebook", "condition": "broken" },
                { "type": "desktop", "condition": "broken" }
            ]
        });
        expect(response.body.error).toBe(true);
        expect(response.statusCode).toBe(400);
    }));
    it("should be that sends data correct", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post("/donation").send({
            "name": "bruno",
            "email": "email@gmail.com",
            "phone": "236123136127",
            "zip": "3247324823478",
            "city": "Ituiutaba",
            "state": "Minas Gerais",
            "streetAddress": "23123",
            "number": "31837",
            "complement": "frente mercado",
            "neighborhood": "sei nao",
            "deviceCount": 2,
            "devices": [
                { "type": "screen", "condition": "broken" },
                { "type": "printer", "condition": "broken" }
            ]
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({ "success": true });
    }));
});
