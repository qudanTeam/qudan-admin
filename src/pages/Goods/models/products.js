import { requestDataToPageResult } from "@/utils/utils";
import { message } from "antd";
import { queryProducts } from "@/services/products";


export default {
  namespace: 'products',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(queryProducts, payload);
      yield put({
        type: 'save',
        payload: requestDataToPageResult(resp),
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },

}