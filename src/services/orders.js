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

export const returnDeposit = async (params) => {
  const { id } = params;

  return request(`${pathConfig.Orders}/${id}/returnDeposit`, {
    method: 'PUT',
  });
}

export const refuseOne = async params => {
  const { id, ...rest } = params;
  return request(`${pathConfig.Orders}/${id}/refuse`, {
    method: 'PUT',
    body: rest,
  });
}

export async function queryDetails(id) {
  return request(`${pathConfig.Orders}/${id}`);
}

export async function updateOrder(params) {
  const { id, ...rest } = params;
  return request(`${pathConfig.Orders}/${id}`, {
    method: 'PUT',
    body: rest,
  });
}