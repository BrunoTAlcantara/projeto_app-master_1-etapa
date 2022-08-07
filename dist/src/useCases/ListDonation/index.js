"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const DonationsRepository_1 = require("../../infra/repositories/DonationsRepository");
const listDonationController_1 = require("./listDonationController");
const listDonationUseCase_1 = require("./listDonationUseCase");
exports.default = () => {
    const prisma = new client_1.PrismaClient();
    const donationRepository = new DonationsRepository_1.DonationsRepository(prisma);
    const listDonationUseCase = new listDonationUseCase_1.ListDonationUseCase(donationRepository);
    const listDonationController = new listDonationController_1.ListDonationController(listDonationUseCase);
    return listDonationController;
};
