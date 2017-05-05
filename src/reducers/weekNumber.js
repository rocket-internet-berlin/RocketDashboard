import Sugar from 'sugar/number';

const defaultState = {
  number: 0,
};

const weekNumber = (state = defaultState, action) => {
  switch (action.type) {
    default:  // triggered when a page is reloaded
      return { ...state,
        number: Sugar.Number.random(1, 52) };
  }
};

export default weekNumber;
