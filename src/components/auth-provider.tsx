import { AuthContext } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type StorageData = {
  email: string;
  password: string;
}

export const AuthProvider = () => {
  const { value: user, setValue: setUser } = useLocalStorage<StorageData>('user');
  const navigate = useNavigate();

  const login = ({ email, password }: StorageData) => {
    setUser({ email, password });
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