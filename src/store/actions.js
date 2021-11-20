export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATEUSERDATA = "UPDATEUESRDATA";
export const SETSTATS = "SETSTATS";

export const login = (data = {}) => {
  return {
    type: LOGIN,
    payload: {
      userData: data,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const updateUserData = (data = {}) => {
  return {
    type: UPDATEUSERDATA,
    payload: data,
  };
};

export const setStats = (data) => {
  return {
    type: SETSTATS,
    payload: {
      data,
    },
  };
};
