import 'whatwg-fetch';
import fetchApi from '../../../lib/fetchApi';
import onReceive from '../../Number/actions/number';

const refresh = () => dispatch => {
  fetchApi('newRelic/successfulBookings').then(json =>
    dispatch(onReceive('newRelicSuccessfulBookings', json.data.current, json.data.previous)),
  );
};

export default refresh;