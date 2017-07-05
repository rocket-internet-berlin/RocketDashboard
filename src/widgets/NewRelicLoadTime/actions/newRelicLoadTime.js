import 'whatwg-fetch';
import _round from 'lodash/round';
import fetchApi from '../../../lib/fetchApi';
import onReceive from '../../Number/actions/number';

const refreshNewRelicLoadTime = () => dispatch => {
  fetchApi('newRelic/loadTime').then(json => dispatch(onReceive('newRelicLoadTime', _round(json.data.current, 2))));
};

export default refreshNewRelicLoadTime;
