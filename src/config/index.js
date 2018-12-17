import path from 'path';
import production from './production';
import development from './development';
import defaultConfig from './default';

let nodeENV = null;
try {
  nodeENV = process.env.NODE_ENV || process.env.CONFIG_ENV;
} catch (err) {
  nodeENV = null;
}


const conf = {
  srcRoot: path.resolve(__dirname, 'src/'),
  ...defaultConfig,
  ...development,
  ...(nodeENV !== 'development' && production),
};

export default conf;