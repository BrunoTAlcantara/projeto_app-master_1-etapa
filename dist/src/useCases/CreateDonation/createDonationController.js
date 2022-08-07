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
exports.CreateDonationController = void 0;
class CreateDonationController {
    constructor(createDonationUseCase) {
        this.createDonationUseCase = createDonationUseCase;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const Donation = yield this.createDonationUseCase.execute(data);
            return res.status(200).json({ success: true, Donation }).send();
        });
    }
}
exports.CreateDonationController = CreateDonationController;
