import 'whatwg-fetch';
import fetchApi from '../../../lib/fetchApi';
import onReceive from '../../Number/actions/number';

const refresh = () => dispatch => {
  fetchApi('newRelic/errors').then(json => dispatch(onReceive('newRelicErrors', json.data)));
};

export default refresh;
