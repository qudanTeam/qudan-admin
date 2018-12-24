import { requestDataToPageResult } from "@/utils/utils";
import { message } from "antd";
import { queryProductConfigs, createProductConfigs, updateProductConfigs } from "@/services/productConfig";

export default {
  namespace: 'product_configs',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(queryProductConfigs, payload);
      yield put({
        type: 'save',
        payload: requestDataToPageResult(resp),
      });
    },

    *create({ payload }, { call, put }) {
      payload.product_id = payload.product_id_obj.key;
      const resp = yield call(createProductConfigs, payload);

      if (resp.id) {
        message.success('创建成功');
        yield put({
          type: 'fetch',
          payload: {
            page: 1,
            pageSize: 15,
          },
        });
      }
    },

    *update({ payload }, { call, put }) {
      payload.product_id = payload.product_id_obj.key;
      const resp = yield call(updateProductConfigs, payload);

      if (resp.reply) {
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