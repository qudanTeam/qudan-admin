import RenderAuthorized from '@/components/Authorized';
import { getAuthority, getAccessToken } from './authority';

let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line

let AccessToken = getAccessToken();

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority());
};

const reloadAccessToken = () => {
  AccessToken = getAccessToken();
}

export { reloadAuthorized, reloadAccessToken, AccessToken };
export default Authorized;
