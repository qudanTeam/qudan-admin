import { queryCustomer, createCustomer } from '@/services/customer';
import { requestDataToPageResult } from '@/utils/utils';
import { message } from 'antd';

export default {
  namespace: 'advistors',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCustomer, payload);
      const data = response;
      yield put({
        type: 'save',
        payload: requestDataToPageResult(data),
      });
    },

    *create({ payload }, { call, put }) {
      const response = yield call(createCustomer, payload);

      const { id } = response;
      if (id) {
        message.success('创建成功');
        yield put({
          type: 'fetch',
          payload: {
            page: 1,
            pageSize: 15,
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
  }
}