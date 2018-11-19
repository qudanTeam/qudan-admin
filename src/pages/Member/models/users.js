
import { 
  queryUsers,
  queryUserProfile,
  queryUserVipProfile,
 } from '@/services/api';


export default {
  namespace: 'users',

  state: {
    data: {
      list: [],
      pagination: {},
    },

    profile: {
      basicInfo: {},
      vipInfo: {},
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUsers, payload);
      const { status, result } = response;

      yield put({
        type: 'save',
        payload: result,
      });
    },

    *fetchProfile({ payload }, { call, put }) {
      const response = yield call(queryUserProfile, payload.id);
      const vipResp = yield call(queryUserVipProfile, payload.id);
      const { result } = response;
      const { result: vipInfo } = vipResp;

      yield put({
        type: 'saveProfile',
        payload: {
          basicInfo: result,
          vipInfo,
        },
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

    saveProfile(state, { payload }) {
      return {
        ...state,
        profile: payload,
      };
    },
  },
}