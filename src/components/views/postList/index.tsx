import { ButtonMain } from "components/ui/button/button";
import { CardList } from "components/ui/card";
import { Layout } from "components/views/layout";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import { Plus } from "@styled-icons/boxicons-regular/Plus";
import { Download } from "@styled-icons/bootstrap/Download";
import { postActions } from "redux/reducers/postSlice";
import postService from "services/postService";
import { history } from "utils/history";
import styles from "./index.module.scss";
import { Search } from "components/ui/search";
import { IPost } from "services/postService";
import { postMock } from "data/post-mockData";

export interface PostListProps {}

const PostList: React.FC<PostListProps> = (props) => {
  const [data, setData] = useState([] as IPost[]);
  const [role, setRole] = useState("");
  const [q, setQ] = useState("");
  const [searchParam] = useState(["title", "category"]);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await postService.getPostBoard();
        // setData(data);
        setData(postMock);
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

  const openPost = (post: any) => {
    dispatch(postActions.setPost(post));
    history.push("/post");
  };
  const handleAddPost = () => {
    dispatch(postActions.clearPost());
    history.push("/post");
  };
  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH SÁCH BÀI VIẾT</h1>
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
          <div className={styles["btnCrud"]}>
            <ButtonMain onClick={handleAddPost}>
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
          <>
            <ul className={styles["card-container"]}>
              {React.Children.toArray(
                search(data).map((listItems: any) => {
                  return (
                    <CardList
                      onClick={() => openPost(listItems)}
                      className={styles["post-list"]}
                      titleCard={listItems.title}
                      imgCard={listItems.featureImg}
                      textCardOne={listItems.author}
                      textCardTwo={listItems.category}
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

export default PostList;
