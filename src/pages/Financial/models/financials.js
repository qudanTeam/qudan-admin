import { queryBanners, createBanner, updateBanner, deleteBanner } from "@/services/banner";
import { requestDataToPageResult } from "@/utils/utils";
import { message } from "antd";
import { queryFinancials, queryFinancialsMonthReport } from "@/services/financials";

export default {
  namespace: 'financials',

  state: {
    financials: {
      list: [],
      pagination: {},
    },

    month_report: {
      list: [],
      pagination: {},
    },

    financials_details: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(queryFinancials, payload);
      yield put({
        type: 'saveFinancials',
        payload: requestDataToPageResult(resp),
      });
    },

    *fetchMonthReport({ payload }, { call, put }) {

      const resp = yield call(queryFinancialsMonthReport, payload);
      yield put({
        type: 'saveFinancialsMonthReport',
        payload: requestDataToPageResult(resp),
      });

    },
  },

  reducers: {
    saveFinancials(state, action) {
      return {
        ...state,
        financials: action.payload,
      };
    },
    
    saveFinancialsMonthReport(state, action) {
      return {
        ...state,
        month_report: action.payload,
      };
    },
  }
}