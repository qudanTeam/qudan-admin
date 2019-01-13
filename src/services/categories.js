import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export const queryCategories = async params => {
  return request(`${pathConfig.Categories}?${stringify(params)}`);
}

export async function createCategory(params) {
  return request(`${pathConfig.Categories}`, {
    method: 'POST',
    body: params,
  });
}

export async function updateCategory(params) {
  const { id } = params;
  return request(`${pathConfig.Categories}/${id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function deleteCategory(id) {
  // const { id } = params;
  return request(`${pathConfig.Categories}/${id}`, {
    method: 'DELETE',
  });
}
