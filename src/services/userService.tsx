import axios from "axios";
// import authHeader from "./authHeader";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/user?id=ALL`;
// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };
// const requestConfig: AxiosRequestConfig = { headers: authHeader() };

export interface UpdateProps {
  id?: number;
  userName: string;
  userEmail: string;
  // userPass: string;
  userPhone: string;
  userGender: string;
  userAdress: string;
  userRole: string;
}

const getUserBoard: () => Promise<any> = async () => {
  return await axios.get(API_URL).then((res) => {
    return res.data.users;
  });
};
const handleUpdateApi = async ({
  id,
  userName,
  userEmail,
  // userPass,
  userPhone,
  userGender,
  userAdress,
  userRole,
}: UpdateProps) => {
  return await axios.put(API_URL + "/edit", {
    id: id,
    fullNameUser: userName,
    emailUser: userEmail,
    // passwordUser: userPass,
    phoneUser: userPhone,
    genderUser: userGender,
    adressUser: userAdress,
    typeRole: userRole,
  });
};
const handleDeleteApi = async (userId: any) => {
  return await axios.delete(API_URL + "/delete", {
    data: {
      id: userId,
    },
  });
};

const userService = {
  getUserBoard,
  handleUpdateApi,
  handleDeleteApi,
};
export default userService;
