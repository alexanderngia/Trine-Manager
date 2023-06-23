import axios from "axios";
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/posts`;
export interface IPost {
  id: number;
  author: string;
  url: string;
  title: string;
  body: string;
  bodyHtml: string;
  featureImg: string;
  category: string;
  keywordTag: string;
  titleTag: string;
  descripTag: string;
}
export interface RegisterProps {
  authorNew: string;
  urlNew: string;
  titleNew: string;
  bodyNew: string;
  bodyHtmlNew: string;
  featureImgNew: string;
  categoryNew: string;
  keywordTagNew: string;
  titleTagNew: string;
  descripTagNew: string;
}
export interface UpdateProps extends RegisterProps {
  id: number;
}

const getPostBoard: () => Promise<any> = async () => {
  return await axios.get(API_URL + "?id=ALL").then((res) => {
    return res.data.posts;
  });
};
const handleRegisterApi = ({
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
}: RegisterProps) => {
  return axios.post(API_URL + "/create", {
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

const handleUpdateApi = async ({
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
}: UpdateProps) => {
  return await axios.put(API_URL + "/edit", {
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
const handleDeleteApi = async (postId: any) => {
  return await axios.delete(API_URL + "/delete", {
    data: {
      id: postId,
    },
  });
};

const postService = {
  getPostBoard,
  handleRegisterApi,
  handleUpdateApi,
  handleDeleteApi,
};
export default postService;
