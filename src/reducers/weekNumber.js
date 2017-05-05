import Sugar from "sugar/number";

const defaultState = {
    number: 0
};

const weekNumber = (state = defaultState, action) => {
  switch (action.type) {
      default:
      state.number = Sugar.Number.random(1,52);
      return state;
  }
};

export default weekNumber;
