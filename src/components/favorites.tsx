import { ChevronRight, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFavoritesRequest } from "@/services/music";
import { useToast } from "./ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Music } from "./shared/types/Music";
import { useSelectedMusic } from "@/hooks/useSelectedMusic";
import { Icons } from "./icons";

type Favorites = {
  allFavorites: Music[];
  filteredFavorites: Music[];
}

const debounceSearch = (fn: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  }
}


export function Favorites() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { setSelectedMusic } = useSelectedMusic();
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)
  const [favorites, setFavorites] = useState<Favorites | null>(null)

  useEffect(() => {
    getFavoritesRequest(user?.id!)
      .then(favorites => {
        setFavorites({
          allFavorites: favorites.data,
          filteredFavorites: favorites.data
        });
      }).catch(error => {
        console.error(error)
        toast({
          title: "Erro ao buscar favoritos",
          description: "Tente novamente mais tarde",
          variant: "destructive",
          className: "top-0 left-1/2 transform -translate-x-1/2 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-left"
        });
      })
  }, [])

  const handleSelectMusic = (music: Music) => {
    setSelectedMusic(music);
    navigate(`/music/${music.id}`);
  }

  const handleSearch = debounceSearch((event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setFavorites((prev) => ({
        ...prev!,
        filteredFavorites: prev!.allFavorites
      }))
      setIsLoadingSearch(false)
      return
    }

    const filteredFavorites = favorites?.allFavorites.filter(favorite => favorite.title.toLowerCase().includes(event.target.value.toLowerCase()))
    setFavorites((prev) => ({
      ...prev!,
      filteredFavorites: filteredFavorites!
    }))
    setIsLoadingSearch(false)
  }, 1000)

  return (
    <section className="w-3/6 flex flex-col">
      <div className="flex items-center justify-center py-4 w-full">
        {
          isLoadingSearch
            ? <Icons.spinner className="relative left-8 w-4 h-4 -ml-4 animate-spin text-white" />
            : <Search className="relative w-4 h-4 -ml-4 left-8 top-2 transform -translate-y-1/2" color="#fff" />
        }
        <Input
          type="search"
          placeholder="Busque pelo nome da música"
          className="bg-[#27272a80] pl-10 text-white rounded-full h-12 focus-visible:ring-offset-0 focus-visible:ring-0 focus:animate-border-animation justify-self-center w-3/6"
          onChange={(value) => {
            setIsLoadingSearch(true)
            handleSearch(value)
          }}
        />
      </div>
      <ScrollArea className="h-full bg-red mt-4 mb-16">
        <div>
          {
            favorites?.filteredFavorites ? (
              favorites.filteredFavorites.map((music, _) => (
                <div key={music.id} className="bg-[#27272a80] rounded-lg w-full p-4 mt-4 flex justify-between items-center">
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
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full mt-16">
                <p className="text-white text-lg">Nenhum favorito encontrado</p>
              </div>
            )
          }
        </div>
      </ScrollArea>
    </section>
  )
}