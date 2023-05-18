import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Booking } from "./pages/Booking";
import { Client } from "./pages/Client";
import { Room } from "./pages/Room";
import Login from "./pages/Login";

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Booking /> },
      { path: "/client", element: <Client /> },
      { path: "/room", element: <Room /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
