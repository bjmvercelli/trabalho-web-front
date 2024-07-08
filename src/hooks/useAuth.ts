import { createContext, useContext } from "react";

type StorageData = {
  id: string
  name: string;
  email: string;
  token: string;
}

export const AuthContext = createContext({
  user: null as StorageData | null,
  login: (params: StorageData) => {},
  logout: () => {}
})

export const useAuth = () => {
  return useContext(AuthContext);
}