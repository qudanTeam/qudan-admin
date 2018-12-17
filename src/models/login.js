import { reloadAuthorized, reloadAccessToken } from '@/utils/Authorized';
import { fakeAccountLogin } from '@/services/api';
import { routerRedux } from 'dva/router';
import { getPageQuery } from '@/utils/utils';
import { setAuthority, setAccessToken } from '@/utils/authority';
import { stringify } from 'qs';
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      const { ok, message: msg, token } = response;
      // console.log(response, 'response');
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: ok ? 'ok' : 'notok',
          currentAuthority: 'admin',
          token,
        },
      });

      if (ok) {
        reloadAccessToken();
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        message.error(msg);
      }
    },

    *logout({ payload }, { call, put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
          token: null,
        },
      });
      reloadAccessToken();
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      )
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      setAccessToken(payload.token);
      return {
        ...state,
        status: payload.status,
        type: 'account',
        token: payload.token,
      };
    },
  },
}