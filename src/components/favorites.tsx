import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFavoritesRequest } from "@/services/api";
import { useToast } from "./ui/use-toast";

export function Favorites() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setIsLoading(true)
    getFavoritesRequest('3')
      .then(favorites  => {
        setFavorites(favorites.data)
        setIsLoading(false)
      }).catch(error => {
        console.error(error)
        toast({
          title: "Erro ao buscar favoritos",
          description: "Tente novamente mais tarde",
          variant: "destructive",
          className: "top-0 left-1/2 transform -translate-x-1/2 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-left"
        });
        setIsLoading(false)
      })
  }, [])

  return (
    <section className="w-3/6 flex flex-col">
      <Input
        type="search"
        placeholder="Buscar"
        className="bg-[#27272a80] text-white rounded-full h-12 focus-visible:ring-offset-0 focus-visible:ring-0 focus:animate-border-animation"
      />
      <ScrollArea className="h-full bg-red mt-4 mb-16">
        <div>
          {
            favorites.length ? (
              favorites.map((_, index) => (
                <div key={index} className="bg-[#27272a80] rounded-lg p-4 mt-4 flex">
                  <div className="flex flex-col justify-start items-start mr-4">
                    <h2 className="text-lg font-semibold text-white">Música {index + 1}</h2>
                    <p className="text-sm text-muted-foreground mt-2 text-left">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                      nec dui sed elit bibendum cursus. Nam nec odio nec elit
                      condimentum tincidunt.
                    </p>
                  </div>
                  <Button variant="ghost" className="mt-4 text-white hover:bg-[#27272a80] hover:text-white" onClick={() => navigate(`/music/${index}`)}>
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