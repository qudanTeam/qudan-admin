import mockjs from 'mockjs';

const idCardRegexp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
const mobileRegexp = /^1[23456789]\d{9}$/
const rateRegexp = /^\d{1}\.\d{4}/
const priceRegexp = /^\d{2}\.\d{2}/

const Random = mockjs.Random;

let userListDataSource = [];
let vipsDataSource = [];

userListDataSource = mockjs.mock({
  'list|20-100': [
    {
      'id|+1': 1,
      'avatar': () => mockjs.Random.image('100x100'),
      'userNum|+1': 100000000,
      'mobile': mobileRegexp,
      'wechat': '@FIRST',
      'balance|15-2000': 15,
      'userType|0-4': 1,
      'realName': '@CNAME',
      'idCardNO': /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      'alipayAccount': mobileRegexp,
      'vipLevel|1-4': 1,
      'proposer': '@id',
      'registerTime': '@NOW',
      'lastLoginTime': '@NOW',
    }
  ]
}).list || [];

vipsDataSource = mockjs.mock({
  'list|20-100': [
    {
      'id': '@ID',
      'name': '@FIRST',
      'addition_rate': /^0\.\d{4}/,
      'price': priceRegexp,
      'promotion_price': priceRegexp,
      'start_time': () => Random.datetime(),
      'end_time': () => Random.datetime(),
      'vip_image': () => Random.image('100x100'),
    }
  ]
}).list || [];

export {
  userListDataSource,
  vipsDataSource,
}

// for (let i = 0; i < 46; i += 1) {
//   userListDataSource.push({
//     id: i,
//     avatar: [
//       'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
//       'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
//     ][i % 2],
//     userNum: 
//     key: i,
//     disabled: i % 6 === 0,
//     href: 'https://ant.design',
    
//     name: `TradeCode ${i}`,
//     title: `一个任务名称 ${i}`,
//     owner: '曲丽丽',
//     desc: '这是一段描述',
//     callNo: Math.floor(Math.random() * 1000),
//     status: Math.floor(Math.random() * 10) % 4,
//     updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
//     createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
//     progress: Math.ceil(Math.random() * 100),
//   });
// }