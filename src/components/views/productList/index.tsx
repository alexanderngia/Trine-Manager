import { ButtonMain } from "components/ui/button/button";
import { CardItem } from "components/ui/card";
import { Search } from "components/ui/search";
import { Layout } from "components/views/layout";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import { productActions } from "redux/reducers/productSlice";
import productService from "services/productService";
import { history } from "utils/history";
import styles from "./index.module.scss";
import { productMock } from "data/product-mockData";
import { IProduct } from "services/productService";
import { Add, Download } from "components/ui/icon";
import FunctionBtn from "components/container/functionBtn";

export interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = () => {
  const [data, setData] = useState([] as IProduct[]);

  const [role, setRole] = useState("");
  const [q, setQ] = useState("");
  const [searchParam] = useState(["nameItem", "categoryItem"]);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await productService.getProductBoard();
        // setData(data);
        setData(productMock);
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

  const openProduct = (product: any) => {
    dispatch(productActions.setProduct(product));
    history.push("/product");
  };
  const handleAddProduct = () => {
    dispatch(productActions.clearProduct());
    history.push("/product");
  };

  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH SÁCH SẢN PHẨM</h1>
        <div className={styles["btn-container"]}>
          <div className={styles["filter"]}>
            <Search
              name="search-form"
              id="search-form"
              value={q}
              className={styles["search"]}
              onChange={(e: any) => setQ(e.target.value)}
            />
            <ButtonMain onClick={() => filter("lingeria")}>LINGERIA</ButtonMain>
            <ButtonMain onClick={() => filter("accessories")}>
              ACCESSORIES
            </ButtonMain>
            <ButtonMain onClick={() => filter("dress")}>DRESS</ButtonMain>
          </div>
          <FunctionBtn />
        </div>
        {data.length > 0 && (
          <>
            <ul className={styles["card-container"]}>
              {React.Children.toArray(
                search(data).map((listItems: any) => {
                  return (
                    <CardItem
                      onClick={() => openProduct(listItems)}
                      className={styles["product-list"]}
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
      </div>
    </Layout>
  );
};

export default ProductList;
