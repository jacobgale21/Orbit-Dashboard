import axios from "axios";

// FastAPI backend running locally on port 8000
const API_URL = "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface User {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

api.interceptors.request.use(
  (config) => {
    // 1. Modify the request BEFORE it goes out
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 2. Handle request errors
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh_token");

        const { data } = await axios.post(`${API_URL}/refresh`, {
          refresh_token: refresh,
        });

        localStorage.setItem("access_token", data.access_token);

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
// Example Request Interface (Mirrors Pydantic model on backend)
export interface UserCreate {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export const registerUser = async (user: UserCreate) => {
  try {
    const response = await api.post("/register", user);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

export const loginUser = async (user: UserLogin) => {
  try {
    const response = await api.post("/login", user);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const { data } = await api.get<{ user: User } | User>("/current-user");
    // adjust if you return { user: ... } vs the user directly
    return "user" in data ? data.user : data;
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
};
