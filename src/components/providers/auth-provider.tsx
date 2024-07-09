import { AuthContext } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type StorageData = {
  id: string
  name: string;
  email: string;
  token: string;
}

export const AuthProvider = () => {
  const { value: user, setValue: setUser } = useLocalStorage<StorageData | null>('user');
  const navigate = useNavigate();

  const login = ({ id, name, email, token }: StorageData) => {
    setUser({id, name, email, token });
    navigate('/home');
  }

  const logout = () => {
    setUser(null);
    navigate('/');
  }

  const state = useMemo(() => ({
    user,
    login,
    logout
  }), [user]);

  return (
    <AuthContext.Provider value={state}>
      <Outlet />
    </AuthContext.Provider>
  )
}