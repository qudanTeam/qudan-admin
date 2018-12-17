import { queryBanners, createBanner, updateBanner, deleteBanner } from "@/services/banner";
import { requestDataToPageResult } from "@/utils/utils";
import { message } from "antd";

export default {
  namespace: 'banners',

  state: {
    data: {
      list: [],
      pagination: {},
    },

    details: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(queryBanners, payload);
      yield put({
        type: 'save',
        payload: requestDataToPageResult(resp),
      });
    },

    *create({ payload }, { call, put }) {
      const resp = yield call(createBanner, payload);

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
      const resp = yield call(updateBanner, payload);

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

    *delete({ payload }, { call, put }) {
      const { id } = payload;
      yield call(deleteBanner, id);
      message.success('删除成功');
      yield put({
        type: 'fetch',
        payload: {
          page: 1,
          pageSize: 15,
        },
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

    saveDetails(state, { payload }) {
      return {
        ...state,
        details: payload,
      };
    },
  },
}