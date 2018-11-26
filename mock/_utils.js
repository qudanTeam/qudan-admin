import { parse } from 'url';


/**
 * delay function
 * @param {number} time ms 毫秒
 */
export const delay = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export function genList(req, res, u, dataSource = []) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  // let dataSource = userListDataSource || [];
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