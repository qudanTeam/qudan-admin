
import { requestDataToPageResult } from '@/utils/utils';
import { message } from 'antd';
import { queryOrder, passOne, refuseOne, queryDetails, updateOrder } from '@/services/orders';

export default {
  namespace: 'orders',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    profile: {}

  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryOrder, payload);
      const data = response;
      yield put({
        type: 'save',
        payload: requestDataToPageResult(data),
      });
    },

    *fetchProfile({ payload }, { call, put }) {
      const result = yield call(queryDetails, payload.id);

      yield put({
        type: 'saveProfile',
        payload: result.order,
      });
    },

    *passOne({ payload }, { call, put }) {
      const response = yield call(passOne, payload);

      if (response.id) {
        yield put({
          type: 'fetch',
        });
      }
    },
    
    *refuseOne({ payload }, { call, put }) {
      const response = yield call(refuseOne, payload.id);

      if (response.id) {
        yield put({
          type: 'fetch',
        });
      }
    },

    *update({ payload }, { call, put }) {
      const response = yield call(updateOrder, payload);


      if (response.id) {
        yield put({
          type: 'fetch',
        });
      }
    }
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
  }
}