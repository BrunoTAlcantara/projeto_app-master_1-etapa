  import { Request, Response } from "express";
  import { Donation } from '../Donation/dto';



  class CreateDonationController {

    async handle(req: Request, res: Response): Promise<Response> {

      const data : Donation = req.body

      if( data ) {
        return res.status(200).json({success:true});
      }
      return res.status(404).json({success:false});
    }
  }
  export { CreateDonationController };