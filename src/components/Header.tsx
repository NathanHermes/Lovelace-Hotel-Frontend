import { Link } from "react-router-dom";
import icon from "../assets/icon.svg";

export function Header() {
  return (
    <header className="flex container items-center w-full px-28 py-8 gap-4">
      <div className="flex items-center justify-center">
        <img src={icon} className="w-1/2" />
      </div>

      <div className="w-full flex items-center justify-between">
        <nav className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="p-3 text-zinc-900 font-bold bg-amber-100 rounded-lg"
          >
            Reservas
          </Link>
          <Link to="/client" className="text-zinc-500">
            Hóspedes
          </Link>
          <Link to="/room" className="text-zinc-500">
            Quartos
          </Link>
        </nav>

        {/* <button className="text-red-500 font-bold">Logout</button> */}
      </div>
    </header>
  );
}
