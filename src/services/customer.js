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

export const updateCustomer = async params => {
  const { id, ...restParams } = params;
  return request(`${pathConfig.Advistors}/${id}`, {
    method: 'PUT',
    body: restParams,
  });
}

export const deleteCustomer = async id => {
  return request(`${pathConfig.Advistors}/${id}`, {
    method: 'DELETE',
  });
}