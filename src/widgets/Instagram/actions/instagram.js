import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import { fetchApi } from '../../../lib/fetchApi';
import WidgetStore from '../../../containers/WidgetList/stores/WidgetStore';

export const onReceive = createAction('RECEIVE_INSTAGRAM', json => json);

export const refresh = () => dispatch => {
  const widget = WidgetStore.getWidget('instagram');

  if (widget && !widget.display) {
    return;
  }

  fetchApi('instagram/location').then(json => dispatch(onReceive(json)));
};
