
import request from '@/utils/request';
import { stringify } from 'qs';

/**
 * POST Account Login
 */
export const fakeAccountLogin = async (params) => {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}


export async function queryUsers(params) {
  return request(`/api/users?${stringify(params)}`);
}

export async function queryUserProfile(id) {
  return request(`/api/users/${id}`);
}

export async function queryUserVipProfile(id) {
  return request(`/api/users/${id}/vip`);
}

export async function queryVips(params) {
  return request(`/api/vips?${stringify(params)}`)
}

export async function queryVipDetails(id) {
  return request(`/api/vips/${id}`)
}