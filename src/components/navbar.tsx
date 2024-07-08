import { Link } from "react-router-dom";
import { AvatarDropdown } from "./avatar-dropdown";
import logo from '@/assets/logo.svg'

export function Navbar() {
  return (
    <nav className="flex flex-row justify-between items-center px-14 py-4 bg-black h-20 absolute w-full border-b-2 border-indigo-500">
      <Link to="/home">
        <img src={logo} className="w-24 h-24" alt="Logo" />
      </Link>
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
      <AvatarDropdown />
    </nav>
  );
}