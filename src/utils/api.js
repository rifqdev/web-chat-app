const axios = require("axios");

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const register = async (data) => {
  try {
    const response = await api.post("auth/register", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (data) => {
  try {
    const response = await api.post("auth/login", data);
    sessionStorage.setItem("access_token", response.data.data.accessToken);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post("auth/refresh-token");
    sessionStorage.setItem("access_token", response.data.data.refreshToken);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await api.post("forgot-password/request-code", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const verifyForgotPassword = async (data) => {
  try {
    const response = await api.post("forgot-password/update-password", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const resendForgotPassword = async (data) => {
  try {
    const email = localStorage.getItem("email");
    const response = await api.post("forgot-password/resend-code", { email });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const logout = async () => {
  sessionStorage.removeItem("access_token");
};

// friends api
export const getFriends = async (search) => {
  try {
    const accessToken = sessionStorage.getItem("access_token");
    const response = await api.get(`friends?fullname=${search}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getByPin = async (pin) => {
  try {
    const accessToken = sessionStorage.getItem("access_token");
    const response = await api.get(`friends/get-by-pin/${pin}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addFriend = async (data) => {
  try {
    const accessToken = sessionStorage.getItem("access_token");
    const response = await api.post("friends/add", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
