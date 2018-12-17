import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export const queryVipConfigs = async (params) => {
  return request(`${pathConfig.QueryVipConfigs}?${stringify(params)}`);
}

export const addVipConfig = async (params) => {
  return request(pathConfig.AddVipConfig, {
    method: "POST",
    body: params || {},
  });
}

export const updateVipConfig = async (params) => {
  return request(`${pathConfig.UpdateVipConfig}/${params.id}`, {
    method: 'PUT',
    body: params || {},
  });
}

export const deleteVipConfig = async (id) => {
  return request(`${pathConfig.UpdateVipConfig}/${id}`, {
    method: 'DELETE',
    body: {},
  });
}