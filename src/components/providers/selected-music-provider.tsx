import { SelectedMusicContext } from "@/hooks/useSelectedMusic";
import { ReactNode, useState } from "react";
import { Music } from "../shared/types/Music";

export const SelectedMusicProvider = ({children}: {children: ReactNode}) => {
  const [value, setValue] = useState<Music | null>(null);

  return (
    <SelectedMusicContext.Provider value={{ selectedMusic: value, setSelectedMusic: setValue }}>
      {children}
    </SelectedMusicContext.Provider>
  )
}