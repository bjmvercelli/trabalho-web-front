import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

type LoginRequestParams = {
  email: string;
  password: string;
};

type RegisterRequestParams = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FavoriteMusicRequestParams = {
  userId: string;
  artist: string;
  music: string;
};

export async function LoginRequest(params: LoginRequestParams) {
  const { email, password } = params;

  const response = await axios.post("/login", {
    email,
    password,
  });

  return {
    data: response.data,
    status: response.status,
  };
}

export async function RegisterRequest(params: RegisterRequestParams) {
  const { username, email, password, confirmPassword } = params;

  const response = await axios.post("/createUser", {
    username,
    email,
    password,
    confirmPassword,
  });

  return {
    data: response.data,
    status: response.status,
  };
}

export async function FavoriteMusicRequest(params: FavoriteMusicRequestParams) {
  const response = await axios.post("/favoritarMusica", {
    ...params,
  });

  return {
    data: response.data,
    status: response.status,
  };
}

export async function UnfavoriteMusicRequest(params: FavoriteMusicRequestParams) {
  const response = await axios.post("/desfavoritarMusica", {
    ...params,
  });

  return {
    data: response.data,
    status: response.status,
  };
}

export async function GetFavoritesRequest(userId: string) {
  const response = await axios.get(`/minhasFavoritas/${userId}`);

  return {
    data: response.data,
    status: response.status,
  };
}