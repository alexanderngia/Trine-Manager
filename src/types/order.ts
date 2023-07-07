import { IProduct } from "types/product";
export interface IOrderNew {
  id?: string;
  idOrderNew: string;
  cusNameNew: string;
  cusEmailNew: string;
  cusPhoneNew: string;
  cusAdressNew?: string;
  cusOrderNoteNew?: string;

  cusCountryNew?: string;

  cusPaymentNew?: string;
  cusStateNew?: string;
  cusDistrictNew?: string;
  cusWardNew?: string;
  discount?: string;
  price?: number;
  shippingFee?: number;
  vat?: number;
  total?: number;

  cart?: IProduct[];
}
