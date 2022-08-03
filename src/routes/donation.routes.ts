import { Router } from "express";
import { CreateDonationController} from "../Donation/CreateDonationController";
import { validate } from "../Donation/validation"

//Validação Shema
const shemaDonation = {

  name: {
    required : "name",
    type: "string",
  },
  email: {
    type:"email"
   
  },
  phone: {
    required : "phone",
    type: "string",
  },
  zip: {
    required : "zip",
    type: "string",
  },
  city: {
    required : "city",
    type: "string",
  },
  state: {
    required : "state",
    type: "string",
  },
  streetAddress: {
    required : "steetAddress",
    type: "string",
  },
  number: {
    required : "number",
    type: "string",
  },
  complement : {
    type: "string",
  },
  neighborhood: {
    required : "neighborhood",
    type: "string",
  },
  deviceCount: {
    required : "deviceCount",
    type: "number"
  },
  devices: {
  
    required : "devices",
    
  }




}


const donationRoutes = Router();

const createDonationController = new CreateDonationController();

donationRoutes.post("/donation", validate(shemaDonation), createDonationController.handle);


export { donationRoutes };