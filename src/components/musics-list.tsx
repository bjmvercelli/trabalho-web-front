import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { searchMusic } from "@/services/music";
import { useToast } from "./ui/use-toast";
import { useSelectedMusic } from "@/hooks/useSelectedMusic";
import { Music } from "./shared/types/Music";

export function MusicsList() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setSelectedMusic } = useSelectedMusic();
  const [music, setMusic] = useState<Music | null>(null);
  const { toast } = useToast()

  const artistRef = useRef<HTMLInputElement>(null);
  const musicRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (!artistRef.current?.value || !musicRef.current?.value) {
      toast({
        title: "Erro ao buscar música",
        description: "Preencha todos os campos",
        variant: "destructive",
        className: "top-0 left-1/2 transform -translate-x-1/2 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-left"
      });
      return;
    }

    const artist = artistRef.current?.value
    const music = musicRef.current?.value;

    setIsLoading(true);

    try {
      const response = await searchMusic({ artistName: artist, songName: music});

      if (response.status !== 200) {
        toast({
          title: "Erro ao buscar música",
          description: "Tente novamente mais tarde",
          variant: "destructive",
          className: "top-0 left-1/2 transform -translate-x-1/2 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-left"
        });
        setIsLoading(false)
        return
      }
      
      setMusic(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao buscar música",
        description: "Tente novamente mais tarde",
        variant: "destructive",
        className: "top-0 left-1/2 transform -translate-x-1/2 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-left"
      });
      setIsLoading(false)
    }

  }

  const handleSelectMusic = (music: Music) => {
    setSelectedMusic(music);
    navigate(`/music/${music.id}`);
  }

  return (
    <section className="w-3/6 flex flex-col items-center">
      <div className="flex gap-8 items-center w-full">
        <Input
          ref={artistRef}
          type="search"
          placeholder="Nome do artista"
          className="bg-[#27272a80] text-white rounded-lg h-12 focus-visible:ring-offset-0 focus-visible:ring-0 focus:animate-border-animation"
        />
        <Input
          ref={musicRef}
          type="search"
          placeholder="Nome da música"
          className="bg-[#27272a80] text-white rounded-lg h-12 focus-visible:ring-offset-0 focus-visible:ring-0 focus:animate-border-animation"
        />
        <Button onClick={handleSearch} className="bg-[#27272a80] text-white rounded-full h-12 px-4 border border-neutral-800" disabled={isLoading}>
          {
            isLoading ? <Loader2 size={24} className="mr-2 h-4 w-4 animate-spin" /> : null
          }
          BUSCAR
        </Button>
      </div>
      {
        music ? (
          <div className="bg-[#27272a80] rounded-lg w-full p-4 mt-16 flex justify-between items-center">
            <div className="flex flex-col justify-start items-start mr-4">
              <h2 className="text-lg font-semibold text-white capitalize">
                {music.title} <span className="text-sm text-muted-foreground mt-1 text-left">- {music.artist}</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-2 text-left">
                {music.lyrics.slice(0, 100)}...
              </p>
            </div>
            <Button variant="ghost" className="text-white hover:bg-[#27272a80] hover:text-white" onClick={() => handleSelectMusic(music)}>
              <ChevronRight size={16} />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full mt-4">
            <p className="text-white text-lg">Pesquise por sua música desejada</p>
          </div>
        )
      }
    </section>
  )
}