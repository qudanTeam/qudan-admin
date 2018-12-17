import { requestDataToPageResult } from "@/utils/utils";
import { message } from "antd";
import { queryMessages, createMessage, deleteMessage, pushMessage, updateMessage } from "@/services/messages";

export default {
  namespace: 'messages',

  state: {
    data: {
      list: [],
      pagination: {},
    },

    details: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(queryMessages, payload);
      yield put({
        type: 'save',
        payload: requestDataToPageResult(resp),
      });
    },

    *create({ payload }, { call, put }) {
      const resp = yield call(createMessage, payload);

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
      const resp = yield call(updateMessage, payload);

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

    *push({ payload }, { call, put }) {
      
      const resp = yield call(pushMessage, payload.id);
      console.log(resp, 'resp');
      if (resp.ids) {
        message.success('推送成功');
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
      yield call(deleteMessage, id);
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