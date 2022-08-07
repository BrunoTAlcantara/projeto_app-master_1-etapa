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
