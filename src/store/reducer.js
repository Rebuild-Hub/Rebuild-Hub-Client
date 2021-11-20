import { Action } from "history";
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

    case Actions.LOGOUT: {
      localStorage.setItem("rebuild-hub-token", null);
      return {
        ...defaultState,
      };
    }

    case Actions.UPDATEUSERDATA: {
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload.data,
        },
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
