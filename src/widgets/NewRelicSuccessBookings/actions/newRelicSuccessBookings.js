import 'whatwg-fetch';
import fetchApi from '../../../lib/fetchApi';
import onReceive from '../../Number/actions/number';

const refresh = () => dispatch => {
  fetchApi('newRelic/successBookings').then(json => dispatch(onReceive('newRelicSuccessBookings', json.data.current)));
};

export default refresh;
