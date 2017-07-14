import 'whatwg-fetch';
import fetchApi from '../../../lib/fetchApi';
import onReceive from '../../Number/actions/number';

const refresh = () => dispatch => {
  fetchApi('newRelic/cliErrors').then(json => dispatch(onReceive('newRelicCliErrors', json.data)));
};

export default refresh;
