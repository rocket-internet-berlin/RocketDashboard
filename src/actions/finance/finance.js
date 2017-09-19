import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import { fetchApi } from '../../lib/fetchApi';
import WidgetStore from '../../containers/WidgetList/stores/WidgetStore';

export const onReceive = createAction('RECEIVE_FINANCE', json => json);

export const refresh = () => dispatch => {
  const widget = WidgetStore.getWidget('finance');

  if (widget && !widget.display) {
    return;
  }

  fetchApi('finance/stock').then(json => dispatch(onReceive(json)));
};
