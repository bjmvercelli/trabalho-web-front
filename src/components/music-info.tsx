import { ChevronLeft, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

const lyrics = `
  That's Not My Neighbor Song - Open The Door (feat. Dayum Dahlia)

  Music and Lyrics


  Good afternoon
  Hello! Hi
  Isn't it nice to be human? (entirely human)
  It would be so kind
  If you could open the door and let me inside

  You're asking a whole lot of questions
  Is it the way that I'm dressed or
  Is it the number of eyes?
  I knew it was something, I'll come back with a new disguise
  Take another face and make it mine
  Making a replacement of your kind
  I'm another feature creature next in line
  Don't look behind you
  Oh you saw right through me, didn't you
  Your senses are screaming: This isn't a human!
  Well I'm getting better
  And sooner or later you'll open the door

  See my name on the list?
  Right
  Everything checks out?
  Let me inside
  Gonna make a little call? Why?
  There's nobody
  Hello?
  Fuck

  I really need to get into the building
  Don't wanna wait anymore
  Everyone out here is dying to get in so
  If you could open the door
  I really need to get into the building
  Don't wanna wait anymore
  Everyone out here is dying to get in so
  If you could open the door

  Hey there!
  Hi!
  Have you ever thought of quitting?
  Sorry about that, let's just start from the beginning
  Here's my card and my form
  Why was I outside the building?
  Oh, yeah
  I was at my job making a killing!

  It's kinda silly to focus all on my voice and shape
  Call me the tenant from heaven, cause I'm a patron saint
  I've been so nice and so kind to my neighbors
  Now if you could do me this one dawn favor

  My, you've got a lot of questions but I guess won't mind
  I'm kind of in a rush and it's a waste of time
  To ask me things over and over
  To see if I slip up, just open the door first
  I just think that we should reach out with a helping hand
  Doppelgangers all around why all the reprimand?
  Nowadays, everybody running while they still can
  Meanwhile, I'm working harder than the milkman
  See my name on the list?
  Right
  Everything checks out?
  Let me inside
  Gonna make a little call? Why?
  There's nobody
  Hello?
  Fuck

  I really need to get into the building
  Don't wanna wait anymore
  Everyone out here is dying to get in so
  If you could open the door
  I really need to get into the building
  Don't wanna wait anymore
  Everyone out here is dying to get in so
  If you could open the door

  There's danger at your doorstep, and only you can prevent what's in store!
  Now, to identify an imposter, all you have to do
  (Hoon!) fuck that!

  I'm-a switch up the visage a mission to I trip up the vision cognition is slipping
  Every time I get a little closer to winning, you're starting to doubt the shape of my mouth
  I'll figure you out, I'll get another face and come back around
  I'm endless, another couple of tries, you'll be defenseless
  Falling for my lies I can't comprehend this, so call for backup
  I'll come back, you let me in, watch the bodies stack up

  See my name on the list?
  Right
  Everything checks out?
  Let me inside
  Wait, we're good? Really? (he he he he he)
  Finally!
  Fuck (fuck)

  I really need to get into the building
  Don't wanna wait anymore
  Everyone out here is dying to get in so
  If you could open the door
  I really need to get into the building
  Don't wanna wait anymore
  Everyone out here is dying to get in so
  If you could open the door

  I really need to get into the building
  Don't wanna wait anymore
  Everyone out here is dying to get in so
  If you could open the door
  I really need to get into the building
  Don't wanna wait anymore
  Everyone out here is dying to get in so
  If you could open the door
`

export function MusicInfo() {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const parsedLyrics = lyrics.replace(/\n/g, "<br />");
  const purifiedHTML = DOMPurify.sanitize(parsedLyrics)

  return (
    <section className="w-3/6 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#27272a80] mr-4" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} color="#fff" />
          </Button>
          <h1 className="text-2xl font-semibold text-white">Música 1</h1>
        </div>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setIsFavorite((prev) => !prev)} className="h-8 w-8 hover:bg-[#27272a80]">
                <Star size={24} color="#FFD700" fill={isFavorite ? "#FFD700" : "none"} />
              </Button>
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
          dangerouslySetInnerHTML={{ __html: purifiedHTML }}
        />
      </ScrollArea>
    </section>
  )
}