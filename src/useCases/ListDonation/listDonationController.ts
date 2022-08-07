import { Request, Response } from "express";

import { ListDonationUseCase } from "./listDonationUseCase";

class ListDonationController {
  constructor(private listDonationUseCase: ListDonationUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const donation = await this.listDonationUseCase.execute();

    return res.json(donation);
  }
}
export { ListDonationController };
