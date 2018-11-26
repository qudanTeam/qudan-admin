
import { 
  queryVips,
  queryVipDetails,
  // queryUserProfile,
  // queryUserVipProfile,
 } from '@/services/api';


export default {
  namespace: 'vips',

  state: {
    data: {
      list: [],
      pagination: {},
    },

    details: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryVips, payload);
      const { status, result } = response;

      yield put({
        type: 'save',
        payload: result,
      });
    },

    *fetchDetails({ payload }, { call, put }) {
      const response = yield call(queryVipDetails, payload.id);

      const { result } = response;

      yield put({
        type: 'saveDetails',
        payload: result,
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

    saveDetails(state, { payload }) {
      return {
        ...state,
        details: payload,
      };
    },
  },
}