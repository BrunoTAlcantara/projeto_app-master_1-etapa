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
class DonationsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const donations = yield this.prisma.donation.findMany({
                orderBy: {
                    id: "desc",
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
        });
    }
    create({ giver, devices, deviceCount, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield this.prisma.giver.findFirst({
                where: {
                    phone: giver.phone,
                },
            });
            let where = {};
            if (giver.email === undefined || exist) {
                where = { phone: giver.phone };
            }
            else {
                where = { email: giver.email };
            }
            const dbDonation = yield this.prisma.donation.create({
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
        });
    }
}
exports.DonationsRepository = DonationsRepository;
