"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationsRepository = void 0;
// Interface de repositories
class DonationsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    exist(email, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const exista = yield this.prisma.giver.findFirst({
                where: {
                    phone,
                    email,
                },
            });
            return exista;
        });
    }
    // listagem atravez do get
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const donations = yield this.prisma.donation.findMany({
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
        });
    }
    create({ giver, devices, deviceCount, }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verifica se o Phone existe
            const existPhone = yield this.prisma.giver.findFirst({
                where: {
                    phone: giver.phone,
                },
            });
            // Verifica se o Email existe
            const existEmail = yield this.prisma.giver.findFirst({
                where: {
                    email: giver.email,
                },
            });
            let where = {};
            if (giver.email === undefined || !existEmail) {
                where = { phone: giver.phone };
            }
            else {
                where = { email: giver.email };
            }
            // Se o email ou phone existir
            if (existPhone || existEmail) {
                // Cria uma doação com o doador existente
                const idDonation = yield this.prisma.donation.create({
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
                yield this.prisma.giver.update({
                    where,
                    data: giver,
                });
                // Lista a doação criada
                const dbDonation = yield this.prisma.donation.findFirst({
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
                return dbDonation;
            }
            // Se o doador nao existe cria um novo doador junto com a nova doação
            const dbDonation = yield this.prisma.donation.create({
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
        });
    }
}
exports.DonationsRepository = DonationsRepository;
