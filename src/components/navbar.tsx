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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/home">Dashboard</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <div>
        <AvatarDropdown />
      </div>
    </nav>
  );
}