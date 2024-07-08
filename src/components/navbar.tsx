import { Link } from "react-router-dom";
import { AvatarDropdown } from "./avatar-dropdown";


export function Navbar() {
  return (
    <nav className="flex flex-row justify-between items-center px-14 py-4 bg-black h-20 absolute w-full border-b-2 border-indigo-500">
      <div>
        <img src="/vite.svg" alt="Logo" />
      </div>
      <ul className="flex flex-row gap-24 text-white font-bold">
        <li>
          <Link to="/home">Músicas</Link>
        </li>
        <li>
          <Link to="/favorites">Minhas Favoritas</Link>
        </li>
        <li>
          <Link to="/profile">Meu Perfil</Link>
        </li>
      </ul>
      <div>
        <AvatarDropdown />
      </div>
    </nav>
  );
}