import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import FunctionBtn from "components/container/functionBtn";
import { ButtonSub, ButtonMain } from "components/ui/button/button";
import { CardUserImg } from "components/ui/card";
import { Modal } from "components/ui/modal/modal";
import { Layout } from "components/views/layout";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { messageActions } from "redux/reducers/messageSlice";
import customerService from "services/customerService";
import * as Yup from "yup";
import styles from "./index.module.scss";
import { ICustomer, ICustomerNew } from "types/customer";
import { Input } from "components/ui/form/input";
import { RadioInput } from "components/ui/form/radio";
import classnames from "classnames";
import { Textarea } from "components/ui/form/textarea";

export interface CustomerListProps {}

const CustomerList: React.FC<CustomerListProps> = () => {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");
  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState(false);
  const [deleteUser, setDeleteUser] = useState<ICustomer | null>(null);

  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);

  const dispatch = useAppDispatch();

  const [initialValue, setInitialValue] = useState<ICustomerNew>({
    id: "",
    cusName: "",
    cusEmail: "",
    cusPhone: "",
    cusGender: "",
    cusAdress: "",
    cusNote: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await customerService.getCustomer();
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

  const openModal = async (infoUser: ICustomer | null) => {
    setModal(true);
    localStorage.setItem("MODAL", "TRUE");

    if (infoUser) {
      setInitialValue({
        id: `${infoUser.id}`,
        cusName: `${infoUser.fullNameCus}`,
        cusEmail: `${infoUser.emailCus}`,
        cusPhone: `${infoUser.phoneCus}`,
        cusGender: `${infoUser.genderCus}`,
        cusAdress: `${infoUser.adressCus}`,
        cusNote: ``,
      });
      setDeleteUser(infoUser);

      dispatch(messageActions.clearMessage());
    }
  };

  const closeModal = () => {
    setModal(false);
    localStorage.removeItem("MODAL");
    setInitialValue({
      id: "",
      cusName: "",
      cusEmail: "",
      cusPhone: "",
      cusGender: "",
      cusAdress: "",
      cusNote: "",
    });
    setDeleteUser(null);
  };

  const deleteItem = async (userRemove: ICustomer | null) => {
    try {
      if (userRemove) {
        let confirmDelete = prompt(
          `Nhập DELETE vào ô để xác nhận xóa ${userRemove?.fullNameCus}!`,
          ""
        );
        if (confirmDelete === "DELETE") {
          let res = await customerService.deleteCustomer(userRemove?.idCus);
          const errMessage = res?.data.errMessage;
          const message = res?.data.message;
          if (errMessage) {
            dispatch(messageActions.setMessage(errMessage));
          }
          if (message) {
            dispatch(messageActions.clearMessage());
            alert(userRemove?.fullNameCus + message);
            setProfile(false);
          }
        }
        if (confirmDelete === "" || null) {
          dispatch(
            messageActions.setMessage(
              `Fail to remove ${userRemove?.fullNameCus}!`
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    cusName: Yup.string()
      .min(4, "Tối thiểu 4 ký tự hoặc hơn")
      .required("Bắt buộc!"),

    cusEmail: Yup.string()
      .required("Bắt buộc!")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email chưa hợp lệ !"),
    cusPhone: Yup.string()
      .required("Bắt buộc!")
      .matches(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        "Số điện thoại chưa hợp lệ !"
      ),
    cusGender: Yup.string().required("Bắt buộc!"),
    cusAdress: Yup.string().required("Bắt buộc!"),
  });

  const handleRegister = async (formValue: any, { resetForm }: any) => {
    const { cusName, cusEmail, cusPhone, cusGender, cusAdress, cusNote } =
      formValue;
    try {
      let res = await customerService.createCustomer({
        cusName,
        cusEmail,
        cusPhone,
        cusGender,
        cusAdress,
        cusNote,
      });
      dispatch(messageActions.setMessage(res?.data.message));
      resetForm({});

      return res?.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (formValue: ICustomerNew) => {
    const { id, cusName, cusEmail, cusPhone, cusGender, cusAdress, cusNote } =
      formValue;

    try {
      let res = await customerService.updateCustomer({
        id,
        cusName,
        cusEmail,
        cusPhone,
        cusGender,
        cusAdress,
        cusNote,
      });

      const message = res?.data.message;
      const errMessage = res?.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        alert(`${cusName} ${message}`);
        setProfile(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH SÁCH KHÁCH HÀNG</h1>
        <div className={styles["btn-container"]}>
          <FunctionBtn onClickAdd={() => openModal(null)} />
        </div>
        {modal && (
          <Modal onClick={closeModal}>
            <h1>
              {!initialValue.id
                ? "THÊM KHÁCH HÀNG NÀO!"
                : `THÔNG TIN CỦA ${initialValue.cusName} `}
            </h1>
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchema}
              onSubmit={handleUpdate}
            >
              {({ values, handleChange }: any) => (
                <Form className={styles["form"]}>
                  <div className={styles["container"]}>
                    <Input
                      type="text"
                      name="id"
                      value={values.id}
                      onChange={(e) => handleChange(e)}
                      hidden
                    />
                    <Input
                      customClass={styles["col-3"]}
                      id="cusNameUpdate"
                      type="text"
                      title="Full Name"
                      name="cusName"
                      placeholder="Nguyễn Văn A"
                      value={values.cusName}
                      onChange={(e) => handleChange(e)}
                    />
                    <Input
                      customClass={styles["col-3"]}
                      id="cusEmailUpdate"
                      type="email"
                      title="Email"
                      name="cusEmail"
                      placeholder="nguyenvana@gmail.com"
                      value={values.cusEmail}
                      onChange={(e) => handleChange(e)}
                    />
                    <Input
                      customClass={styles["col-3"]}
                      id="cusPhoneUpdate"
                      type="text"
                      title="Phone"
                      name="cusPhone"
                      placeholder="0988379379"
                      value={values.cusPhone}
                      onChange={(e) => handleChange(e)}
                    />
                    <Input
                      customClass={styles["col-3"]}
                      id="cusAdressUpdate"
                      type="text"
                      title="Địa Chỉ"
                      name="cusAdress"
                      placeholder="100C Hậu Giang Quận 6 TP.HCM"
                      value={values.cusAdress}
                      onChange={(e) => handleChange(e)}
                    />
                    <Textarea
                      customClass={styles["col-3"]}
                      id="cusNoteUpdate"
                      type="text"
                      title="Ghi chú"
                      name="cusNote"
                      value={values.cusNote}
                      onChange={(e) => handleChange(e)}
                    />
                    <span
                      className={classnames(styles["col-3"], styles["gender"])}
                    >
                      <p>Giới Tính</p>
                      <div className={styles["container"]}>
                        <RadioInput
                          name="cusGender"
                          id="MaleUpdate"
                          value="1"
                          title="Male"
                          onChange={(e) => handleChange(e)}
                        />
                        <RadioInput
                          name="cusGender"
                          id="FemaleUpdate"
                          value="0"
                          title="Female"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </span>
                  </div>
                  <p className={styles["message"]}>{message}</p>

                  <div className={styles["button-container"]}>
                    <ButtonMain type="submit">
                      {!initialValue.id ? "Thêm Khách Hàng" : "Cập Nhật"}
                    </ButtonMain>
                    <ButtonSub
                      type="button"
                      onClick={() =>
                        deleteItem(!initialValue.id ? null : deleteUser)
                      }
                    >
                      Xóa Khách Hàng
                    </ButtonSub>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
        )}
        {data && (
          <>
            <div className={styles["card-container"]}>
              {React.Children.toArray(
                data.map(
                  ({
                    idCus,
                    imgCus,
                    fullNameCus,
                    emailCus,
                    phoneCus,
                    genderCus,
                    adressCus,
                    stateCus,
                  }: ICustomer) => {
                    return (
                      <CardUserImg
                        onClick={() =>
                          openModal({
                            idCus,
                            imgCus,
                            fullNameCus,
                            emailCus,
                            phoneCus,
                            genderCus,
                            adressCus,
                            stateCus,
                          })
                        }
                        imgCard={imgCus}
                        classCustom={styles["card"]}
                        titleCard={fullNameCus}
                        textCardTwo={genderCus === "1" ? "Male" : "Female"}
                        textCardThree={phoneCus}
                        textCardFour={emailCus}
                      />
                    );
                  }
                )
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CustomerList;
