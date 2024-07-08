import { axios } from "./instance";

type LoginRequestParams = {
  email: string;
  password: string;
};

type LoginResponseData = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  
}

type RegisterRequestParams = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterResponseData = {
  id: string;
  name: string;
  email: string;
};

export async function loginRequest(params: LoginRequestParams) {
  const { email, password } = params;

  const response = await axios.post("/auth/login", {
    email,
    password,
  });

  return {
    data: response.data as LoginResponseData,
    status: response.status,
  };
}

export function setToken(token: string) {
  axios.defaults.headers.common["Authorization"] = '';
  delete axios.defaults.headers.common["Authorization"];

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function registerRequest(params: RegisterRequestParams) {
  const { name, email, password, confirmPassword } = params;

  const response = await axios.put("/auth/register", {
    name,
    email,
    password,
    confirmPassword,
  });

  return {
    data: response.data as RegisterResponseData,
    status: response.status,
  };
}