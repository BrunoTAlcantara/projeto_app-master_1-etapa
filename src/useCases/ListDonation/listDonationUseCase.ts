import { IDonationRepository } from "../../repositories/IDonationRepository";

export class ListDonationUseCase {
  constructor(private donationRepository: IDonationRepository) {}

  async execute() {
    const donation = await this.donationRepository.list();

    return donation;
  }
}
