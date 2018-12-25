import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export const queryProducts = async params => {
  return request(`${pathConfig.Products}?${stringify(params)}`);
}

export async function createProduct(params) {
  return request(`${pathConfig.Products}`, {
    method: 'POST',
    body: params,
  });
}