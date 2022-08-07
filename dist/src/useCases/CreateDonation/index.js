"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const DonationsRepository_1 = require("../../infra/repositories/DonationsRepository");
const createDonationController_1 = require("./createDonationController");
const createDonationUseCase_1 = require("./createDonationUseCase");
exports.default = () => {
    const prisma = new client_1.PrismaClient();
    const donationRepository = new DonationsRepository_1.DonationsRepository(prisma);
    const createDonationUseCase = new createDonationUseCase_1.CreateDonationUseCase(donationRepository);
    const createDonationController = new createDonationController_1.CreateDonationController(createDonationUseCase);
    return createDonationController;
};
