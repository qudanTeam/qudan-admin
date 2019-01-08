import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export const queryOrder = async params => {
  return request(`${pathConfig.Orders}?${stringify(params)}`);
}

export const passOne = async (params) => {
  const {id, ...rest } = params;
  return request(`${pathConfig.Orders}/${id}/pass`, {
    method: 'PUT',
    body: rest,
  });
}

export const refuseOne = async id => {
  return request(`${pathConfig.Orders}/${id}/refuse`, {
    method: 'PUT',
  });
}

export async function queryDetails(id) {
  return request(`${pathConfig.Orders}/${id}`);
}