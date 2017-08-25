import { createAction } from 'redux-actions';
import WidgetStore from '../../containers/WidgetList/stores/WidgetStore';

export const onReceive = createAction('RECEIVE_DATA', (key, data) => ({
  key,
  ...data,
}));

export const refresh = ({ key, fetchFunction }) => dispatch => {
  const widget = WidgetStore.getWidget(key);

  if (widget && !widget.display) {
    return;
  }

  fetchFunction().then(json => dispatch(onReceive(key, json.data)));
};
