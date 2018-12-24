import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export const queryCustomer = async params => {
  return request(`${pathConfig.Advistors}?${stringify(params)}`);
}

export const createCustomer = async params => {
  return request(`${pathConfig.Advistors}`, {
    method: 'POST',
    body: params,
  });
}