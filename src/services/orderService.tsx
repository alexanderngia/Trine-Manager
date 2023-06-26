import axios from "axios";
import { IOrderNew } from "types/order";
import { orders } from "data/order";
const getOrder: () => Promise<any> = async () => {
  // if (process.env.GET_ORDER_API)
  //   await axios.get(process.env.GET_ORDER_API).then((res) => {
  //     return res.data.orders;
  //   });

  return orders;
};
const createOrder = async (order: IOrderNew) => {
  if (process.env.CREATE_ORDER_API)
    return await axios({
      method: "post",
      url: process.env.CREATE_ORDER_API,
      headers: {},
      data: order,
    });
};

const orderService = {
  getOrder,
  createOrder,
};
export default orderService;
