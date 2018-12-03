
import { delay, genList } from './_utils';
import { agencyDataSource } from './datastore';

export default {
  'GET /api/agencies': (req, res, u) => {
    genList(req, res, u, agencyDataSource);
  },
}