import { createProduct } from "@/services/products";
import { message } from "antd";

export default {
  namespace: 'goodAdd',
  state: {
    productInfo: {
      is_show: true,
      is_hot: true,
      is_in_shop: true,
      how_settle: '无',
      product_type: 2,
    }
  },

  effects: {
    *create({ payload }, { put, select, call }) {

      yield put({
        type: 'saveFormData',
        payload,
      });
      const { productInfo } = yield select(_ => _.goodAdd);
      console.log(productInfo, 'product info');
      const resp = yield call(createProduct, productInfo);

      if (resp.id) {
        // message.success('创建成功');
        return true;
      } else {
        message.error('添加产品失败了！');
        return false;
      }
    }
  },

  reducers: {
    saveFormData(state, action) {
      const formData = {
        ...state.productInfo,
        ...action.payload,
      }
      return {
        ...state,
        productInfo: formData,
        formData,
      };
    },

    clearProduct(state, action) {
      return {
        ...state,
        productInfo: {
          is_show: true,
          is_hot: true,
          is_in_shop: true,
          product_type: 2,
        },
      };
    },

  }
}