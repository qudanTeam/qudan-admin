import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export const queryBanners = async params => {
  return request(`${pathConfig.QueryBanners}?${stringify(params)}`);
}

export async function createBanner(params) {
  return request(`${pathConfig.QueryBanners}`, {
    method: 'POST',
    body: params,
  });
}

export async function updateBanner(params) {
  const { id } = params;
  return request(`${pathConfig.QueryBanners}/${id}`, {
    method: 'PUT',
    body: params,
  });
}

export async function deleteBanner(id) {
  return request(`${pathConfig.QueryBanners}/${id}`, {
    method: 'DELETE',
  });
}