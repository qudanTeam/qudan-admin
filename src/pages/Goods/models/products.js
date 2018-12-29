import { requestDataToPageResult } from "@/utils/utils";
import { message } from "antd";
import { queryProducts, queryProductDetails, updateProduct, disableShelf, onShelf } from "@/services/products";


export default {
  namespace: 'products',
  state: {
    data: {
      list: [],
      pagination: {},
    },

    details: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(queryProducts, payload);
      yield put({
        type: 'save',
        payload: requestDataToPageResult(resp),
      });
    },

    *fetchDetails({ payload }, { call, put }) {
      const resp = yield call(queryProductDetails, payload.id);
      const { product } = resp;
      yield put({
        type: 'saveDetails',
        payload: product,
      });
    },

    *update({ payload }, { call, put}) {
      const resp = yield call(updateProduct, payload);
      const { id } = resp;

      if (id) {
        message.success('修改成功');
        yield put({
          type: 'fetch',
          payload: {
            page: 1,
            pageSize: 15,
          },
        });
      }
    },

    *disableShelf({ payload }, { call, put }) {
      const resp = yield call(disableShelf, payload.id);
      const { id } = resp;

      if (id) {
        message.success('下架成功');
        yield put({
          type: 'fetch',
          payload: {
            page: 1,
            pageSize: 15,
          },
        });
      }
    },

    *onShelf({ payload }, { call, put }) {
      const resp = yield call(onShelf, payload.id);
      const { id } = resp;

      if (id) {
        message.success('上架成功');
        yield put({
          type: 'fetch',
          payload: {
            page: 1,
            pageSize: 15,
          },
        });
      }
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    
    saveDetails(state, action) {
      return {
        ...state,
        details: action.payload,
      }
    }
  },

}