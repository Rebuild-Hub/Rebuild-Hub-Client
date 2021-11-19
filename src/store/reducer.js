import * as Actions from "./actions";

const defaultState = {
  loggedIn: false,
  userData: {},
};

const Reducer = (state = defaultState, action) => {
  switch (action.type) {
    case Actions.LOGIN: {
      return {
        ...state,
        userData: action.payload.userData,
        loggedIn: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default Reducer;
