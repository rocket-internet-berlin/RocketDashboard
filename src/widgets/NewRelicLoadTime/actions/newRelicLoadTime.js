import 'whatwg-fetch';
import fetchApi from '../../../lib/fetchApi';
import onReceive from '../../Number/actions/number';

const refreshNewRelicLoadTime = () => dispatch => {
  fetchApi('newRelic/loadTime').then(json => dispatch(onReceive('newRelicLoadTime', json.data.current)));
};

export default refreshNewRelicLoadTime;
