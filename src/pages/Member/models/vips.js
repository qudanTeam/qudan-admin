
import { 
  queryVips,
  queryVipDetails,
  // queryUserProfile,
  // queryUserVipProfile,
 } from '@/services/api';
import { queryVipConfigs, addVipConfig, updateVipConfig, deleteVipConfig } from '@/services/vip';
import { requestDataToPageResult } from '@/utils/utils';
import { message } from 'antd';


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

      const resp = yield call(queryVipConfigs, payload);

      // console.log(resp, 'resp ====');
      // const response = yield call(queryVips, payload);
      // const { status, result } = response;

      yield put({
        type: 'save',
        payload: requestDataToPageResult(resp),
      });
    },

    *fetchDetails({ payload }, { call, put }) {
      const response = yield call(queryVipDetails, payload.id);
      const { reply } = response;

      yield put({
        type: 'saveDetails',
        payload: reply,
      });
    },

    *create({ payload }, { call, put }) {
      const response = yield call(addVipConfig, payload);

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
    },

    *update({ payload }, { call, put }) {
      const response = yield call(updateVipConfig, payload);
      if (response.id) {
        message.success('修改成功');
        yield put({
          type: 'fetch',
          payload: {
            page: 1,
            pageSize: 15,
          },
        });
      }
    },

    *delete({ payload}, { call, put }) {
      const response = yield call(deleteVipConfig, payload.id);

      if (response) {
        message.success('删除成功');
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

    saveDetails(state, { payload }) {
      return {
        ...state,
        details: payload,
      };
    },
  },
}