import { PrismaClient } from "@prisma/client";

import { DonationsRepository } from "../../infra/repositories/DonationsRepository";
import { CreateDonationController } from "./createDonationController";
import { CreateDonationUseCase } from "./createDonationUseCase";

export default (): CreateDonationController => {
  const prisma = new PrismaClient();
  const donationRepository = new DonationsRepository(prisma);
  const createDonationUseCase = new CreateDonationUseCase(donationRepository);

  const createDonationController = new CreateDonationController(
    createDonationUseCase
  );

  return createDonationController;
};
