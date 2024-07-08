import Axios from 'axios';

type LoginRequestParams = {
  email: string;
  password: string;
};

export async function LoginRequest(params: LoginRequestParams) {
  const { email, password } = params;

  const response = await Axios.post('/api/login', {
    email,
    password,
  });

  return {
    data: response.data,
    status: response.status,
  }
}

