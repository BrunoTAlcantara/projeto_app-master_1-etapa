import { Router } from "express";

import createDonationController from "../../useCases/CreateDonation";
import listDonationController from "../../useCases/ListDonation";
import { validate } from "../middlewares/validationDonation";

// Validação Shema
const shemaDonation = {
  name: {
    required: "name",
    type: "string",
  },
  email: {
    type: "email",
  },
  phone: {
    required: "phone",
    type: "string",
  },
  zip: {
    required: "zip",
    type: "string",
  },
  city: {
    required: "city",
    type: "string",
  },
  state: {
    required: "state",
    type: "string",
  },
  streetAddress: {
    required: "steetAddress",
    type: "string",
  },
  number: {
    required: "number",
    type: "string",
  },
  complement: {
    type: "string",
  },
  neighborhood: {
    required: "neighborhood",
    type: "string",
  },
  deviceCount: {
    required: "deviceCount",
    type: "number",
  },
  devices: {
    required: "devices",
  },
};

const donationRoutes = Router();

donationRoutes.post(
  "/donation",
  validate(shemaDonation),
  (response, request) => {
    return createDonationController().handle(response, request);
  }
);

donationRoutes.get("/donation", (response, request) => {
  return listDonationController().handle(response, request);
});

export { donationRoutes };
