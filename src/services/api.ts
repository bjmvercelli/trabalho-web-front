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

type SearchMusicParams = {
  artist: string;
  music: string;
};

export async function loginRequest(params: LoginRequestParams) {
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

export async function registerRequest(params: RegisterRequestParams) {
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

export async function favoriteMusicRequest(params: FavoriteMusicRequestParams) {
  const response = await axios.post("/favoritarMusica", {
    ...params,
  });

  return {
    data: response.data,
    status: response.status,
  };
}

export async function unfavoriteMusicRequest(params: FavoriteMusicRequestParams) {
  const response = await axios.post("/desfavoritarMusica", {
    ...params,
  });

  return {
    data: response.data,
    status: response.status,
  };
}

export async function getFavoritesRequest(userId: string) {
  const response = await axios.get(`/minhasFavoritas?usuario=${userId}`);

  return {
    data: response.data,
    status: response.status,
  };
}

export async function searchMusic(params: SearchMusicParams) {
  const response = await axios.post("/pesquisarMusica", {
    ...params,
  });

  return {
    data: response.data.result,
    status: response.status,
  };
}

export async function searchMusicById(id: string) {
  const response = await axios.get(`/musica/${id}`);

  return {
    data: response.data,
    status: response.status,
  };
}