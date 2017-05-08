import Sugar from 'sugar/number';

const defaultState = {
  week: 0,
};

const weekNumber = (state = defaultState, action) => {
  switch (action.type) {
    case 'REFRESH_ALL':
    default:
      // triggered when a page is reloaded
      return {
        ...state,
        week: Sugar.Number.random(1, 52),
      };
  }
};

export default weekNumber;
