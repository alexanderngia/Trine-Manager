import { Layout } from "components/views/layout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { messageActions } from "redux/reducers/messageSlice";
import postService from "services/postService";
import PreviewImg from "components/ui/image/previewImg";
import styles from "./index.module.scss";
import "./index.scss";
import { ButtonMain, ButtonSub } from "components/ui/button/button";
import { history } from "utils/history";
import { Input } from "components/ui/form/input";

const MarkdownIt = require("markdown-it");
const mdParser = new MarkdownIt(/* Markdown-it options */);

export interface PostProps {}

const Post: React.FC<PostProps> = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);
  const { post } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  const [initialValue, setInitialValue] = useState({
    id: "",
    // authorNew: `${user.fullNameUser}`,
    authorNew: ``,
    urlNew: "",
    titleNew: "",
    bodyNew: "",
    bodyHtmlNew: "",
    featureImgNew: "",
    categoryNew: "",
    keywordTagNew: "",
    titleTagNew: "",
    descripTagNew: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (post) {
          const urlPost = post.title
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
            id: `${post.id}`,
            authorNew: `${post.author}`,
            urlNew: `${urlPost}`,
            titleNew: `${post.title}`,
            bodyNew: `${post.body}`,
            bodyHtmlNew: `${post.bodyHtml}`,
            featureImgNew: `${post.featureImg}`,
            categoryNew: `${post.category}`,
            keywordTagNew: `${post.keywordTag}`,
            titleTagNew: `${post.title}`,
            descripTagNew: `${post.descripTag}`,
          });
          dispatch(messageActions.clearMessage());
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, post]);

  const handleRegister = async (formValue: any, { resetForm }: any) => {
    const {
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
      let res = await postService.createPost({
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
        await alert(`${message}`);
        history.push("/post-manager");
      }

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
          history.push("/post-manager");
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
  const customOnchange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    setFieldValue(
      "urlNew",
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
        <h1>{post ? "CẬP NHẬT BÀI VIẾT" : "THÊM BÀI VIẾT"}</h1>
        <Formik
          initialValues={initialValue}
          validateOnChange={true}
          onSubmit={post ? handleUpdate : handleRegister}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, handleChange }: any) => (
            <Form className={styles["form"]}>
              <div className={styles["container"]}>
                <span className={styles["column"]}>
                  <Input
                    onChange={(e) => handleChange(e)}
                    value={values.id}
                    type="text"
                    name="id"
                    hidden
                  />
                  <Input
                    onChange={() =>
                      setFieldValue("authorNew", `${post.author}`)
                    }
                    value={values.id}
                    type="text"
                    name="authorNew"
                    hidden
                  />
                  <Input
                    customClass={styles["col-1"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      customOnchange(e, setFieldValue);
                    }}
                    value={values.titleNew}
                    type="text"
                    name="titleNew"
                    title="TIÊU ĐỀ"
                    placeholder="TIÊU ĐỀ"
                  />

                  <span className={styles["permalink"]}>
                    <label htmlFor="urlNew" className={styles["label"]}>
                      Permalink
                    </label>
                    <Input
                      customClass={styles["link"]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        customOnchange(e, setFieldValue);
                      }}
                      value={values.titleNew
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
                      id="urlNew"
                      type="text"
                      name="urlNew"
                      placeholder="TIÊU ĐỀ"
                    />
                  </span>
                  <span className={styles["col-1"]}>
                    <MdEditor
                      style={{ height: "500px" }}
                      name="bodyNew"
                      value={`${values.bodyNew}`}
                      renderHTML={(text) => mdParser.render(text)}
                      onChange={(e) => {
                        setFieldValue("bodyNew", `${e.text}`);
                        setFieldValue("bodyHtmlNew", `${e.html}`);
                      }}
                    />
                  </span>
                  <Input
                    customClass={styles["col-1"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    value={values.titleTagNew}
                    type="text"
                    id="titleTagNew"
                    name="titleTagNew"
                    title="Tiêu Đề SEO"
                    placeholder="lingerie, đồ bơi,..."
                  />
                  <Input
                    customClass={styles["col-1"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    value={values.descripTagNew}
                    type="text"
                    id="descripTagNew"
                    name="descripTagNew"
                    title="Description SEO"
                    placeholder="lingerie, đồ bơi,..."
                  />
                </span>

                <span className={styles["column"]}>
                  <span className={styles["col-1"]}>
                    <PreviewImg />
                  </span>
                  <Input
                    customClass={styles["col-1"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    value={values.featureImgNew}
                    type="text"
                    id="featureImgNew"
                    name="featureImgNew"
                    title="Ảnh Bài Viết"
                    placeholder="http://firebase.com/image"
                  />
                  <Input
                    customClass={styles["col-1"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    value={values.keywordTagNew}
                    type="text"
                    id="keywordTagNew"
                    name="keywordTagNew"
                    title="Từ Khóa"
                    placeholder="lingerie, đồ bơi,..."
                  />
                  <Input
                    customClass={styles["col-1"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                    }}
                    value={values.categoryNew}
                    type="text"
                    id="categoryNew"
                    name="categoryNew"
                    title="Thể Loại"
                    placeholder="Lingerie"
                  />
                  <div className={styles["button-container"]}>
                    <ButtonMain type="submit">
                      {post ? "Update" : "Save"}
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
              <p className={styles["message"]}>{message}</p>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Post;
