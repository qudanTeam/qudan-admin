
import { 
  queryUsers,
  queryUserProfile,
  queryUserVipProfile,
 } from '@/services/api';
import { requestDataToPageResult } from '@/utils/utils';
import { passRealnameAuth, refuseRealnameAuth, refuseFinanceAuth, passFinanceAuth, queryChildUsers, updateUser, deposit } from '@/services/user';



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
    },

    childs: {
      list: [],
      pagination: {},
    },
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
      // console.log('fetch childs');
      // yield put({
      //   type: 'fetchChilds',
      //   payload: {
      //     pid: payload.id,
      //     page: 1,
      //     pageSize: 15,
      //   },
      // });

      yield put({
        type: 'saveProfile',
        payload: {
          basicInfo: result,
          vipInfo,
        },
      });
    },

    *fetchChilds({ payload }, { call, put }) {
      const resp = yield call(queryChildUsers, payload);
      yield put({
        type: 'saveChilds',
        payload: requestDataToPageResult(resp),
      });
    },

    *update({ payload }, { call, put, select }) {
      const { data: { pagination } = { pagination: { current: 1, pageSize: 15 }} } = yield select(_ => _.users);

      const result = yield  call(updateUser, payload);

      if (result) {
        yield put({
          type: 'fetch',
          payload: {
            page: pagination.current,
            pageSize: pagination.pageSize,
          },
        });
      }

      
    },

    *passRealnameAuth({ payload }, { call, put, select }) {
      const result = yield call(passRealnameAuth, payload.id);
      const { data: { pagination } = { pagination: { current: 1, pageSize: 15 }} } = yield select(_ => _.users);

      if (result.id) {
        yield put({
          type: 'fetch',
          payload: {
            page: pagination.current,
            pageSize: pagination.pageSize,
          },
        });
      }
    },

    *refuseRealnameAuth({ payload }, { call, put, select }) {
      const result = yield call(refuseRealnameAuth, payload.id);
      const { data: { pagination } = { pagination: { current: 1, pageSize: 15 }} } = yield select(_ => _.users);

      if (result.id) {
        yield put({
          type: 'fetch',
          payload: {
            page: pagination.current,
            pageSize: pagination.pageSize,
          },
        });
      }
    },

    *refuseFinanceAuth({ payload }, { call, put, select }) {
      const result = yield call(refuseFinanceAuth, payload.id);
      const { data: { pagination } = { pagination: { current: 1, pageSize: 15 }} } = yield select(_ => _.users);

      if (result.id) {
        yield put({
          type: 'fetch',
          payload: {
            page: pagination.current,
            pageSize: pagination.pageSize,
          },
        });
      }
    },

    *passFinanceAuth({ payload }, { call, put, select }) {
      const result = yield call(passFinanceAuth, payload.id);
      const { data: { pagination } = { pagination: { current: 1, pageSize: 15 }} } = yield select(_ => _.users);

      if (result.id) {
        yield put({
          type: 'fetch',
          payload: {
            page: pagination.current,
            pageSize: pagination.pageSize,
          },
        });
      }
    },

    *deposit({ payload }, { call, put, select }) {
      const result = yield call(deposit, payload);
      const { data: { pagination } = { pagination: { current: 1, pageSize: 15 }} } = yield select(_ => _.users);
      if (result.id) {
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

    saveChilds(state, { payload }) {
      return {
        ...state,
        childs: payload,
      };
    },
  },
}