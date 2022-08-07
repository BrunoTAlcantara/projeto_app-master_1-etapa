import { PrismaClient } from "@prisma/client";

import { IDonationRepository } from "../../repositories/IDonationRepository";
import {
  ICreateDonation,
  IResponseDonation,
} from "../../useCases/CreateDonation/createDonationDTO";

class DonationsRepository implements IDonationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async list(): Promise<any> {
    const donations = await this.prisma.donation.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        giver: true,
        deviceCount: true,
        devices: true,
      },
    });
    console.log(typeof donations);
    return donations;
  }

  async create({
    giver,
    devices,
    deviceCount,
  }: ICreateDonation): Promise<IResponseDonation> {
    const exist = await this.prisma.giver.findFirst({
      where: {
        phone: giver.phone,
      },
    });

    let where = {};

    if (giver.email === undefined || exist) {
      where = { phone: giver.phone };
    } else {
      where = { email: giver.email };
    }

    const dbDonation = await this.prisma.donation.create({
      data: {
        giver: {
          connectOrCreate: {
            where,
            create: giver,
          },
        },
        deviceCount,
        devices: {
          create: devices,
        },
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        giver: true,
        deviceCount: true,
        devices: true,
      },
    });

    return dbDonation;
  }
}

export { DonationsRepository };
