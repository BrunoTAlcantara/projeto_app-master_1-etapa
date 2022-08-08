import {
  ICreateDonation,
  IResponseDonation,
  IGiver,
} from "../useCases/CreateDonation/createDonationDTO";

export interface IDonationRepository {
  create(entity: ICreateDonation): Promise<IResponseDonation>;

  list(): Promise<any>;
}
