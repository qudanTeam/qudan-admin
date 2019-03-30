import { queryCustomer, createCustomer, updateCustomer, deleteCustomer } from '@/services/customer';
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

    *create({ payload }, { call, put, select }) {
      const response = yield call(createCustomer, payload);
      const { pagination } = yield select(_ => _.advistors.data);

      const { id } = response;
      if (id) {
        message.success('创建成功');
        yield put({
          type: 'fetch',
          payload: {
            page: pagination.current || 1,
            pageSize: pagination.pageSize || 15,
          },
        });
      }
    },

    *delete({ payload }, { call, put, select }) {
      const resp = yield call(deleteCustomer, payload.id);
      const { pagination } = yield select(_ => _.advistors.data);

      if (resp) {
        message.success('删除成功');

        yield put({
          type: 'fetch',
          payload: {
            page: pagination.current || 1,
            pageSize: pagination.pageSize || 15,
          },
        });
      }
    },

    *update({ payload }, { call, put, select }) {
      const response = yield call(updateCustomer, payload);
      const { pagination } = yield select(_ => _.advistors.data);

      const { id } = response;
      if (id) {
        message.success('修改成功');
        yield put({
          type: 'fetch',
          payload: {
            page: pagination.current || 1,
            pageSize: pagination.pageSize || 15,
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