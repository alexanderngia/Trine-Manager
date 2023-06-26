import axios from "axios";
import { IUserNew } from "types/user";
import { Users } from "data/user";
// import authHeader from "./authHeader";
// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };
// const requestConfig: AxiosRequestConfig = { headers: authHeader() };

const getUser: () => Promise<any> = async () => {
  // if (process.env.GET_USER_API)
  //   await axios.get(process.env.GET_USER_API).then((res) => {
  //     return res.data.users;
  //   });
  return Users;
};
const updateUser = async ({
  id,
  userName,
  userEmail,
  userPhone,
  userGender,
  userAdress,
  userRole,
}: any) => {
  if (process.env.CREATE_USER_API)
    return await axios.put(process.env.CREATE_USER_API, {
      id: id,
      fullNameUser: userName,
      emailUser: userEmail,
      phoneUser: userPhone,
      genderUser: userGender,
      adressUser: userAdress,
      typeRole: userRole,
    });
};
const deleteUser = async (userId: any) => {
  if (process.env.DELETE_USER_API)
    return await axios.delete(process.env.DELETE_USER_API, {
      data: {
        id: userId,
      },
    });
};

const userService = {
  getUser,
  updateUser,
  deleteUser,
};
export default userService;
