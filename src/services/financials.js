import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export function queryFinancials(params) {
  return request(`${pathConfig.Financials}?${stringify(params)}`);
}

export function queryFinancialsMonthReport(params) {
  return request(`${pathConfig.Financials}/monthReport?${stringify(params)}`);
}

export function queryFinancialsSalary(params) {
  return request(`${pathConfig.Financials}/salaryList?${stringify(params)}`);
}

export function passFinancialsSalary(params) {
  const { id } = params;
  return request(`${pathConfig.Financials}/${id}/passOneSalary`, {
    method: 'PUT',
  });
}

export function refuseFinancialsSalary(params) {
  const { id, msg } = params;
  return request(`${pathConfig.Financials}/${id}/refuseOneSalary`, {
    method: 'PUT',
    body: {
      msg,
    }
  });
}