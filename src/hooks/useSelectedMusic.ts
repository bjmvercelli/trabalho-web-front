import { Music } from "@/components/shared/types/Music";
import { createContext, useContext } from "react";

export const SelectedMusicContext = createContext({
  selectedMusic: null as Music | null,
  setSelectedMusic: (music: Music | null) => {},
});

export const useSelectedMusic = () => {
  return useContext(SelectedMusicContext);
};

