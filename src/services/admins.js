import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export const queryAdmins = async params => {
  return request(`${pathConfig.Admins}?${stringify(params)}`);
}

export async function createAdmins(params) {
  return request(`${pathConfig.Admins}`, {
    method: 'POST',
    body: params,
  });
}

export async function updateAdmins(params) {
  const { id } = params;
  return request(`${pathConfig.Admins}/${id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function updateAdminPassword(params) {
  const { id } = params;
  return request(`${pathConfig.AdminPassword}/${id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function deleteAdmins(id) {
  return request(`${pathConfig.Admins}/${id}`, {
    method: 'DELETE',
  });
}