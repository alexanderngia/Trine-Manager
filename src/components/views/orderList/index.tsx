import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Layout } from "components/views/layout";
import { ButtonMain } from "components/ui/button/button";
import { Card } from "components/ui/card";
import { Plus } from "@styled-icons/boxicons-regular/Plus";
import { Download } from "@styled-icons/bootstrap/Download";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import orderService from "services/orderService";
import { orderActions } from "redux/reducers/orderSlice";
import { history } from "utils/history";
import { Search } from "components/ui/search";
export interface OrderListProps {}

const OrderList: React.FC<OrderListProps> = (props) => {
  const [role, setRole] = useState("");
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState([
    "fullNameCustomer",
    "statusShipping",
    "phoneCustomer",
  ]);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await orderService.getOrderBoard();
        setData(data);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setRole(user.typeRole);
    }
  }, [user]);

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
  const handleAddOrder = () => {
    dispatch(orderActions.clearOrder());
    history.push("/order");
  };
  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH SÁCH ĐƠN HÀNG</h1>
        <div className={styles["btn-container"]}>
          <div className={styles["filter"]}>
            <Search
              name="search-form"
              id="search-form"
              value={q}
              className={styles["search"]}
              onChange={(e: any) => setQ(e.target.value)}
            />
            <ButtonMain onClick={() => filter("new")}>NEW</ButtonMain>
            <ButtonMain onClick={() => filter("shipping")}>SHIPPING</ButtonMain>
            <ButtonMain onClick={() => filter("done")}>DONE</ButtonMain>
          </div>
          <div className={styles["btnCrud"]}>
            <ButtonMain onClick={handleAddOrder}>
              <Plus size={20} className={styles["icon"]} />
            </ButtonMain>
            {role === "ADMIN" && (
              <ButtonMain>
                <Download size={20} className={styles["icon"]} />
              </ButtonMain>
            )}
          </div>
        </div>
        {data.length > 0 && (
          <ul className={styles["card-container"]}>
            {React.Children.toArray(
              search(data).map((listItems: any) => {
                return (
                  <Card
                    className={styles["card-custom"]}
                    // onClick={() => openItemModal(listItems)}
                    titleCard={listItems.fullNameCustomer}
                    textCardOne={listItems.phoneCustomer}
                    textCardTwo={listItems.statusShipping}
                    textCardThree={listItems.adressShipping}
                    textCardFour={listItems.priceShipping}
                  />
                );
              })
            )}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default OrderList;
