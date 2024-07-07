import { Input } from "./ui/input";

export function Dashbord() {
  return (
    <main className="bg-[#09090B] h-full pt-32 flex justify-center">
      <section className="w-3/6">
        <Input
          type="search"
          placeholder="Buscar"
          className="bg-[#27272a80] text-white rounded-full focus-visible:ring-offset-0 focus-visible:ring-0 focus:animate-border-animation"
        />
      </section>
    </main>
  )
}