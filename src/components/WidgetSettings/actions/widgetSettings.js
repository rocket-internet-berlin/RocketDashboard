import { createAction } from 'redux-actions';
import WidgetStore from '../../../containers/WidgetList/stores/WidgetStore';

export const showModal = createAction('SHOW_MODAL');

export const closeModal = createAction('CLOSE_MODAL');

export const onSave = createAction('SAVE_SETTINGS');

export const toggleDisplay = props => dispatch => {
  WidgetStore.toggleDisplay(props.id).then(data => dispatch(onSave(data.widgetList)));
};

export const showWidget = props => dispatch => {
  WidgetStore.showWidget(props.id).then(data => dispatch(onSave(data.widgetList)));
};

export const hideWidget = props => dispatch => {
  WidgetStore.hideWidget(props.id).then(data => dispatch(onSave(data.widgetList)));
};
