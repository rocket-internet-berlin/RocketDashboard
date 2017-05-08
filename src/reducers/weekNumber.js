import Sugar from 'sugar/number';

const defaultState = {
  aNumber: 0,
};

const weekNumber = (state = defaultState, action) => {
  switch (action.type) {
    case 'REFRESH_ALL':
    default:  // triggered when a page is reloaded
      return {
        ...state,
        aNumber: Sugar.Number.random(1, 52),
      };
  }
};

export default weekNumber;
