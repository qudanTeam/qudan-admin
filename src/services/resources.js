import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export const queryResources = async params => {
  return request(`${pathConfig.ShareManager}?${stringify(params)}`);
}

export async function createResources(params) {
  return request(`${pathConfig.ShareManager}`, {
    method: 'POST',
    body: params,
  });
}

export async function updateResources(params) {
  const { id } = params;
  return request(`${pathConfig.ShareManager}/${id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function deleteResources(id) {
  return request(`${pathConfig.ShareManager}/${id}`, {
    method: 'DELETE',
  });
}