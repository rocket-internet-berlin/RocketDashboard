import { createAction } from 'redux-actions';
import WidgetStore from '../stores/WidgetStore';

export const onHover = createAction('HOVER', data => ({
  data,
}));

export const onMove = createAction('MOVE', data => ({
  data,
}));

export const hover = props => dispatch => {
  WidgetStore.hover(props.sourceId, props.targetId).then(data => dispatch(onHover(data.widgetList)));
};

export const move = props => dispatch => {
  WidgetStore.move(props.sourceId, props.targetId).then(data => dispatch(onMove(data.widgetList)));
};
