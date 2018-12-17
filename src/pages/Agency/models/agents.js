import { queryAgents, queryAgentChilds, queryAgentRewards } from "@/services/agents";
import { requestDataToPageResult } from "@/utils/utils";

export default {
  namespace: 'agents',

  state: {
    data: {
      list: [],
      pagination: {},
    },

    parentAgentID: 0,

    childs: {
      list: [],
      pagination: {},
    },

    rewards: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {

      const resp = yield call(queryAgents, payload);
      yield put({
        type: 'save',
        payload: requestDataToPageResult(resp),
      });
    },

    *fetchChilds({ payload }, { call, put }) {
      const { pid } = payload;
      yield put({
        type: 'saveParentAgentID',
        payload: pid,
      });

      const resp = yield call(queryAgentChilds, payload);
      yield put({
        type: 'saveChilds',
        payload: requestDataToPageResult(resp),
      });
    },

    *fetchRewards({ payload }, { call, put }) {
      const { pid } = payload;
      yield put({
        type: 'saveParentAgentID',
        payload: pid,
      });

      const resp = yield call(queryAgentRewards, payload);
      yield put({
        type: 'saveRewards',
        payload: requestDataToPageResult(resp),
      });
    },

  },

  reducers: {
    saveParentAgentID(state, { payload }) {
      return {
        ...state,
        parentAgentID: payload,
      }
    },

    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

    saveChilds(state, action) {
      return {
        ...state,
        childs: action.payload,
      };
    },

    saveRewards(state, action) {
      return {
        ...state,
        rewards: action.payload,
      };
    },
  },

}