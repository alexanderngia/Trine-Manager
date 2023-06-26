import axios from "axios";
import { IUserNew } from "types/user";

const createUser = ({
  userName,
  userEmail,
  userPass,
  userPhone,
  userGender,
  userAdress,
  userRole,
}: IUserNew) => {
  if (process.env.CREATE_AUTHENCTICATION_API)
    return axios.post(process.env.CREATE_AUTHENCTICATION_API, {
      fullNameUser: userName,
      emailUser: userEmail,
      passwordUser: userPass,
      phoneUser: userPhone,
      genderUser: userGender,
      adressUser: userAdress,
      typeRole: userRole,
    });
};

const loginUser = async (userName: string, userPass: string) => {
  if (process.env.LOGIN_AUTHENCTICATION_API) {
    const res = await axios.post(process.env.LOGIN_AUTHENCTICATION_API, {
      emailUser: userName,
      passwordUser: userPass,
    });

    const { data } = res;
    if (data.accessToken) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  }
};

const authService = {
  createUser,
  loginUser,
};
export default authService;
