import { ButtonMain, ButtonSub } from "components/ui/button/button";
import { CardCart, CardProductItem } from "components/ui/card";
import { Search } from "components/ui/search";
import { Layout } from "components/views/layout";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { ChangeEvent, useEffect, useState } from "react";
import { messageActions } from "redux/reducers/messageSlice";
import postService from "services/postService";
import productService from "services/productService";
import { IProduct } from "types/product";
import { history } from "utils/history";
import styles from "./index.module.scss";

import { Input } from "components/ui/form/input";
import { Textarea } from "components/ui/form/textarea";
import orderService from "services/orderService";
import { CountryData, DistrictData, StateData, WardData } from "types/country";
import { IOrderNew } from "types/order";
import InputSelectAdress from "components/ui/form/selectAdress";
import { Country } from "data/country";
import InputPayment from "components/ui/form/payment";
import { Bank, Card, Dollar, Wallet } from "components/ui/icon";
export interface OrderProps {}

const Order: React.FC<OrderProps> = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [q, setQ] = useState("");
  const [searchParam] = useState(["nameItem", "categoryItem"]);

  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(
    null
  );
  const [selectedWard, setSelectedWard] = useState<WardData | null>(null);

  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);
  const { order } = useAppSelector((state) => state.order);
  // const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { v4 } = require("uuid");

  const [initialValue, setInitialValue] = useState<IOrderNew>({
    id: "",
    idOrderNew: `${v4()}`,
    cusNameNew: "",
    cusEmailNew: "",
    cusPhoneNew: "",
    cusAdressNew: "",
    cusCountryNew: "",
    cusStateNew: "",
    cusDistrictNew: "",
    cusWardNew: "",
    cusPaymentNew: "COD",
    cusOrderNoteNew: "",
    discount: "",
    price: 0,
    shippingFee: 0,
    vat: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productService.getProduct();
        setData(data);

        if (order) {
          setInitialValue({
            id: `${order.id}`,
            idOrderNew: `${order.idOrder}`,
            cusNameNew: `${order.cusName}`,
            cusEmailNew: `${order.cusEmail}`,
            cusPhoneNew: `${order.cusPhone}`,
            cusAdressNew: `${order.cusAdress}`,
            cusOrderNoteNew: `${order.orderNote}`,
          });
          dispatch(messageActions.clearMessage());
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTotalPrice(
      cart.reduce(
        (accumulator, current) =>
          accumulator + current.priceItem * current.amount,
        0
      )
    );
  }, [cart]);

  const handleRegister = async (infoOrder: any) => {
    const {
      idOrderNew,
      cusNameNew,
      cusEmailNew,
      cusPhoneNew,
      cusAdressNew,
      cusOrderNoteNew,
    } = infoOrder;

    try {
      await orderService.createOrder({
        idOrderNew,
        cusNameNew,
        cusEmailNew,
        cusPhoneNew,
        cusAdressNew,
        cusOrderNoteNew,
        cart,
      });

      // const message = res.data.message;
      // const errMessage = res.data.errMessage;
      // if (errMessage) {
      //   dispatch(messageActions.setMessage(errMessage));
      // }
      // if (message) {
      //   dispatch(messageActions.setMessage(message));
      //   alert(`Post ${message}`);
      // }
      // return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (formValue: any) => {
    const {
      id,
      authorNew,
      urlNew,
      titleNew,
      bodyNew,
      bodyHtmlNew,
      featureImgNew,
      categoryNew,
      keywordTagNew,
      titleTagNew,
      descripTagNew,
    } = formValue;
    try {
      let res = await postService.updatePost({
        id,
        authorNew,
        urlNew,
        titleNew,
        bodyNew,
        bodyHtmlNew,
        featureImgNew,
        categoryNew,
        keywordTagNew,
        titleTagNew,
        descripTagNew,
      });

      const message = res?.data.message;
      const errMessage = res?.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        alert(`Post ${message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteItem = async (deleteItem: any) => {
    try {
      let confirmDelete = prompt(
        `Nhập DELETE vào ô để xác nhận xóa ${deleteItem.titleNew}!`,
        ""
      );
      if (confirmDelete === "DELETE") {
        let res = await postService.deletePost(deleteItem.id);
        const errMessage = res?.data.errMessage;
        const message = res?.data.message;
        if (errMessage) {
          dispatch(messageActions.setMessage(errMessage));
        }
        if (message) {
          dispatch(messageActions.clearMessage());
          await alert(deleteItem.titleNew + message);
          history.push("/Order-manager");
        }
      }
      if (confirmDelete === "" || null) {
        dispatch(
          messageActions.setMessage(`Fail to remove ${deleteItem.titleNew}!`)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product: IProduct) => {
    setCart((prev): Array<IProduct>[] => {
      const exist = prev.find((x: IProduct) => x.id === product.id);
      if (exist) {
        return prev.map((item) => {
          if (item.id === product.id) {
            if (item.amount < item.qualityItem) {
              return { ...item, amount: item.amount + 1 };
            } else {
              return { ...item, amount: item.qualityItem };
            }
          } else {
            return item;
          }
        });
      }

      return [...prev, { ...product, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (product: IProduct) => {
    setCart((cart): Array<IProduct>[] => {
      return cart.map((item) => {
        if (item.id === product.id) {
          if (item.amount > 1) {
            return { ...item, amount: item.amount - 1 };
          } else {
            return setCart(cart.filter((x) => x.id !== product.id));
          }
        }
        return item;
      });
    });
  };

  const search = (data: any) => {
    return data.filter((product: any) => {
      return searchParam.some((newItem) => {
        return (
          product[newItem]?.toString().toLowerCase().indexOf(q.toLowerCase()) >
          -1
        );
      });
    });
  };
  const filter = (cat: string) => {
    setQ(cat);
  };

  const onHandleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = e.target.value;
    const selectedCountry = Country.find(
      (country) => country.name === countryName
    );
    if (selectedCountry) {
      setSelectedCountry(selectedCountry);
      setInitialValue({ ...initialValue, cusCountryNew: selectedCountry.name });
    }
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const onHandleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = selectedCountry?.state.find(
      (state) => state.name === e.target.value
    );
    if (selectedState) {
      setSelectedState(selectedState);
      selectedState.code === 79
        ? setInitialValue({
            ...initialValue,
            cusStateNew: selectedState.name,
            shippingFee: 0,
          })
        : setInitialValue({
            ...initialValue,
            cusStateNew: selectedState.name,
            shippingFee: 40000,
          });
    }
    setSelectedDistrict(null);
    setSelectedWard(null);
  };
  const onHandleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = selectedState?.districts.find(
      (district) => district.name === e.target.value
    );
    if (selectedDistrict) {
      setSelectedDistrict(selectedDistrict);
      setInitialValue({
        ...initialValue,
        cusDistrictNew: selectedDistrict.name,
      });
    }
    setSelectedWard(null);
  };
  const onHandleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWard = selectedDistrict?.wards.find(
      (ward) => ward.name === e.target.value
    );
    if (selectedWard) {
      setSelectedWard(selectedWard);
      setInitialValue({ ...initialValue, cusWardNew: selectedWard.name });
    }
  };

  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>{order ? "CẬP NHẬT ĐƠN HÀNG" : "TẠO ĐƠN HÀNG"}</h1>
        <div className={styles["container-cart"]}>
          <div className={styles["column"]}>
            <span className={styles["row"]}>
              <label className={styles["label"]}>Chọn Sản Phẩm</label>

              <Search
                name="search-form"
                id="search-form"
                value={q}
                className={styles["search"]}
                onChange={(e: any) => setQ(e.target.value)}
              />
              <div className={styles["filter"]}>
                <ButtonMain onClick={() => filter("lingeria")}>
                  LINGERIA
                </ButtonMain>
                <ButtonMain onClick={() => filter("accessories")}>
                  ACCESSORIES
                </ButtonMain>
                <ButtonMain
                  onClick={() => filter("dress")}
                  classCustom={styles["last-button"]}
                >
                  DRESS
                </ButtonMain>
              </div>
            </span>

            <span className={styles["row"]}>
              {data.length > 0 && (
                <>
                  <ul className={styles["container-card"]}>
                    {React.Children.toArray(
                      search(data).map((listItems: any) => {
                        return (
                          <CardProductItem
                            classCustomCard={styles["item"]}
                            onClick={() =>
                              // dispatch(cartActions.addToCart(listItems))
                              handleAddToCart(listItems)
                            }
                            titleCard={listItems.nameItem}
                            imgCard={listItems.imgItem}
                            colorCard={listItems.colorItem}
                            sizeCard={listItems.sizeItem}
                            qtyCard={listItems.qualityItem}
                          />
                        );
                      })
                    )}
                  </ul>
                </>
              )}
            </span>
            <span className={styles["row"]}>
              <label className={styles["label"]}>Thông Tin Khách Hàng</label>
              <Formik
                initialValues={initialValue}
                validateOnChange={true}
                onSubmit={order ? handleUpdate : handleRegister}
                enableReinitialize={true}
              >
                {({ values, handleChange, setFieldValue }: any) => (
                  <Form className={styles["form"]}>
                    <Input
                      customClass={styles["col-3"]}
                      type="text"
                      name="idOrderNew"
                      hidden
                    />

                    <Input
                      customClass={styles["col-3"]}
                      id="cusNameNew"
                      type="text"
                      title="Tên Khách Hàng"
                      name="cusNameNew"
                      placeholder="Nguyễn Văn A"
                      value={values.cusNameNew}
                      onChange={(e) => handleChange(e)}
                    />
                    <Input
                      customClass={styles["col-3"]}
                      id="cusPhoneNew"
                      type="text"
                      title="Số Điện Thoại"
                      name="cusPhoneNew"
                      placeholder="Nguyễn Văn A"
                      value={values.cusPhoneNew}
                      onChange={(e) => handleChange(e)}
                    />

                    <Input
                      customClass={styles["col-3"]}
                      id="cusEmailNew"
                      type="email"
                      title="Email"
                      name="cusEmailNew"
                      placeholder="nguyenvana@gmail.com"
                      value={values.cusEmailNew}
                      onChange={(e) => handleChange(e)}
                    />
                    <label className={styles["label"]}>Địa Chỉ Giao Hàng</label>
                    <Input
                      customClass={styles["col-3"]}
                      id="cusAdressNew"
                      type="text"
                      title="Số Nhà, Tên Đường"
                      name="cusAdressNew"
                      placeholder="491 Hậu Giang"
                      value={values.cusAdressNew}
                      onChange={(e) => handleChange(e)}
                    />
                    <InputSelectAdress
                      arrow={true}
                      col1={styles["col-3"]}
                      col2={styles["col-3"]}
                      col3={styles["col-3"]}
                      col4={styles["col-3"]}
                      selectedCountry={selectedCountry}
                      selectedState={selectedState}
                      selectedDistrict={selectedDistrict}
                      selectedWard={selectedWard}
                      onHandleCountry={onHandleCountryChange}
                      onHandleState={onHandleStateChange}
                      onHandleDistrict={onHandleDistrictChange}
                      onHandleWard={onHandleWardChange}
                    />
                    <Textarea
                      customClass={styles["col-3"]}
                      title="Ghi Chú Đơn Hàng"
                      placeholder="Khách quen cần gấp, giao trong ngày"
                      name="orderNoteNew"
                      id="orderNoteNew"
                      value={values.orderNoteNew}
                      onChange={(e) => handleChange(e)}
                    />
                    <label className={styles["label"]}>
                      Phương Thức Thanh Toán
                    </label>
                    <InputPayment
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e)
                      }
                      id="COD"
                      value="COD"
                      subLabel="Thanh toán ngay khi nhận hàng"
                      label="COD"
                      name="cusPaymentNew"
                      required
                    >
                      <Dollar />
                    </InputPayment>
                    <InputPayment
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e)
                      }
                      id="BT"
                      value="BANK TRANSFER"
                      subLabel="Chuyển khoản ngân hàng"
                      label="BANK TRANSFER"
                      arrow={true}
                      name="cusPaymentNew"
                      required
                    >
                      <Bank />
                    </InputPayment>
                    <InputPayment
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e)
                      }
                      id="MOMO"
                      value="MOMO"
                      subLabel="Thanh toán bằng ví điện tử"
                      label="MOMO"
                      name="cusPaymentNew"
                      arrow={true}
                      required
                    >
                      <Wallet />
                    </InputPayment>
                    <InputPayment
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e)
                      }
                      id="VISA/MASTERCARD"
                      value="VISA/MASTERCARD"
                      subLabel="Thanh toán bằng thẻ ngân hàng"
                      label="Visa / Mastercard"
                      name="cusPaymentNew"
                      arrow={true}
                      required
                      disabled
                    >
                      <Card />
                    </InputPayment>
                    <div className={styles["button-container"]}>
                      <ButtonMain type="submit">
                        {order ? "Cập Nhật" : "Đặt Hàng"}
                      </ButtonMain>
                      <ButtonSub
                        type="button"
                        onClick={() => handleDeleteItem(values)}
                      >
                        Delete
                      </ButtonSub>
                    </div>
                  </Form>
                )}
              </Formik>
            </span>
          </div>
          <div className={styles["column"]}>
            <div className={styles["cart"]}>
              {cart && cart.length === 0 ? (
                <div className={styles["cart-text"]}>
                  <p>Chọn sản phẩm thêm vào giỏ hàng!</p>
                </div>
              ) : null}

              {cart &&
                React.Children.toArray(
                  cart.map((item: any) => {
                    return (
                      <CardCart
                        onClick={() => handleRemoveFromCart(item)}
                        titleCard={item?.nameItem}
                        imgCard={item?.imgItem}
                        priceCard={item?.priceItem}
                        sizeCard={item?.sizeItem}
                        colorCard={item?.colorItem}
                        qtyCard={item?.amount}
                      ></CardCart>
                    );
                  })
                )}
            </div>
            <div className={styles["cart-total"]}>
              <div className={styles["row"]}>
                <p className={styles["title"]}>Đơn Hàng:</p>
                <p>{totalPrice.toLocaleString()}</p>
              </div>

              <div className={styles["row"]}>
                <p className={styles["title"]}>Phí Vận Chuyển: </p>
                <p>{totalPrice.toLocaleString()}</p>
              </div>
              <hr />
              <div className={styles["row"]}>
                <p className={styles["title"]}>Đã bao gồm thuế VAT 10% :</p>
                <p>{(totalPrice * 0.1).toLocaleString()}</p>
              </div>
              <div className={styles["row"]}>
                <p className={styles["title"]}>TỔNG: </p>
                <p>{(totalPrice + totalPrice * 0.1).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
