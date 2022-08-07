export interface IDevices {
  type: string;
  condition: string;
}

export interface IGiver {
  id?: string;
  name: string;
  email?: string | null;
  phone: string;
  zip: string;
  city: string;
  state: string;
  streetAddress: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
}

export interface IDataDonation {
  name: string;
  email: string;
  phone: string;
  zip: string;
  city: string;
  state: string;
  streetAddress: string;
  number: string;
  complement: string;
  neighborhood: string;
  deviceCount: number;
  devices: IDevices[];
}

export interface ICreateDonation {
  giver: IGiver;
  deviceCount: number;
  devices: IDevices[];
}
export interface IResponseDonation {
  id: string;
  giver: IGiver;
  devices: IDevices[];
}
