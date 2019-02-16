
import { requestDataToPageResult } from '@/utils/utils';
import { message } from 'antd';
import { queryApply, queryApplyTrades, putShipPos, putSigningPos } from '@/services/apply';

export default {
  namespace: 'applys',

  state: {
    data: {
      list: [],
      pagination: {},
    },

    profile: {
      productType: 0,
      list: [],
      pagination: {},
    }

  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryApply, payload);
      const data = response;
      yield put({
        type: 'save',
        payload: requestDataToPageResult(data),
      });
    },

    *fetchProfile({ payload }, { call, put }) {
      // const { isPos } = payload;
      const response = yield call(queryApplyTrades, payload);
      const data = response;
      const { productType } = data;
      yield put({
        type: 'saveProfile',
        payload: {
          productType,
          productID: payload.id,
          ...requestDataToPageResult(data)
        },
      });
    },

    *shipPos({ payload }, { call, put, select }) {
      const { productID } = yield select(_ => _.applys.profile);
      const response = yield call(putShipPos, payload);

      if (response.id) {
        yield put({
          type: 'fetchProfile',
          payload: {
            id: productID,
            page: 1,
            pageSize: 15,
            isPos: true,
          },
        });
      };
    },

    *signingPos({ payload }, { call, put, select }) {
      const { productID } = yield select(_ => _.applys.profile);
      const response = yield call(putSigningPos, payload);

      if (response.id) {
        yield put({
          type: 'fetchProfile',
          payload: {
            id: productID,
            page: 1,
            pageSize: 15,
            isPos: true,
          },
        });
      };
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

    saveProfile(state, action) {
      return {
        ...state,
        profile: action.payload,
      };
    },
  }
}