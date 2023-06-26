import { IProduct } from "types/product";
export interface IOrderNew {
  idOrderNew: string;
  cusNameNew: string;
  cusEmailNew: string;
  cusPhoneNew: string;
  cusAdressNew: string;
  orderNoteNew: string;
  cart: IProduct[];
}
