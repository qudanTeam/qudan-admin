
import { 
  queryUsers,
  queryUserProfile,
  queryUserVipProfile,
 } from '@/services/api';
import { requestDataToPageResult } from '@/utils/utils';



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
      // console.log(response, "==========0000");
      // console.log(response, "=====");
      const data = response;
      yield put({
        type: 'save',
        payload: requestDataToPageResult(data),
      });
    },

    *fetchProfile({ payload }, { call, put }) {
      const result = yield call(queryUserProfile, payload.id);
      const vipInfo = yield call(queryUserVipProfile, payload.id);
      // const { result } = response;
      // const { result: vipInfo } = vipResp;

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