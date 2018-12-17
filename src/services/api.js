
import request from '@/utils/request';
import { stringify } from 'qs';
import pathConfig from './pathConfig';

/**
 * POST Account Login
 */
export const fakeAccountLogin = async (params) => {
  return request('/apis/login', {
    method: 'POST',
    body: params,
  });
}

export async function queryUsers(params = {}) {
  return request(`${pathConfig.QueryUserList}?${stringify(params)}`);
}

export async function queryUserProfile(id) {
  return request(`/apis/users/${id}`);
}

export async function queryUserVipProfile(id) {
  return request(`/apis/users/${id}/vipInfo`);
}

export async function queryVips(params) {
  return request(`/api/vips?${stringify(params)}`)
}

export async function queryVipDetails(id) {
  return request(`${pathConfig.QueryVipConfigs}/${id}`)
}