import Sugar from 'sugar/number';

const defaultState = Sugar.Number.random(1, 52);

const weekNumber = (state = defaultState, action) => {
  switch (action.type) {
    default:  // triggered when a page is reloaded
      return state;
  }
};

export default weekNumber;
