import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import FunctionBtn from "components/container/functionBtn";
import { ButtonMain, ButtonSub } from "components/ui/button/button";
import { CardList, CardUser } from "components/ui/card";
import { Modal } from "components/ui/modal/modal";
import { Layout } from "components/views/layout";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { register } from "redux/reducers/authSlice";
import { messageActions } from "redux/reducers/messageSlice";
import userService from "services/userService";
import * as Yup from "yup";
import styles from "./index.module.scss";
import { IUser, IUserNew } from "types/user";
import { Input } from "components/ui/form/input";
import { RadioInput } from "components/ui/form/radio";
import classNames from "classnames";
import classnames from "classnames";

export interface MemberListProps {}

const MemberList: React.FC<MemberListProps> = () => {
  const [deleteUser, setDeleteUser] = useState<IUser>();
  const [data, setData] = useState<IUser[]>([]);

  const [role, setRole] = useState("");
  const [modal, setModal] = useState(false);

  const [profile, setProfile] = useState(false);

  const [initialValue, setInitialValue] = useState({
    id: "",
    userName: "",
    userEmail: "",
    userPass: "",
    userPhone: "",
    userGender: "",
    userAdress: "",
    userRole: "",
  });
  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.getUser();
        setData(data);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();

    const modal = localStorage.getItem("MODAL");
    if (modal) {
      setModal(true);
    }
  }, []);
  useEffect(() => {
    if (user) {
      setRole(user.typeRole);
    }
  }, [user]);

  const closeModal = () => {
    setModal(false);
    localStorage.removeItem("MODAL");
  };

  const openModal = async (infoMem: IUser | null) => {
    setModal(true);
    localStorage.setItem("MODAL", "TRUE");
    if (infoMem) {
      setInitialValue({
        ...initialValue,
        id: `${infoMem.id}`,
        userName: `${infoMem.fullNameUser}`,
        userEmail: `${infoMem.emailUser}`,
        // userPass: `${infoUser.passwordUser}`,
        userPhone: `${infoMem.phoneUser}`,
        userGender: `${infoMem.genderUser}`,
        userAdress: `${infoMem.adressUser}`,
        userRole: `${infoMem.typeRole}`,
      });
      setDeleteUser(infoMem);
    }
    dispatch(messageActions.clearMessage());
  };

  const closeItemModal = () => {
    setModal(false);
    setInitialValue({
      id: "",
      userName: "",
      userEmail: "",
      userPass: "",
      userPhone: "",
      userGender: "",
      userAdress: "",
      userRole: "",
    });
  };

  const deleteItem = async ({ id, fullNameUser }: IUser) => {
    try {
      let confirmDelete = prompt(
        `Nhập DELETE vào ô để xác nhận xóa ${fullNameUser}!`,
        ""
      );
      if (confirmDelete === "DELETE") {
        let res = await userService.deleteUser(id);
        const errMessage = res?.data.errMessage;
        const message = res?.data.message;
        if (errMessage) {
          dispatch(messageActions.setMessage(errMessage));
        }
        if (message) {
          dispatch(messageActions.clearMessage());
          alert(fullNameUser + message);
          setProfile(false);
        }
      }
      if (confirmDelete === "" || null) {
        dispatch(messageActions.setMessage(`Fail to remove ${fullNameUser}!`));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "Tối thiểu 4 ký tự hoặc hơn")
      .required("Required!"),

    userEmail: Yup.string()
      .required("Required!")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address!"
      ),
    userPass: Yup.string().required("Required!"),
    userPhone: Yup.string()
      .required("Required!")
      .matches(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        "Please enter a valid phone number!"
      ),
    userGender: Yup.string().required("Required!"),
    userAdress: Yup.string().required("Required!"),
    userRole: Yup.string().required("Required!"),
  });

  const handleRegister = (formValue: IUserNew, { resetForm }: any) => {
    const {
      userName,
      userEmail,
      userPass,
      userPhone,
      userGender,
      userAdress,
      userRole,
    } = formValue;
    try {
      dispatch(
        register({
          userName,
          userEmail,
          userPass,
          userPhone,
          userGender,
          userAdress,
          userRole,
        })
      );
      resetForm({});
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (formValue: any) => {
    const {
      id,
      userName,
      userEmail,
      userPhone,
      userGender,
      userAdress,
      userRole,
    } = formValue;
    try {
      let res = await userService.updateUser({
        id,
        userName,
        userEmail,
        userPhone,
        userGender,
        userAdress,
        userRole,
      });

      const message = res?.data.message;
      const errMessage = res?.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        alert(`${userName} ${message}`);
        setProfile(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchemaItem = Yup.object().shape({
    userName: Yup.string()
      .min(4, "Tối thiểu 4 ký tự hoặc hơn")
      .required("Required!"),

    userEmail: Yup.string()
      .required("Required!")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address!"
      ),
    userPhone: Yup.string()
      .required("Required!")
      .matches(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        "Please enter a valid phone number!"
      ),
    userGender: Yup.string().required("Required!"),
    userAdress: Yup.string().required("Required!"),
    userRole: Yup.string().required("Required!"),
  });
  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH SÁCH THÀNH VIÊN</h1>
        <div className={styles["btn-container"]}>
          <FunctionBtn onClickAdd={() => openModal(null)} />
        </div>
        {/* {modal && (
          <Modal onClick={closeModal}>
            <h1>Let's signup!</h1>
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ values, handleChange }: any) => (
                <Form className={styles["form"]}>
                  <div className={styles["container"]}>
                    <span className={styles["box"]}>
                      <Input
                        customClass={styles["col-3"]}
                        id="userName"
                        type="text"
                        title="Địa Chỉ"
                        name="userName"
                        placeholder="Nguyễn Văn A"
                        value={values.userName}
                        onChange={(e) => handleChange(e)}
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="userEmail" className={styles["label"]}>
                        Email
                      </label>

                      <Field
                        className={styles["input"]}
                        type="email"
                        placeholder="nguyenvana@gmail.com"
                        name="userEmail"
                        id="userEmail"
                        value={values.userEmail}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userEmail"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="userPass" className={styles["label"]}>
                        Mật Khẩu
                      </label>

                      <Field
                        className={styles["input"]}
                        type="password"
                        placeholder="abc1223@"
                        name="userPass"
                        id="userPass"
                        value={values.userPass}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userPass"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="userPhone" className={styles["label"]}>
                        Phone
                      </label>

                      <Field
                        className={styles["input"]}
                        type="phone"
                        placeholder="0988379379"
                        name="userPhone"
                        id="userPhone"
                        value={values.userPhone}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userPhone"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="userAdress" className={styles["label"]}>
                        Địa Chỉ
                      </label>
                      <Field
                        className={styles["input"]}
                        type="text"
                        placeholder="100C Hậu Giang Quận 6 TP.HCM"
                        name="userAdress"
                        id="userAdress"
                        value={values.userAdress}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userAdress"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <p>Giới Tính</p>
                      <div className={styles["container-checkbox"]}>
                        <label htmlFor="Male" className={styles["checkbox"]}>
                          <Field
                            type="radio"
                            id="Male"
                            name="userGender"
                            value="1"
                          ></Field>
                          <span>
                            <p>Male</p>
                          </span>
                        </label>
                        <label htmlFor="Female" className={styles["checkbox"]}>
                          <Field
                            type="radio"
                            id="Female"
                            name="userGender"
                            value="0"
                          ></Field>
                          <span>
                            <p>Female</p>
                          </span>
                        </label>
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="userGender"
                          component="div"
                        />
                      </div>
                    </span>
                    <span className={styles["box"]}>
                      <p>Vai Trò</p>
                      <div className={styles["container-checkbox"]}>
                        <label htmlFor="Admin" className={styles["checkbox"]}>
                          <Field
                            type="radio"
                            id="Admin"
                            name="userRole"
                            value="ADMIN"
                          ></Field>
                          <span>
                            <p>Admin</p>
                          </span>
                        </label>
                        <label htmlFor="Sale" className={styles["checkbox"]}>
                          <Field
                            type="radio"
                            id="Sale"
                            name="userRole"
                            value="SALE"
                          ></Field>
                          <span>
                            <p>Sale</p>
                          </span>
                        </label>
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="userRole"
                          component="div"
                        />
                      </div>
                    </span>
                  </div>
                  <p className={styles["message"]}>{message}</p>

                  <div className={styles["button-container"]}>
                    <button type="submit">Tạo Thành Viên</button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
        )} */}
        {data && (
          <ul className={styles["card-container"]}>
            {React.Children.toArray(
              data.map(
                ({
                  id,
                  fullNameUser,
                  genderUser,
                  phoneUser,
                  emailUser,
                  adressUser,
                  typeRole,
                }: IUser) => {
                  return (
                    <CardUser
                      onClick={() =>
                        openModal({
                          id,
                          fullNameUser,
                          genderUser,
                          phoneUser,
                          emailUser,
                          adressUser,
                          typeRole,
                        })
                      }
                      classCustom={styles["card"]}
                      titleCard={fullNameUser}
                      textCardTwo={typeRole}
                      textCardThree={phoneUser}
                      textCardFour={emailUser}
                    />
                  );
                }
              )
            )}
          </ul>
        )}
        {modal && (
          <Modal onClick={closeItemModal}>
            <h1>
              {initialValue.id
                ? `THÔNG TIN CỦA ${initialValue.userName}`
                : "THÊM THÀNH VIÊN"}
            </h1>
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchemaItem}
              onSubmit={handleUpdate}
            >
              {({ values, handleChange }: any) => (
                <Form className={styles["form"]}>
                  <div className={styles["container"]}>
                    <Input
                      id="id"
                      type="text"
                      name="id"
                      value={values.id}
                      onChange={(e) => handleChange(e)}
                      hidden
                    />
                    <Input
                      customClass={styles["col-3"]}
                      id="userName"
                      type="text"
                      title="Full Name"
                      name="userName"
                      placeholder="Nguyễn Văn A"
                      value={values.userName}
                      onChange={(e) => handleChange(e)}
                    />
                    {!initialValue.id && (
                      <Input
                        customClass={styles["col-3"]}
                        id="userPass"
                        type="password"
                        title="Mật Khẩu"
                        name="userPass"
                        placeholder="abc1223@"
                        value={values.userPass}
                        onChange={(e) => handleChange(e)}
                      />
                    )}

                    <Input
                      customClass={styles["col-3"]}
                      id="userEmail"
                      type="email"
                      title="Email"
                      name="userEmail"
                      placeholder="nguyenvana@gmail.com"
                      value={values.userEmail}
                      onChange={(e) => handleChange(e)}
                    />
                    <Input
                      customClass={styles["col-3"]}
                      id="userPhone"
                      type="text"
                      title="Phone"
                      name="userPhone"
                      placeholder="0988379379"
                      value={values.userPhone}
                      onChange={(e) => handleChange(e)}
                    />

                    <Input
                      customClass={styles["col-3"]}
                      id="userAdress"
                      type="text"
                      title="Địa Chỉ"
                      name="userAdress"
                      placeholder="100C Hậu Giang Quận 6 TP.HCM"
                      value={values.userAdress}
                      onChange={(e) => handleChange(e)}
                    />

                    <span
                      className={classnames(styles["col-4"], styles["box"])}
                    >
                      <p>Giới Tính</p>
                      <div className={styles["container"]}>
                        <RadioInput
                          name="userGender"
                          id="MaleUpdate"
                          value="1"
                          title="Male"
                          onChange={(e) => handleChange(e)}
                        />
                        <RadioInput
                          name="userGender"
                          id="FemaleUpdate"
                          value="0"
                          title="Female"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </span>
                    <span
                      className={classnames(styles["col-4"], styles["box"])}
                    >
                      <p>Vai Trò</p>
                      <div className={styles["container"]}>
                        <RadioInput
                          name="userRole"
                          id="AdminUpdate"
                          value="ADMIN"
                          title="Admin"
                          onChange={(e) => handleChange(e)}
                        />
                        <RadioInput
                          name="userRole"
                          id="SaleUpdate"
                          value="SALE"
                          title="Sale"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </span>
                  </div>

                  <div className={styles["button-container"]}>
                    <ButtonMain type="submit">Cập Nhật</ButtonMain>

                    <ButtonSub
                      type="button"
                      // onClick={() => deleteItem({ id, fullNameUser })}
                    >
                      Xóa Thành Viên
                    </ButtonSub>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default MemberList;
