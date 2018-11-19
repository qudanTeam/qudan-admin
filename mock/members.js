import { delay } from './_utils';
import { parse } from 'url';
import { userListDataSource } from './datastore';

export default {
  'GET /api/users/:id': (req, res) => {
    const foundUser = userListDataSource.find((val) => {
      return (String(val.id) === String(req.params.id));
    })

    delay(1000).then(() => {
      res.json({
        status: 'ok',
        result: foundUser,
      });
    })
    
  },

  'GET /api/users/:id/vip': (req, res) => {
    res.json({
      status: 'ok',
      result: {
        'vipType': 'vip1',
        'orderTime': '2018年1月1日',
        'endTime': '2018年13月31号',
        'paidAmount': '200',
        'orderNO': '200000000123',
        'addition': '200',
        'additionTotal': '2000',
      },
    });
    
  },

  'GET /api/users': (req, res, u) => {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
    const params = parse(url, true).query;
    let dataSource = userListDataSource || [];
    delay(1000).then(() => {
      let page = 1;
      let pageSize = 10;
      if (params.pageSize) {
        pageSize = params.pageSize;
      }

      if (params.page) {
        page = params.page;
      }
      const skip = (page - 1) * pageSize;
      
      res.json({
        status: 'ok',
        result: {
          list: dataSource.slice(skip, parseInt(skip, 10) + parseInt(pageSize, 10)),
          pagination: {
            total: dataSource.length,
            pageSize,
            current: parseInt(params.page, 10) || 1,
          },
        },
      });
    })
  }
}