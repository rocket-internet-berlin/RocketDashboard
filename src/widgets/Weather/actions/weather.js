import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import { fetchApi } from '../../../lib/fetchApi';
import WidgetStore from '../../../containers/WidgetList/stores/WidgetStore';

export const onReceive = createAction('RECEIVE_WEATHER', json => json);

export const refresh = () => dispatch => {
  const widget = WidgetStore.getWidget('weather');

  if (widget && !widget.display) {
    return;
  }

  fetchApi('weather/current').then(json => dispatch(onReceive(json)));
};
