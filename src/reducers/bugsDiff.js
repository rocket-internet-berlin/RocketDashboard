import Sugar from 'sugar/number';

const defaultState = {
  lastWeek: 0,
  thisWeek: 0,
};

const bugsDiff = (state = defaultState, action) => {
  switch (action.type) {
    case 'REFRESH_ALL':
    default:
      // triggered when a page is reloaded
      return {
        ...state,
        lastWeek: Sugar.Number.random(0, 20),
        thisWeek: Sugar.Number.random(0, 20),
      };
  }
};

export default bugsDiff;
