const defaultState = {
  week: 0,
};

const weekNumber = (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVE_WEEKNUMBER':
      return {
        ...state,
        week: action.week,
      };
    default:
      // triggered when a page is reloaded
      return {
        ...state,
      };
  }
};

export default weekNumber;
