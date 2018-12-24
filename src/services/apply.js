import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export async function queryApply(params) {
  return request(`${pathConfig.Apply}?${stringify(params)}`);
}

export async function queryApplyTrades(params) {
  const { id, ...rest } = params;
  return request(`${pathConfig.Apply}/${id}/trades/?${stringify(rest)}`);
}