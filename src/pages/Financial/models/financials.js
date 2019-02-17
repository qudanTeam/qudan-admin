import { queryBanners, createBanner, updateBanner, deleteBanner } from "@/services/banner";
import { requestDataToPageResult } from "@/utils/utils";
import { message } from "antd";
import { queryFinancials, queryFinancialsMonthReport, queryWithdraws, passFinancialsWithdraw, refuseFinancialsWithdraw, finishedFinancialsWithdraw, queryPosApply } from "@/services/financials";

export default {
  namespace: 'financials',

  state: {
    financials: {
      list: [],
      pagination: {},
    },

    posApply: {
      list: [],
      pagination: {},
    },

    month_report: {
      list: [],
      pagination: {},
    },

    financials_details: {},

    withdraws: {
      list: [],
      pagination: {},
    },

  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(queryFinancials, payload);
      yield put({
        type: 'saveFinancials',
        payload: requestDataToPageResult(resp),
      });
    },

    *fetchPosApply({ payload }, { call, put }) {
      const resp = yield call(queryPosApply, payload);

      yield put({
        type: 'savePosApply',
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

    *fetchWithdraws({ payload }, { call, put }) {
      const resp = yield call(queryWithdraws, payload);
      yield put({
        type: 'saveWithdraws',
        payload: requestDataToPageResult(resp),
      });
    },

    *passWithdraw({ payload }, { call, put }) {
      const resp = yield call(passFinancialsWithdraw, payload);

      if (resp.id) {
        yield put({
          type: 'fetchWithdraws',
          payload: {
            page: 1,
            pageSize: 15,
          },
        });
      }
    },

    *finishedWithdraw({ payload }, { call, put }) {
      const resp = yield call(finishedFinancialsWithdraw, payload);

      if (resp.id) {
        yield put({
          type: 'fetchWithdraws',
          payload: {
            page: 1,
            pageSize: 15,
          },
        });
      }
    },

    *refuseWithdraw({ payload }, { call, put }) {
      const resp = yield call(refuseFinancialsWithdraw, payload);

      if (resp.id) {
        yield put({
          type: 'fetchWithdraws',
          payload: {
            page: 1,
            pageSize: 15,
          },
        });
      }
    },
  },

  reducers: {
    saveFinancials(state, action) {
      return {
        ...state,
        financials: action.payload,
      };
    },

    savePosApply(state, action) {
      return {
        ...state,
        posApply: action.payload,
      };
    },
    
    saveFinancialsMonthReport(state, action) {
      return {
        ...state,
        month_report: action.payload,
      };
    },

    saveWithdraws(state, action) {
      return {
        ...state,
        withdraws: action.payload,
      };
    }
  }
}