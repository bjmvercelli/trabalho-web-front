import { createContext, useContext } from "react";

type StorageData = {
  email: string;
  password: string;
}

export const AuthContext = createContext({
  user: null as StorageData | null,
  login: (params: StorageData) => {},
  logout: () => {}
})

export const useAuth = () => {
  return useContext(AuthContext);
}