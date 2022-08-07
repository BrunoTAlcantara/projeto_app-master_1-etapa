import { PrismaClient } from "@prisma/client";

import { DonationsRepository } from "../../infra/repositories/DonationsRepository";
import { ListDonationController } from "./listDonationController";
import { ListDonationUseCase } from "./listDonationUseCase";

export default (): ListDonationController => {
  const prisma = new PrismaClient();
  const donationRepository = new DonationsRepository(prisma);
  const listDonationUseCase = new ListDonationUseCase(donationRepository);

  const listDonationController = new ListDonationController(
    listDonationUseCase
  );

  return listDonationController;
};
