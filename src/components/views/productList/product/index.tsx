import classnames from "classnames";
import { ButtonMain, ButtonSub } from "components/ui/button/button";
import { Input } from "components/ui/form/input";
import { RadioInput } from "components/ui/form/radio";
import PreviewImg from "components/ui/image/previewImg";
import { Layout } from "components/views/layout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { messageActions } from "redux/reducers/messageSlice";
import productService from "services/productService";
import { IProductNew } from "types/product";
import { history } from "utils/history";
import styles from "./index.module.scss";
import "./index.scss";
const { v4 } = require("uuid");
const MarkdownIt = require("markdown-it");
const mdParser = new MarkdownIt();

export interface ProductProps {}

const Product: React.FC<ProductProps> = () => {
  // const [deleteUser, setDeleteUser] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const { product } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const [initialValue, setInitialValue] = useState<IProductNew>({
    id: "",
    idItemNew: `${v4()}`,
    imgItemNew: "",
    urlItemNew: "",
    nameItemNew: "",
    bodyItemNew: "",
    bodyHtmlItemNew: "",
    qualityItemNew: 0,
    colorItemNew: "#000000",
    sizeItemNew: "",
    priceItemNew: 0,
    categoryItemNew: "",
    keywordTagItemNew: "",
    titleTagItemNew: "",
    descripTagItemNew: "",
    // authorItemNew: `${user.fullNameUser}`,
    authorItemNew: ``,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (product) {
          const urlProduct = product.nameItem
            .replaceAll(" ", "-")
            .replaceAll(",", "")
            .replaceAll(".", "")
            .replaceAll("?", "")
            .replaceAll("!", "")
            .replaceAll(":", "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase();
          setInitialValue({
            id: `${product.id}`,
            idItemNew: `${product.idItem}`,
            imgItemNew: `${product.imgItem}`,
            urlItemNew: `${urlProduct}`,
            nameItemNew: `${product.nameItem}`,
            bodyItemNew: `${product.bodyItem}`,
            bodyHtmlItemNew: `${product.bodyHtmlItem}`,
            qualityItemNew: product.qualityItem,
            colorItemNew: `${product.colorItem}`,
            sizeItemNew: `${product.sizeItem}`,
            priceItemNew: product.priceItem,
            categoryItemNew: `${product.categoryItem}`,
            keywordTagItemNew: `${product.keywordTagItem}`,
            titleTagItemNew: `${product.nameItem}`,
            descripTagItemNew: `${product.descripTagItem}`,
            authorItemNew: `${product.authorItem}`,
          });
          dispatch(messageActions.clearMessage());
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, product]);

  const handleRegister = async (formValue: IProductNew, { resetForm }: any) => {
    const {
      idItemNew,
      imgItemNew,
      urlItemNew,
      nameItemNew,
      bodyItemNew,
      bodyHtmlItemNew,
      qualityItemNew,
      colorItemNew,
      sizeItemNew,
      priceItemNew,
      categoryItemNew,
      keywordTagItemNew,
      titleTagItemNew,
      descripTagItemNew,
      authorItemNew,
    } = formValue;
    try {
      let res = await productService.createProduct({
        idItemNew,
        imgItemNew,
        urlItemNew,
        nameItemNew,
        bodyItemNew,
        bodyHtmlItemNew,
        qualityItemNew,
        colorItemNew,
        sizeItemNew,
        priceItemNew,
        categoryItemNew,
        keywordTagItemNew,
        titleTagItemNew,
        descripTagItemNew,
        authorItemNew,
      });

      resetForm({});

      const message = res?.data.message;
      const errMessage = res?.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        dispatch(messageActions.setMessage(message));
        alert(`Post ${message}`);
      }
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (formValue: IProductNew) => {
    const {
      id,
      idItemNew,
      imgItemNew,
      urlItemNew,
      nameItemNew,
      bodyItemNew,
      bodyHtmlItemNew,
      qualityItemNew,
      colorItemNew,
      sizeItemNew,
      priceItemNew,
      categoryItemNew,
      keywordTagItemNew,
      titleTagItemNew,
      descripTagItemNew,
      authorItemNew,
    } = formValue;
    try {
      let res = await productService.updateProduct({
        id,
        idItemNew,
        imgItemNew,
        urlItemNew,
        nameItemNew,
        bodyItemNew,
        bodyHtmlItemNew,
        qualityItemNew,
        colorItemNew,
        sizeItemNew,
        priceItemNew,
        categoryItemNew,
        keywordTagItemNew,
        titleTagItemNew,
        descripTagItemNew,
        authorItemNew,
      });

      const message = res?.data.message;
      const errMessage = res?.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        alert(`Product ${message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (deleteItem: IProductNew | null) => {
    try {
      if (deleteItem) {
        let confirmDelete = prompt(
          `Nhập DELETE vào ô để xác nhận xóa ${deleteItem.nameItemNew}!`,
          ""
        );
        if (confirmDelete === "DELETE") {
          let res = await productService.deleteProduct(deleteItem.idItemNew);
          const errMessage = res?.data.errMessage;
          const message = res?.data.message;
          if (errMessage) {
            dispatch(messageActions.setMessage(errMessage));
          }
          if (message) {
            dispatch(messageActions.clearMessage());
            await alert(deleteItem.nameItemNew + message);
            history.push("/product-manager");
          }
        }
        if (confirmDelete === "" || null) {
          dispatch(
            messageActions.setMessage(
              `Fail to remove ${deleteItem.nameItemNew}!`
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const customOnchange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    setFieldValue(
      "urlItemNew",
      e.target.value
        .replaceAll(" ", "-")
        .replaceAll(",", "")
        .replaceAll(".", "")
        .replaceAll("?", "")
        .replaceAll("!", "")
        .replaceAll(":", "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()
    );
  };

  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>{product ? "CẬP NHẬT SẢN PHẨM" : "THÊM SẢN PHẨM"}</h1>
        <Formik
          initialValues={initialValue}
          validateOnChange={true}
          onSubmit={product ? handleUpdate : handleRegister}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, handleChange }: any) => (
            <Form className={styles["form"]}>
              <div className={styles["container"]}>
                <span className={styles["column"]}>
                  <Input
                    customClass={styles["col-1"]}
                    type="text"
                    name="id"
                    hidden
                  />
                  <Input
                    customClass={styles["col-1"]}
                    type="text"
                    name="idItemNew"
                    hidden
                  />
                  <Input type="text" name="authorItemNew" hidden />
                  <Input
                    customClass={styles["col-1"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      customOnchange(e, setFieldValue);
                    }}
                    value={values.nameItemNew}
                    placeholder="Tên Sản Phẩm"
                    title="Tên Sản Phẩm"
                    type="text"
                    name="nameItemNew"
                  />

                  <span className={styles["permalink"]}>
                    <label htmlFor="urlItemNew" className={styles["label"]}>
                      Permalink
                    </label>
                    <Input
                      customClass={styles["link"]}
                      type="text"
                      name="urlItemNew"
                      value={values.nameItemNew
                        .replaceAll(" ", "-")
                        .replaceAll(",", "")
                        .replaceAll(".", "")
                        .replaceAll("?", "")
                        .replaceAll("!", "")
                        .replaceAll(":", "")
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/đ/g, "d")
                        .replace(/Đ/g, "D")
                        .toLowerCase()}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                      }}
                      id="urlItemNew"
                    />
                  </span>
                  <MdEditor
                    style={{ height: "500px" }}
                    name="bodyItemNew"
                    value={`${values.bodyItemNew}`}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={(e) => {
                      setFieldValue("bodyItemNew", `${e.text}`);
                      setFieldValue("bodyHtmlItemNew", `${e.html}`);
                    }}
                  />

                  <Input
                    customClass={styles["col-3"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    value={values.qualityItemNew}
                    title="Số Lượng"
                    type="number"
                    placeholder="10"
                    name="qualityItemNew"
                    id="qualityItemNew"
                  />

                  <span className={styles["col-3"]}>
                    <label htmlFor="colorItemNew" className={styles["label"]}>
                      Màu Sắc
                    </label>

                    <Field
                      className={styles["input"]}
                      type="color"
                      name="colorItemNew"
                      id="colorItemNew"
                    />
                    <ErrorMessage
                      className={styles["errMess"]}
                      name="colorItemNew"
                      component="div"
                    />
                  </span>
                  <span className={classnames(styles["col-3"], styles["size"])}>
                    <label htmlFor="sizeItemNew" className={styles["label"]}>
                      Size
                    </label>
                    <div className={styles["container"]}>
                      <RadioInput
                        title="S"
                        id="S"
                        name="sizeItemNew"
                        value="S"
                        onChange={(e) => handleChange(e)}
                      />
                      <RadioInput
                        title="M"
                        id="M"
                        name="sizeItemNew"
                        value="M"
                        onChange={(e) => handleChange(e)}
                      />
                      <RadioInput
                        title="L"
                        id="L"
                        name="sizeItemNew"
                        value="L"
                        onChange={(e) => handleChange(e)}
                      />
                      <RadioInput
                        title="XL"
                        id="XL"
                        name="sizeItemNew"
                        value="XL"
                        onChange={(e) => handleChange(e)}
                      />
                      <RadioInput
                        title="Free Size"
                        id="Free Size"
                        name="sizeItemNew"
                        value="Free Size"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </span>

                  <Input
                    customClass={styles["col-1"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    value={values.priceItemNew}
                    title="Giá Bán"
                    type="text"
                    placeholder="200.000"
                    name="priceItemNew"
                    id="priceItemNew"
                  />
                  <Input
                    customClass={styles["col-1"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    value={values.priceItemNew}
                    title="Tiêu Đề SEO"
                    type="text"
                    placeholder="lingerie, đồ bơi,..."
                    name="titleTagItemNew"
                    id="titleTagItemNew"
                  />
                  <Input
                    customClass={styles["col-1"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    value={values.priceItemNew}
                    title="Description SEO"
                    type="text"
                    placeholder="lingerie, đồ bơi,..."
                    name="descripTagItemNew"
                    id="descripTagItemNew"
                  />
                </span>

                <span className={styles["column"]}>
                  <PreviewImg />

                  <Input
                    customClass={styles["col-1"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    value={values.imgItemNew}
                    title="Ảnh Sản Phẩm"
                    type="text"
                    placeholder="http://firebase.com/image"
                    name="imgItemNew"
                    id="imgItemNew"
                  />

                  <Input
                    customClass={styles["col-1"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    value={values.keywordTagItemNew}
                    title="Từ Khóa"
                    type="text"
                    placeholder="lingerie, đồ bơi,..."
                    name="keywordTagItemNew"
                    id="keywordTagItemNew"
                  />
                  <Input
                    customClass={styles["col-1"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    value={values.categoryItemNew}
                    title="Thể Loại"
                    type="text"
                    placeholder="Lingerie"
                    name="categoryItemNew"
                    id="categoryItemNew"
                  />

                  <div className={styles["container"]}>
                    <ButtonMain type="submit">
                      {product ? "Update" : "Add"}
                    </ButtonMain>
                    <ButtonSub
                      type="button"
                      onClick={() => handleDeleteItem(product ? values : null)}
                    >
                      Delete
                    </ButtonSub>
                  </div>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Product;
