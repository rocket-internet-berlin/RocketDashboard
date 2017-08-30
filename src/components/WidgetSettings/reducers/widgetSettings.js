import { handleActions } from 'redux-actions';
import { showModal, closeModal, onSave } from '../actions/widgetSettings';
import WidgetStore from '../../../containers/WidgetList/stores/WidgetStore';

const reducer = handleActions(
  {
    [showModal]: state => {
      const newState = Object.assign({}, state, { showModal: true });
      return newState;
    },
    [closeModal]: state => {
      const newState = Object.assign({}, state, { showModal: false });
      return newState;
    },
    [onSave]: (state, { payload }) => {
      const newState = Object.assign({}, state, { widgetList: payload });
      return newState;
    },
  },
  {
    showModal: false,
    widgetList: WidgetStore.getWidgetList(),
  },
);

export default reducer;
