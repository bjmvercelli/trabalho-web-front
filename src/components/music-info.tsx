import { ChevronLeft, Loader2, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { useSelectedMusic } from "@/hooks/useSelectedMusic";
import { favoriteMusicRequest, unfavoriteMusicRequest } from "@/services/music";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "./ui/use-toast";

export function MusicInfo() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { selectedMusic, setSelectedMusic } = useSelectedMusic();
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [isLoadingFavorite, setIsLoadingFavorite] = useState<boolean>(false)


  console.log(user)

  useEffect(() => {
    if (!selectedMusic) {
      navigate('/home')
    }
  }, [selectedMusic, navigate])

  const handleFavorite = async (action: "add" | "remove") => {
    setIsLoadingFavorite(true)
    if (action === "add") {
      const response = await favoriteMusicRequest({ userId: user?.id!, musicId: selectedMusic?.id! });

      if (response.status !== 200) {
        toast({
          title: "Erro ao favoritar música",
          description: "Tente novamente mais tarde",
          variant: "destructive",
          className: "top-0 left-1/2 transform -translate-x-1/2 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-left"
        });
        setIsLoadingFavorite(false)
        return;
      };

      setIsFavorite(true)
      setIsLoadingFavorite(false)
      return;
    }

    const response = await unfavoriteMusicRequest({ userId: user?.id!, musicId: selectedMusic?.id! });

    if (response.status !== 200) {
      toast({
        title: "Erro ao desfavoritar música",
        description: "Tente novamente mais tarde",
        variant: "destructive",
        className: "top-0 left-1/2 transform -translate-x-1/2 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-left"
      });
      setIsLoadingFavorite(false)
      return;
    };

    setIsFavorite(false)
    setIsLoadingFavorite(false)
  }


  return (
    <section className="w-3/6 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#27272a80] mr-4" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} color="#fff" />
          </Button>
          <h1 className="text-2xl font-semibold text-white capitalize">{selectedMusic?.title}</h1>
        </div>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              {
                false
                  ? <Loader2 size={24} className="mr-2 mt-2 animate-spin" color="#FFF" />
                  : (
                    <Button
                      variant="ghost"
                      className="hover:bg-[#27272a80]"
                      size="icon"
                      onClick={() => handleFavorite(isFavorite ? "remove" : "add")}
                      disabled={isLoadingFavorite}
                    >
                      <Star size={24} color="#FFD700" fill={isFavorite ? "#FFD700" : "none"} />
                    </Button>
                  )
              }
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {
                  isFavorite
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ScrollArea className="h-full bg-red mt-4 mb-16">
        <p
          className="text-muted-foreground mt-2 text-left"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedMusic?.lyrics.replace(/\n/g, "<br />") || "") }}
        />
      </ScrollArea>
    </section>
  )
}