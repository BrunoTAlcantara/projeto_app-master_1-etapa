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
exports.CreateDonationUseCase = void 0;
class CreateDonationUseCase {
    constructor(donationRepository) {
        this.donationRepository = donationRepository;
    }
    execute({ name, email, phone, zip, city, state, streetAddress, number, complement, neighborhood, deviceCount, devices, }) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.CreateDonationUseCase = CreateDonationUseCase;
