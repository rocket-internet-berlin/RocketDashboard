import { handleActions } from 'redux-actions';
import { onMove, onHover } from '../actions/widgetList';
import widgetStore from '../stores/WidgetStore';

const reducer = handleActions(
  {
    [onHover]: (state, { payload }) => {
      const widgetList = Object.assign({}, ...state, payload.data);
      return { widgetList };
    },
    [onMove]: (state, { payload }) => {
      const widgetList = Object.assign({}, ...state, payload.data);
      return { widgetList };
    },
  },
  {
    widgetList: widgetStore.getWidgetList(),
  },
);

export default reducer;
