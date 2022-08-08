import { PrismaClient } from "@prisma/client";

import { IDonationRepository } from "../../repositories/IDonationRepository";
import {
  ICreateDonation,
  IResponseDonation,
} from "../../useCases/CreateDonation/createDonationDTO";
// Interface de repositories
class DonationsRepository implements IDonationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async exist(email: string, phone: string): Promise<any> {
    const exista = await this.prisma.giver.findFirst({
      where: {
        phone,
        email,
      },
    });

    return exista;
  }
  // listagem atravez do get
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

    return donations;
  }

  async create({
    giver,

    devices,

    deviceCount,
  }: ICreateDonation): Promise<IResponseDonation> {
    // Verifica se o Phone existe
    const existPhone = await this.prisma.giver.findFirst({
      where: {
        phone: giver.phone,
      },
    });
    // Verifica se o Email existe
    const existEmail = await this.prisma.giver.findFirst({
      where: {
        email: giver.email,
      },
    });

    let where = {};

    if (giver.email === undefined || !existEmail) {
      where = { phone: giver.phone };
    } else {
      where = { email: giver.email };
    }
    // Se o email ou phone existir
    if (existPhone || existEmail) {
      // Cria uma doação com o doador existente
      const idDonation = await this.prisma.donation.create({
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
        },
      });
      // Atualiza o doador com as novas informações
      await this.prisma.giver.update({
        where,
        data: giver,
      });
      // Lista a doação criada
      const dbDonation = await this.prisma.donation.findFirst({
        where: {
          id: idDonation.id,
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

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return dbDonation!;
    }
    // Se o doador nao existe cria um novo doador junto com a nova doação
    const dbDonation = await this.prisma.donation.create({
      data: {
        giver: {
          create: giver,
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
