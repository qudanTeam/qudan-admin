import { genList, delay } from './_utils';
import { vipsDataSource } from './datastore';

export default {
  'GET /api/vips': (req, res, u) => {
    console.log(vipsDataSource, 'pl');
    genList(req, res, u, vipsDataSource)
  },

  'GET /api/vips/:id': (req, res, u) => {
    const foundVipInfo = vipsDataSource.find((val) => {
      return (String(val.id) === String(req.params.id));
    });

    delay(1000).then(() => {
      res.json({
        status: 'ok',
        result: foundVipInfo,
      });
    });
    
  }
}