export interface Devices  {
  type: string;
  condition: string;
 }

 export interface Donation  {
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
    devices: Devices[];
    
  }