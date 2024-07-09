import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "./navbar";
import { SelectedMusicProvider } from "./providers/selected-music-provider";

export function ProtectedRoute() {
  const { user } = useAuth();

  if (!user?.id) {
    return <Navigate to="/login" />;
  }

  return (
    <SelectedMusicProvider>
      <Navbar />
      <main className="bg-[#09090B] h-full pt-32 flex justify-center">
        <Outlet />
      </main>
    </SelectedMusicProvider>

  );
}