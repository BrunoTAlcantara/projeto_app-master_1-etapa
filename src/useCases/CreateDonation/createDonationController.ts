import { Request, Response } from "express";

import { IDataDonation } from "./createDonationDTO";
import { CreateDonationUseCase } from "./createDonationUseCase";

class CreateDonationController {
  constructor(private createDonationUseCase: CreateDonationUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const data: IDataDonation = req.body;

    const Donation = await this.createDonationUseCase.execute(data);

    return res.status(200).json({ success: true, Donation }).send();
  }
}
export { CreateDonationController };
