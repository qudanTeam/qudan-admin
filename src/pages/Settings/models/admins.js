import { requestDataToPageResult } from "@/utils/utils";
import { message } from "antd";
import { queryAdmins, createAdmins, updateAdmins, deleteAdmins, updateAdminPassword } from "@/services/admins";

export default {
  namespace: 'admins',

  state: {
    data: {
      list: [],
      pagination: {},
    },

    details: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(queryAdmins, payload);
      yield put({
        type: 'save',
        payload: requestDataToPageResult(resp),
      });
    },

    *create({ payload }, { call, put }) {
      const resp = yield call(createAdmins, payload);

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
      const resp = yield call(updateAdmins, payload);

      if (resp.id) {
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

    *updatePassword({ payload }, { call, put }) {
      const resp = yield call(updateAdminPassword, payload);

      if (resp.id) {
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
      yield call(deleteAdmins, id);
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