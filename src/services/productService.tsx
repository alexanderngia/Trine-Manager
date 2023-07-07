import axios from "axios";
import { IProductNew } from "types/product";
import { products } from "data/product";
const getProduct: () => Promise<any> = async () => {
  // if (process.env.GET_PRODUCT_API)
  //   await axios.get(process.env.GET_PRODUCT_API).then((res) => {
  //     return res.data.products;
  //   });

  return products;
};

const createProduct = ({
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
}: IProductNew) => {
  if (process.env.CREATE_PRODUCT_API)
    return axios.post(process.env.CREATE_PRODUCT_API, {
      idItem: idItemNew,
      imgItem: imgItemNew,
      urlItem: urlItemNew,
      nameItem: nameItemNew,
      bodyItem: bodyItemNew,
      bodyHtmlItem: bodyHtmlItemNew,
      qualityItem: qualityItemNew,
      colorItem: colorItemNew,
      sizeItem: sizeItemNew,
      priceItem: priceItemNew,
      categoryItem: categoryItemNew,
      keywordTagItem: keywordTagItemNew,
      titleTagItem: titleTagItemNew,
      descripTagItem: descripTagItemNew,
      authorItem: authorItemNew,
    });
};

const updateProduct = async ({
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
}: IProductNew) => {
  if (process.env.UPDATE_PRODUCT_API)
    return await axios.put(process.env.UPDATE_PRODUCT_API, {
      id: id,
      idItem: idItemNew,
      imgItem: imgItemNew,
      urlItem: urlItemNew,
      nameItem: nameItemNew,
      bodyItem: bodyItemNew,
      bodyHtmlItem: bodyHtmlItemNew,
      qualityItem: qualityItemNew,
      colorItem: colorItemNew,
      sizeItem: sizeItemNew,
      priceItem: priceItemNew,
      categoryItem: categoryItemNew,
      keywordTagItem: keywordTagItemNew,
      titleTagItem: titleTagItemNew,
      descripTagItem: descripTagItemNew,
      authorItem: authorItemNew,
    });
};
const deleteProduct = async (userId: any) => {
  if (process.env.DELETE_PRODUCT_API)
    return await axios.delete(process.env.DELETE_PRODUCT_API, {
      data: {
        idItem: userId,
      },
    });
};

const productService = {
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
};
export default productService;
