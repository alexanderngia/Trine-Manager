import axios from "axios";
import { ICustomerNew } from "types/customer";
import { Customers } from "data/customer";
const getCustomer: () => Promise<any> = async () => {
  // if (process.env.GET_CUSTOMER_API)
  //   await axios.get(process.env.GET_CUSTOMER_API).then((res) => {
  //     return res.data.customers;
  //   });

  return Customers;
};
const createCustomer = ({
  cusName,
  cusEmail,
  cusPhone,
  cusGender,
  cusAdress,
}: ICustomerNew) => {
  if (process.env.CREATE_CUSTOMER_API)
    return axios.post(process.env.CREATE_CUSTOMER_API, {
      fullNameCus: cusName,
      emailCus: cusEmail,
      phoneCus: cusPhone,
      genderCus: cusGender,
      adressCus: cusAdress,
    });
};

const updateCustomer = async ({
  id,
  cusName,
  cusEmail,
  cusPhone,
  cusGender,
  cusAdress,
}: ICustomerNew) => {
  if (process.env.UPDATE_CUSTOMER_API)
    return await axios.put(process.env.UPDATE_CUSTOMER_API, {
      id: id,
      fullNameCus: cusName,
      emailCus: cusEmail,
      phoneCus: cusPhone,
      genderCus: cusGender,
      adressCus: cusAdress,
    });
};
const deleteCustomer = async (userId: any) => {
  if (process.env.DELETE_CUSTOMER_API)
    return await axios.delete(process.env.DELETE_CUSTOMER_API, {
      data: {
        id: userId,
      },
    });
};

const customerService = {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
export default customerService;
