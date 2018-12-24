import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export const queryProductConfigs = async params => {
  return request(`${pathConfig.ProductConfig}?${stringify(params)}`);
}

export async function createProductConfigs(params) {
  return request(`${pathConfig.ProductConfig}`, {
    method: 'POST',
    body: params,
  });
}

export async function updateProductConfigs(params) {
  const { id } = params;
  return request(`${pathConfig.ProductConfig}/${id}`, {
    method: 'PUT',
    body: params,
  });
}
