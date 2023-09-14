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
  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);
  const { order } = useAppSelector((state) => state.order);
  // const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { v4 } = require("uuid");

  const [data, setData] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<any[]>([]);
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
  const discountList = [
    {
      code: "HKPHP",
      value: 0.1,
    },
    {
      code: "ABCDE",
      value: 0.2,
    },
    {
      code: "HKHK",
      value: 0.3,
    },
  ];

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
    discountCode: "",
    discountValue: 0,
    price: 0,
    shippingFee: 0,
    vat: 0,
    total: 0,
    cart: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productService.getProduct();
        setData(data);

        if (order) {
          setInitialValue({
            ...initialValue,
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
    const totalCart = cart.reduce(
      (total: any, item) => total + item.priceItem * item.amount,
      0
    );
    setInitialValue({
      ...initialValue,
      price: totalCart * (1 - initialValue.discountValue),
      vat: totalCart * 0.1,
      total: initialValue.price + initialValue.shippingFee + initialValue.vat,
    });
    console.log("effect");
  }, [cart, initialValue.price, initialValue.shippingFee]);



  const handleSubmit = async (infoOrder: any) => {
    const {
      idOrderNew,
      cusNameNew,
      cusEmailNew,
      cusPhoneNew,
      cusAdressNew,
      cusOrderNoteNew,
    } = infoOrder;

    try {
      console.log(infoOrder, "infoOrder");
      // await orderService.createOrder({
      //   idOrderNew,
      //   cusNameNew,
      //   cusEmailNew,
      //   cusPhoneNew,
      //   cusAdressNew,
      //   cusOrderNoteNew,
      //   cart,
      // });

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

  const onHandleCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: any
  ) => {
    const countryName = e.target.value;
    const countryCurrent = Country.find(
      (country) => country.name === countryName
    );
    if (countryCurrent) {
      setSelectedCountry(countryCurrent);
      setFieldValue("cusCountryNew", countryCurrent.name);
    }
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const onHandleStateChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: any
  ) => {
    const stateCurrent = selectedCountry?.state.find(
      (state) => state.name === e.target.value
    );
    if (stateCurrent) {
      setSelectedState(stateCurrent);

      if (stateCurrent.code === 79) {
        setFieldValue("cusStateNew", stateCurrent.name);
        setInitialValue({
          ...initialValue,
          shippingFee: 0,
        });
      } else {
        setFieldValue("cusStateNew", stateCurrent.name);
        setInitialValue({
          ...initialValue,
          shippingFee: 40000,
        });
      }
    }
    setSelectedDistrict(null);
    setSelectedWard(null);
  };
  const onHandleDistrictChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: any
  ) => {
    const selectedDistrict = selectedState?.districts.find(
      (district) => district.name === e.target.value
    );
    if (selectedDistrict) {
      setSelectedDistrict(selectedDistrict);
      setFieldValue("cusDistrictNew", selectedDistrict.name);
    }
    setSelectedWard(null);
  };
  const onHandleWardChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: any
  ) => {
    const selectedWard = selectedDistrict?.wards.find(
      (ward) => ward.name === e.target.value
    );
    if (selectedWard) {
      setSelectedWard(selectedWard);
      setFieldValue("cusWardNew", selectedWard.name);
    }
  };
  const onHandleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    discountList.filter(({ code, value }) => {
      return code === e.target.value
        ? setInitialValue({
            ...initialValue,
            discountCode: code,
            discountValue: value,
          })
        : setInitialValue({
            ...initialValue,
            discountCode: "",
            discountValue: 0,
          });
    });
    console.log(e.target.value, "e.target.value");
  };

  const handleTotal = (discount, shipping, vat) => {
    const totalCart = cart.reduce(
      (total: any, item) => total + item.priceItem * item.amount,
      0
    );

    // Apply discount
    const discountAmount = totalAmount * (discountPercentage / 100);
    totalAmount -= discountAmount;

    // Add shipping fee
    totalAmount += shippingFee;

    // Add VAT
    const vatAmount = totalAmount * (vatPercentage / 100);
    totalAmount += vatAmount;

    return totalAmount;
  };
  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>{order ? "CẬP NHẬT ĐƠN HÀNG" : "TẠO ĐƠN HÀNG"}</h1>
        <div className={styles["container"]}>
          <Formik
            initialValues={initialValue}
            validateOnChange={true}
            onSubmit={order ? handleUpdate : handleSubmit}
            enableReinitialize={true}
          >
            {({ values, handleChange, setFieldValue }: any) => (
              <Form className={styles["form"]}>
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
                    <label className={styles["label"]}>
                      Thông Tin Khách Hàng
                    </label>

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
                      onHandleCountry={(e: ChangeEvent<HTMLSelectElement>) => {
                        onHandleCountryChange(e, setFieldValue);
                      }}
                      onHandleState={(e: ChangeEvent<HTMLSelectElement>) => {
                        onHandleStateChange(e, setFieldValue);
                      }}
                      onHandleDistrict={(e: ChangeEvent<HTMLSelectElement>) => {
                        onHandleDistrictChange(e, setFieldValue);
                      }}
                      onHandleWard={(e: ChangeEvent<HTMLSelectElement>) => {
                        onHandleWardChange(e, setFieldValue);
                      }}
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
                  <div className={styles["total"]}>
                    <Input
                      customClass={styles["col-1"]}
                      id="discount"
                      type="text"
                      title="Mã Giảm Giá"
                      name="discount"
                      placeholder="HKPAP"
                      value={values.discount}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onHandleDiscountChange(e);
                      }}
                    />
                    <div className={styles["row"]}>
                      <p className={styles["title"]}>Đơn hàng:</p>
                      <p>{values.price.toLocaleString()}&nbsp; VND</p>
                    </div>

                    <div className={styles["row"]}>
                      <p className={styles["title"]}>Phí vận chuyển: </p>

                      <p>
                        {values.shippingFee
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        &nbsp; VND
                      </p>
                    </div>
                    <div className={styles["row"]}>
                      <p className={styles["title"]}>
                        Đã bao gồm thuế VAT 10% :
                      </p>
                      <p>
                        {values.vat
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        &nbsp; VND
                      </p>
                    </div>
                    <div className={styles["row"]}>
                      <p className={styles["title"]}>TỔNG: </p>
                      <p>
                        {/* {values.total
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                          handleTotal
                        &nbsp; VND
                      </p>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
