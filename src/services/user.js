
import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export function passRealnameAuth(id) {
  return request(`${pathConfig.Users}/${id}/passRealnameAuth`, {
    method: 'PUT',
  });
}

export function refuseRealnameAuth(id) {
  return request(`${pathConfig.Users}/${id}/refuseRealnameAuth`, {
    method: 'PUT',
  });
}

export function updateUser(params) {
  const { id } = params;
  return request(`${pathConfig.Users}/${id}`, {
    method: 'PUT',
    body: params,
  });
}

export function deposit(params) {
  const { id, ...rest } = params;
  return request(`${pathConfig.Users}/${id}/deposit`, {
    method: 'PUT',
    body: rest,
  });
}

export function passFinanceAuth(id) {
  return request(`${pathConfig.Users}/${id}/passFinanceAuth`, {
    method: 'PUT',
  });
}

export function refuseFinanceAuth(id) {
  return request(`${pathConfig.Users}/${id}/refuseFinanceAuth`, {
    method: 'PUT',
  });
}
export function queryChildUsers(params) {
  const {
    pid: id,
    ...rest
  } = params;
  return request(`${pathConfig.Users}/${id}/childs?${stringify(rest)}`);
}