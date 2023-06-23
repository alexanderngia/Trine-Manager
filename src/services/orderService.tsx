import axios from "axios";
import { IProduct } from "services/productService";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/order`;

export interface IOrder {
  idOrderNew: string;
  cusNameNew: string;
  cusEmailNew: string;
  cusPhoneNew: string;
  cusAdressNew: string;
  orderNoteNew: string;
  cart: IProduct[];
}

const getOrderBoard: () => Promise<any> = async () => {
  return await axios.get(API_URL + "?id=ALL").then((res) => {
    return res.data.orders;
  });
};
const createOrder = async (order: IOrder) => {
  return await axios({
    method: "post",
    url: API_URL + "/create",
    headers: {},
    data: order,
  });
  // console.log(order, "order from service");
};

const orderService = {
  getOrderBoard,
  createOrder,
};
export default orderService;
