
export function findUserType(record) {
  const { user_type } = record;
  const utype = +user_type;
  if (utype >= 3) {
    if (+record.status === 3) {
      return 4; // 实名认证
    }

    if (+record.finance_status === 3) {
      return 5; // 财务认证
    }
  }

  return utype;
}

export function isRealnameAuth(record) {
  // const utype = findUserType(record);

  if (+record.status === 3) {
    return true;
  }

  return false;
}

export function isFinanceAuth(record) {
  // const utype = findUserType(record);

  if (+record.finance_status === 3) {
    return true;
  }

  return false;
  
}