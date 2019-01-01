import { queryBanners, createBanner, updateBanner, deleteBanner } from "@/services/banner";
import { requestDataToPageResult } from "@/utils/utils";
import { message } from "antd";
import { queryFinancialsSalary, passFinancialsSalary, refuseFinancialsSalary } from "@/services/financials";

export default {
  namespace: 'salaries',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(queryFinancialsSalary, payload);
      yield put({
        type: 'save',
        payload: requestDataToPageResult(resp),
      });
    },

    *pass({ payload }, { call, put }) {
      const resp = yield call(passFinancialsSalary, payload);

      if (resp.id) {
        yield put({
          type: 'fetch',
          payload: {
            page: 1,
            pageSize: 15,
          },
        });
      }
    },

    *refuse({ payload }, { call, put }) {
      const resp = yield call(refuseFinancialsSalary, payload);

      if (resp.id) {
        yield put({
          type: 'fetch',
          payload: {
            page: 1,
            pageSize: 15,
          },
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
}