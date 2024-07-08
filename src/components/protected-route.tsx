import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

export function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#09090B] h-full pt-32 flex justify-center">
        <Outlet />
      </main>
    </>
  );
}