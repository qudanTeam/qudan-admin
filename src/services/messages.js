import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export const queryMessages = async params => {
  return request(`${pathConfig.Messages}?${stringify(params)}`);
}

export async function createMessage(params) {
  return request(`${pathConfig.Messages}`, {
    method: 'POST',
    body: params,
  });
}

export async function updateMessage(params) {
  const { id, ...rest } = params;
  return request(`${pathConfig.Messages}/${id}`, {
    method: 'PUT',
    body: rest,
  });
}

export async function deleteMessage(id) {
  return request(`${pathConfig.Messages}/${id}`, {
    method: 'DELETE',
  });
}

export async function pushMessage(id) {
  return request(`${pathConfig.MessagePush}/${id}`, {
    method: 'POST',
  });
}