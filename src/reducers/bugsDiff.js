const defaultState = {
  lastWeek: 0,
  thisWeek: 0,
};

const bugsDiff = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVE_BUGSDIFF':
      return {
        ...state,
        lastWeek: action.lastWeek,
        thisWeek: action.thisWeek,
      };
    default:
      // triggered when a page is reloaded
      return {
        ...state,
      };
  }
};

export default bugsDiff;
