import { axios } from "./instance";

type UpdatePasswordRequestParams = {
  newPassword: string;
  userId: string;
  name: string;
  email: string;
};

type UpdatePasswordResponseData = {
  id: string;
  name: string;
  email: string;
};

export async function updatePassword(params: UpdatePasswordRequestParams) {
  const { newPassword, userId, name, email } = params;

  const response = await axios.patch(`/users/${userId}`, {
    password: newPassword,
    name,
    email,
  });

  return {
    data: response.data as UpdatePasswordResponseData,
    status: response.status,
  };
}
