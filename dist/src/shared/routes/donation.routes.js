"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationRoutes = void 0;
const express_1 = require("express");
const CreateDonation_1 = __importDefault(require("../../useCases/CreateDonation"));
const ListDonation_1 = __importDefault(require("../../useCases/ListDonation"));
const validationDonation_1 = require("../middlewares/validationDonation");
// Validação Shema
const shemaDonation = {
    name: {
        required: "name",
        type: "string",
    },
    email: {
        type: "email",
    },
    phone: {
        required: "phone",
        type: "string",
    },
    zip: {
        required: "zip",
        type: "string",
    },
    city: {
        required: "city",
        type: "string",
    },
    state: {
        required: "state",
        type: "string",
    },
    streetAddress: {
        required: "steetAddress",
        type: "string",
    },
    number: {
        required: "number",
        type: "string",
    },
    complement: {
        type: "string",
    },
    neighborhood: {
        required: "neighborhood",
        type: "string",
    },
    deviceCount: {
        required: "deviceCount",
        type: "number",
    },
    devices: {
        required: "devices",
    },
};
const donationRoutes = (0, express_1.Router)();
exports.donationRoutes = donationRoutes;
donationRoutes.post("/donation", (0, validationDonation_1.validate)(shemaDonation), (response, request) => {
    return (0, CreateDonation_1.default)().handle(response, request);
});
donationRoutes.get("/donation", (response, request) => {
    return (0, ListDonation_1.default)().handle(response, request);
});
