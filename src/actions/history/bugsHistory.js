import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import { fetchApi } from '../../lib/fetchApi';
import WidgetStore from '../../containers/WidgetList/stores/WidgetStore';

export const onReceive = createAction('RECEIVE_BUGSHISTORY', json => json);

export const refresh = () => dispatch => {
  const widget = WidgetStore.getWidget('bugsHistory');

  if (widget && !widget.display) {
    return;
  }

  fetchApi('bugsHistory').then(json => dispatch(onReceive(json)));
};
