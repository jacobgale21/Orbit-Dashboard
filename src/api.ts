import axios from "axios";

// FastAPI backend running locally on port 8000
const API_URL = "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    return response.data;
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
