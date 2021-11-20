import axios from "axios";

const baseURL = "http://localhost:5000/api";

// Authentication Routes

const auth = axios.create({
  baseURL: `${baseURL}/auth`,
});

export const userDetails = (token) => {
  return auth.get("/me", {
    headers: {
      Authorization: token,
    },
  });
};

export const requestLogin = (data) => {
  return auth.post("/login", data);
};

export const requestRegister = (data) => {
  return auth.post("/register", data);
};

// User Routes

const wastes = axios.create({
  baseURL: `${baseURL}/wastes`,
});

export const newDonation = (data, token) => {
  return wastes.post("/", data, {
    headers: {
      Authorization: token,
    },
  });
};

export const getDonationsByCategory = (category, token) => {
  return wastes.get(`/${category}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const userDonations = (wasteName, token) => {
  return wastes.get(`/wasteItem/${wasteName}`, {
    headers: {
      Authorization: token,
    },
  });
};

// company Routes

const company = axios.create({
  baseURL: `${baseURL}/company`,
});

export const getCompaniesForWaste = (category, waste) => {
  return company.get(`/stats/${category}/${waste}`);
};
