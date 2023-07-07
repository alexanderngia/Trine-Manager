import axios from "axios";
import { IPostNew } from "types/post";
import { post } from "data/post";

const getPost: () => Promise<any> = async () => {
  // if (process.env.GET_POST_API) {
  //   await axios.get(process.env.GET_POST_API).then((res) => {
  //     return res.data.posts;
  //   });
  // }
  return post;
};
const createPost = ({
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
}: IPostNew) => {
  if (process.env.CREATE_POST_API)
    return axios.post(process.env.CREATE_POST_API, {
      author: authorNew,
      url: urlNew,
      title: titleNew,
      body: bodyNew,
      bodyHtml: bodyHtmlNew,
      featureImg: featureImgNew,
      category: categoryNew,
      keywordTag: keywordTagNew,
      titleTag: titleTagNew,
      descripTag: descripTagNew,
    });
};

const updatePost = async ({
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
}: IPostNew) => {
  if (process.env.EDIT_POST_API)
    return await axios.put(process.env.EDIT_POST_API, {
      id: id,
      author: authorNew,
      url: urlNew,
      title: titleNew,
      body: bodyNew,
      bodyHtml: bodyHtmlNew,
      featureImg: featureImgNew,
      category: categoryNew,
      keywordTag: keywordTagNew,
      titleTag: titleTagNew,
      descripTag: descripTagNew,
    });
};
const deletePost = async (postId: any) => {
  if (process.env.DELETE_POST_API)
    return await axios.delete(process.env.DELETE_POST_API, {
      data: {
        id: postId,
      },
    });
};

const postService = {
  getPost,
  createPost,
  updatePost,
  deletePost,
};
export default postService;
