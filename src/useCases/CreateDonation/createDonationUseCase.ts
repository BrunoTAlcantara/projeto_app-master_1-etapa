import { IDonationRepository } from "../../repositories/IDonationRepository";
import { IDataDonation } from "./createDonationDTO";

export class CreateDonationUseCase {
  constructor(private donationRepository: IDonationRepository) {}

  async execute({
    name,
    email,
    phone,
    zip,
    city,
    state,
    streetAddress,
    number,
    complement,
    neighborhood,
    deviceCount,
    devices,
  }: IDataDonation) {
    const giver = {
      name,
      email,
      phone,
      zip,
      city,
      state,
      streetAddress,
      number,
      complement,
      neighborhood,
    };

    const createDonation = this.donationRepository.create({
      giver,
      deviceCount,
      devices,
    });

    return createDonation;
  }
}
