"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationRoutes = void 0;
const express_1 = require("express");
const CreateDonationController_1 = require("../Donation/CreateDonationController");
const validation_1 = require("../Donation/validation");
//Validação Shema
const shemaDonation = {
    name: {
        required: "name",
        type: "string",
    },
    email: {
        type: "email"
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
        type: "number"
    },
    devices: {
        required: "devices",
    }
};
const donationRoutes = (0, express_1.Router)();
exports.donationRoutes = donationRoutes;
const createDonationController = new CreateDonationController_1.CreateDonationController();
donationRoutes.post("/donation", (0, validation_1.validate)(shemaDonation), createDonationController.handle);
