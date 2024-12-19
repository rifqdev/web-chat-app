const axios = require("axios");

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const PUBLIC_ENDPOINTS = [
  "auth/login",
  "auth/register",
  "forgot-password/request-code",
  "forgot-password/update-password",
  "forgot-password/resend-code",
];

// Interceptor untuk menyisipkan access_token di setiap request
api.interceptors.request.use(
  (config) => {
    // Periksa apakah URL request termasuk dalam daftar PUBLIC_ENDPOINTS
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) => config.url.includes(endpoint));

    if (!isPublicEndpoint) {
      // Ambil token dari sessionStorage jika bukan endpoint publik
      const accessToken = sessionStorage.getItem("access_token");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        alert("Please login first");
        window.location.href = "/auth/login"; // Redirect ke halaman login
        return Promise.reject("No access token found");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk menangani error 401 (token kedaluwarsa)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Jika error 401 dan belum dicoba untuk refresh token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Panggil endpoint refresh token
        const refreshResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`);

        const newAccessToken = refreshResponse.data.data.accessToken;

        // Simpan access_token baru di sessionStorage
        sessionStorage.setItem("access_token", newAccessToken);

        // Update Authorization header di request sebelumnya
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Ulangi request sebelumnya
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        sessionStorage.removeItem("access_token");
        window.location.href = "auth/login"; // Redirect ke login jika refresh token gagal
      }
    }

    return Promise.reject(error);
  }
);

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
    const response = await api.get(`friends?fullname=${search}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getByPin = async (pin) => {
  try {
    const response = await api.get(`friends/get-by-pin/${pin}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addFriend = async (data) => {
  try {
    const response = await api.post("friends/add", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// profile api
export const getProfile = async () => {
  try {
    const response = await api.get("user/details");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUsername = async (data) => {
  try {
    const response = await api.put("user/update-username", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateBio = async (data) => {
  try {
    const response = await api.put("user/update-bio", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateFullname = async (data) => {
  try {
    const response = await api.put("user/update-fullname", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updatePhoto = async (data) => {
  try {
    const response = await api.put("user/update-profile-picture", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
