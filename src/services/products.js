import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export const queryProducts = async params => {
  return request(`${pathConfig.Products}?${stringify(params)}`);
}