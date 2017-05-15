const defaultState = {
  history: [],
};

const bugsHistory = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVE_BUGSHISTORY':
      return {
        ...state,
        history: action.history,
      };
    default:
      // triggered when a page is reloaded
      return {
        ...state,
      };
  }
};

export default bugsHistory;
