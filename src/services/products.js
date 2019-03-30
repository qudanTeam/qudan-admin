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

export async function queryProductDetails(id) {
  return request(`${pathConfig.Products}/${id}`);
}

export async function updateProduct(params) {
  const { id, ...rest } = params;
  return request(`${pathConfig.Products}/${id}`, {
    method: 'PUT',
    body: rest,
  });
}

export async function onShelf(id) {
  return request(`${pathConfig.Products}/shelf/${id}/on`, { method: "PUT" });
}

export async function disableShelf(id) {
  return request(`${pathConfig.Products}/shelf/${id}/disable`, { method: "PUT" });
}

export async function deleteProduct(id) {
  return request(`${pathConfig.Products}/${id}`, {
    method: 'DELETE',
  });
}