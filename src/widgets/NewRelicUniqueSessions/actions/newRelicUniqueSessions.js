import 'whatwg-fetch';
import _round from 'lodash/round';
import fetchApi from '../../../lib/fetchApi';
import onReceive from '../../Number/actions/number';

const refresh = () => dispatch => {
  fetchApi('newRelic/loadTime').then(json => dispatch(onReceive('newRelicUniqueSessions', json.data.current)));
};

export default refresh;
