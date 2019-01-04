export default {
  host: 'localhost:1223',

  uploadPath: '/apis/upload',

  UserType: ['默认身份', 'vip', '代理', '混合身份', '实名认证', '财务认证', '内部账户'],
  // UserType: ['vip', '代理', '实名认证', '财务认证', '内部账户'],
  AgentLevel: ['未知', '初级', '中级', '高级'],
  RewardStatus: ['未知', '未发放', '已发放'],
  TradeExecState: ['未知', '待审核', '已审核', '已拒绝'],
  BannerPositionTxt: ['首页', '列表'],
  OrderStatus: ['查询中', '审核中', '已通过', '已拒绝'],
  ProductType: ['未知', '信用卡', '贷款'],
  ApplyStatus: ['资料填写中', '审核中', '审核已通过', '审核未通过'],
  ApplyOfficalStatus: ['申请仍在处理中', '申请已通过，后续请留意查收卡片', '申请未成功'],
  ProductBGCategory: ['未知', '秒到账','大额度', '秒办卡'],
  TradeType: ['未知', '提现','任务佣金','团队佣金','VIP购买','阶梯工资'],
  RateRegex: /^(\d{1,3})((?:\.\d+)?)$/,
  VipLevel: ['--', 'VIP1', 'VIP2', 'VIP3'],


  colors: {
    
    success: '#87d068',
    active: '#2db7f5',
    finished: '108ee9',
    failed: '#f50',
  }
}
