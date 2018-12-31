
import request from '@/utils/request';
import pathConfig from './pathConfig';

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