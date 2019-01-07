import request from '@/utils/request';
import pathConfig from './pathConfig';
import { stringify } from 'qs';

export function queryFinancials(params) {
  return request(`${pathConfig.Financials}?${stringify(params)}`);
}

export function queryFinancialsMonthReport(params) {
  return request(`${pathConfig.Financials}/monthReport?${stringify(params)}`);
}

export function queryWithdraws(params) {
  return request(`${pathConfig.Financials}/withdraw?${stringify(params)}`);
}

export function passFinancialsWithdraw(params) {
  const { id } = params;
  return request(`${pathConfig.Financials}/${id}/passOneWithdraw`, {
    method: 'PUT',
  });
}

export function finishedFinancialsWithdraw(params) {
  const { id } = params;
  return request(`${pathConfig.Financials}/${id}/finishedWithdraw`, {
    method: 'PUT',
  });
}

export function refuseFinancialsWithdraw(params) {
  const { id, msg } = params;
  return request(`${pathConfig.Financials}/${id}/refuseOneWithdraw`, {
    method: 'PUT',
    body: {
      msg,
    }
  });
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