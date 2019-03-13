
import { requestDataToPageResult } from '@/utils/utils';
import { message } from 'antd';
import { queryOrder, passOne, refuseOne, queryDetails, updateOrder, returnDeposit } from '@/services/orders';

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

    *passOne({ payload }, { call, put, select }) {
      const response = yield call(passOne, payload);

      const { pagination } = yield select(_ => _.orders.data);

      if (response.id) {
        yield put({
          type: 'fetch',
          payload: {
            page: pagination.current,
            pageSize: pagination.pageSize,
          },
        });
      }
    },

    *returnDeposit({ payload }, { call, put, select }) {
      const response = yield call(returnDeposit, payload);
      const { pagination } = yield select(_ => _.orders.data);
      if (response.id) {
        yield put({
          type: 'fetch',
          payload: {
            page: pagination.current,
            pageSize: pagination.pageSize,
          },
        });
      }
    },
    
    *refuseOne({ payload }, { call, put, select }) {
      const response = yield call(refuseOne, payload);
      const { pagination } = yield select(_ => _.orders.data);
      if (response.id) {
        yield put({
          type: 'fetch',
          payload: {
            page: pagination.current,
            pageSize: pagination.pageSize,
          },
        });
      }
    },

    *update({ payload }, { call, put, select }) {
      const response = yield call(updateOrder, payload);

      const { pagination } = yield select(_ => _.orders.data);
      if (response.id) {
        yield put({
          type: 'fetch',
          payload: {
            page: pagination.current,
            pageSize: pagination.pageSize,
          },
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