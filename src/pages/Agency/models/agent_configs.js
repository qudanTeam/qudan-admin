import { queryAgentConfigs, updateAgentConfig, createAgentConfig, queryAgentConfigDetails, deleteAgentConfig } from "@/services/agents";
import { requestDataToPageResult } from "@/utils/utils";
import { message } from "antd";

export default {
  namespace: 'agent_configs',

  state: {
    data: {
      list: [],
      pagination: {},
    },

    details: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(queryAgentConfigs, payload);
      yield put({
        type: 'save',
        payload: requestDataToPageResult(resp),
      });
    },

    *fetchDetails({ payload }, { call, put }) {
      const { id } = payload;

      const resp = yield call(queryAgentConfigDetails, id);
      const { reply } = resp;

      yield put({
        type: 'saveDetails',
        payload: reply,
      });
    },

    *create({ payload }, { call, put }) {
      const resp = yield call(createAgentConfig, payload);

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
      const resp = yield call(updateAgentConfig, payload);

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
      yield call(deleteAgentConfig, id);
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