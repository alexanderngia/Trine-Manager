import { Layout } from "components/views/layout";
import { Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import { messageActions } from "redux/reducers/messageSlice";
import postService from "services/postService";
import styles from "./index.module.scss";
import { ButtonMain, ButtonSub } from "components/ui/button/button";
import { history } from "utils/history";
import { CardItem } from "components/ui/card";
import productService from "services/productService";
import { Search } from "components/ui/search";
import { cartActions } from "redux/reducers/cartSlice";
import { productMock } from "data/product-mockData";
import { IProduct } from "services/productService";

import orderService from "services/orderService";

export interface OrderProps {}

const Order: React.FC<OrderProps> = () => {
  const [data, setData] = useState([] as IProduct[]);
  const [cart, setCart] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);
  const { order } = useAppSelector((state) => state.order);
  // const { cart } = useAppSelector((state) => state.cart);

  const [q, setQ] = useState("");
  const [searchParam] = useState(["nameItem", "categoryItem"]);
  const dispatch = useAppDispatch();
  const { v4 } = require("uuid");

  const [initialValue, setInitialValue] = useState({
    id: "",
    idOrderNew: `${v4()}`,
    cusNameNew: "",
    cusEmailNew: "",
    cusPhoneNew: "",
    cusAdressNew: "",
    orderNoteNew: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await productService.getProductBoard();
        // setData(data);
        setData(productMock);
        if (order) {
          setInitialValue({
            id: `${order.id}`,
            idOrderNew: `${order.idOrder}`,
            cusNameNew: `${order.cusName}`,
            cusEmailNew: `${order.cusEmail}`,
            cusPhoneNew: `${order.cusPhone}`,
            cusAdressNew: `${order.cusAdress}`,
            orderNoteNew: `${order.orderNote}`,
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
      orderNoteNew,
    } = infoOrder;

    try {
      await orderService.createOrder({
        idOrderNew,
        cusNameNew,
        cusEmailNew,
        cusPhoneNew,
        cusAdressNew,
        orderNoteNew,
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
      let res = await postService.handleUpdateApi({
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

      const message = res.data.message;
      const errMessage = res.data.errMessage;
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
        let res = await postService.handleDeleteApi(deleteItem.id);
        const errMessage = res.data.errMessage;
        const message = res.data.message;
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

  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>{order ? "CẬP NHẬT ĐƠN HÀNG" : "TẠO ĐƠN HÀNG"}</h1>
        <div className={styles["container-cart"]}>
          <div className={styles["column"]}>
            <span className={styles["row"]}>
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
                  className={styles["last-button"]}
                >
                  DRESS
                </ButtonMain>
              </div>
            </span>

            <span className={styles["row"]}>
              <label className={styles["label"]}>Chọn Sản Phẩm</label>

              {data.length > 0 && (
                <>
                  <ul className={styles["container-card"]}>
                    {React.Children.toArray(
                      search(data).map((listItems: any) => {
                        return (
                          <CardItem
                            className={styles["card-item"]}
                            onClick={() =>
                              // dispatch(cartActions.addToCart(listItems))
                              handleAddToCart(listItems)
                            }
                            titleCard={listItems.nameItem}
                            imgCard={listItems.imgItem}
                            qtyCard={listItems.qualityItem}
                            colorCard={listItems.colorItem}
                            sizeCard={listItems.sizeItem}
                            priceCard={listItems.priceItem}
                          />
                        );
                      })
                    )}
                  </ul>
                </>
              )}
            </span>
            <span className={styles["row"]}>
              <Formik
                initialValues={initialValue}
                validateOnChange={true}
                onSubmit={order ? handleUpdate : handleRegister}
                // onSubmit={(values) => {
                //   console.log(values);
                // }}
                enableReinitialize={true}
              >
                {({ values, setFieldValue }: any) => (
                  <Form className={styles["form"]}>
                    <div className={styles["container"]}>
                      <span className={styles["box"]}>
                        <Field
                          className={styles["input"]}
                          type="text"
                          name="idOrderNew"
                          hidden
                        />

                        <label htmlFor="cusNameNew" className={styles["label"]}>
                          Tên Khách Hàng
                        </label>
                        <Field
                          id="cusNameNew"
                          className={styles["input"]}
                          type="text"
                          name="cusNameNew"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label
                          htmlFor="cusPhoneNew"
                          className={styles["label"]}
                        >
                          Số Điện Thoại
                        </label>
                        <Field
                          className={styles["input"]}
                          type="number"
                          name="cusPhoneNew"
                          id="cusPhoneNew"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label
                          htmlFor="cusEmailNew"
                          className={styles["label"]}
                        >
                          Email
                        </label>
                        <Field
                          className={styles["input"]}
                          type="email"
                          name="cusEmailNew"
                          id="cusEmailNew"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label
                          htmlFor="cusAdressNew"
                          className={styles["label"]}
                        >
                          Địa Chỉ
                        </label>
                        <Field
                          className={styles["input"]}
                          type="text"
                          name="cusAdressNew"
                          id="cusAdressNew"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label
                          htmlFor="orderNoteNew"
                          className={styles["label"]}
                        >
                          Ghi Chú Đơn Hàng
                        </label>
                        <Field
                          className={styles["input"]}
                          type="text"
                          placeholder="Khách quen cần gấp, giao trong ngày"
                          name="orderNoteNew"
                          id="orderNoteNew"
                        />
                      </span>

                      <div className={styles["button-container"]}>
                        <ButtonSub
                          type="button"
                          onClick={() => handleDeleteItem(values)}
                        >
                          Delete
                        </ButtonSub>
                        <ButtonMain type="submit">
                          {order ? "Cập Nhật" : "Đặt Hàng"}
                        </ButtonMain>
                      </div>
                    </div>
                    {/* <p className={styles["message"]}>{message}</p> */}
                  </Form>
                )}
              </Formik>
            </span>
          </div>
          <div className={styles["column"]}>
            <div className={styles["cart-box"]}>
              <div className={styles["cart"]}>
                <div className={styles["cart-items"]}>
                  {cart && cart.length === 0 ? (
                    <div className={styles["cart-text"]}>
                      Chọn sản phẩm thêm vào giỏ hàng!
                    </div>
                  ) : null}

                  {cart &&
                    React.Children.toArray(
                      cart.map((item: any) => {
                        return (
                          <CardItem
                            onClick={() => handleRemoveFromCart(item)}
                            titleCard={item?.nameItem}
                            imgCard={item?.imgItem}
                            priceCard={item?.priceItem}
                            sizeCard={item?.sizeItem}
                            colorCard={item?.colorItem}
                            qtyCard={item?.amount}
                          ></CardItem>
                        );
                      })
                    )}
                </div>
              </div>
              <div className={styles["cart-total"]}>
                <hr />
                <div className={styles["sub-total"]}>
                  <div className={styles["row"]}>
                    <span>Price:</span>
                    <span>{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className={styles["row"]}>
                    <span>VAT 10%: </span>
                    <span>{(totalPrice * 0.1).toLocaleString()}</span>
                  </div>
                  <div className={styles["row"]}>
                    <span>Shipping: </span>
                    <span>{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <hr />
                <div className={styles["total"]}>
                  <div className={styles["row"]}>
                    <span>TOTAL: </span>
                    <span>
                      {(totalPrice + totalPrice * 0.1).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
