import { Requests } from "../commons";

export const getUserDetailsByToken = async (token) => {
  const res = await Requests.userDetails(token);
  return res.data;
};
