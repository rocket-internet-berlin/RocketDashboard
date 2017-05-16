const defaultState = {
  history: [],
  period: 'loading...',
};

const bugsHistory = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVE_BUGSHISTORY':
      return {
        ...state,
        history: action.history,
        period: action.period,
      };
    default:
      // triggered when a page is reloaded
      return {
        ...state,
      };
  }
};

export default bugsHistory;
