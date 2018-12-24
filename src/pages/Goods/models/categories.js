import { requestDataToPageResult } from "@/utils/utils";
import { message } from "antd";
import { queryCategories, createCategory, updateCategory } from "@/services/categories";

export default {
  namespace: 'categories',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(queryCategories, payload);
      yield put({
        type: 'save',
        payload: requestDataToPageResult(resp),
      });
    },

    *create({ payload }, { call, put }) {
      const resp = yield call(createCategory, payload);

      if (resp.id) {
        message.success('创建成功');
        yield put({
          type: 'fetch',
          payload: {
            category_type: payload.category_type,
            page: 1,
            pageSize: 15,
          },
        });
      }
    },

    *update({ payload }, { call, put }) {
      const resp = yield call(updateCategory, payload);

      if (resp.reply) {
        message.success('修改成功');
        yield put({
          type: 'fetch',
          payload: {
            category_type: payload.category_type,
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