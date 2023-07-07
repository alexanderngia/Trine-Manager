export interface IProduct {
  id: number;
  idItem: string;
  imgItem: string;
  urlItem: string;
  nameItem: string;
  bodyItem: string;
  bodyHtmlItem: string;
  qualityItem: number;
  colorItem: string;
  sizeItem: string;
  priceItem: number;
  categoryItem: string;
  keywordTagItem: string;
  titleTagItem: string;
  descripTagItem: string;
  authorItem: string;
}

export interface IProductNew {
  id?: string;
  idItemNew: string;
  imgItemNew: string;
  urlItemNew: string;
  nameItemNew: string;
  bodyItemNew: string;
  bodyHtmlItemNew: string;
  qualityItemNew: number;
  colorItemNew: string;
  sizeItemNew: string;
  priceItemNew: number;
  categoryItemNew: string;
  keywordTagItemNew: string;
  titleTagItemNew: string;
  descripTagItemNew: string;
  authorItemNew: string;
}
