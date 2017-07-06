import 'whatwg-fetch';
import fetchApi from '../../../lib/fetchApi';
import onReceive from '../../Number/actions/number';

const refresh = () => dispatch => {
  fetchApi('newRelic/uniqueSessions').then(json => dispatch(onReceive('newRelicUniqueSessions', json.data.current)));
};

export default refresh;
