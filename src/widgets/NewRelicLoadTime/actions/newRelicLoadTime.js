import 'whatwg-fetch';
import fetchApi from '../../../lib/fetchApi';
import onReceive from '../../Number/actions/number';

const refresh = () => dispatch => {
  fetchApi('newRelic/loadTime').then(json => dispatch(onReceive('newRelicLoadTime', json.data)));
};

export default refresh;
