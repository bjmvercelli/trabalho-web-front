import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";

export function MusicsList() {
  const navigate = useNavigate();

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
            Array.from({ length: 10 }).map((_, index) => (
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
          }
        </div>
      </ScrollArea>
    </section>
  )
}