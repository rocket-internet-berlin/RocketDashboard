import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import { fetchApi } from '../../lib/fetchApi';
import WidgetStore from '../../containers/WidgetList/stores/WidgetStore';

export const onReceive = createAction('RECEIVE_STATUSCAKE_HISTORY', json => json);

export const refresh = () => dispatch => {
  const widget = WidgetStore.getWidget('statusCakeHistory');

  if (widget && !widget.display) {
    return;
  }

  fetchApi('statusCakeHistory').then(json => dispatch(onReceive(json)));
};
