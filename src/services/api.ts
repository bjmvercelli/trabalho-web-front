import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

type LoginRequestParams = {
  email: string;
  password: string;
};

export async function LoginRequest(params: LoginRequestParams) {
  const { email, password } = params;

  const response = await axios.post('/api/login', {
    email,
    password,
  });

  return {
    data: response.data,
    status: response.status,
  }
}

