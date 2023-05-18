import { Link } from "react-router-dom";
import icon from "../assets/logotipo.svg";

interface NavbarProps {
  pathActive: string;
}

interface RoutesProps {
  path: string;
  name: string;
}

export function Navbar({ pathActive }: NavbarProps) {
  const routes: RoutesProps[] = [
    { path: "/booking", name: "Reservas" },
    { path: "/client", name: "Hóspedes" },
    { path: "/room", name: "Quartos" },
  ];

  return (
    <header className="flex flex-col gap-8 items-center justify-center w-full">
      <div className="flex items-center justify-center">
        <img src={icon} className="w-1/2" />
      </div>

      <nav className="flex gap-4 items-center justify-center">
        {routes.map((route, index) => {
          return route.path === pathActive ? (
            <Link
              key={index}
              to={route.path}
              className="decoration-2 duration-300 font-bold text-zinc-900 underline underline-offset-4 hover:text-zinc-500"
            >
              {route.name}
            </Link>
          ) : (
            <Link
              key={index}
              to={route.path}
              className="text-zinc-500 hover:decoration-2 hover:underline hover:underline-offset-4"
            >
              {route.name}
            </Link>
          );
        })}
      </nav>

      {/* <button className="text-red-500 font-bold">Logout</button> */}
    </header>
  );
}
