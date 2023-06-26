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

  export interface IAddPost {
    id?: string;
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