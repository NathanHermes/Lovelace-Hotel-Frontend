import { NavigateFunction } from "react-router-dom";

export function validateAuth(navigate: NavigateFunction) {
  const isLogged = localStorage.getItem("isLogged");

  console.log(isLogged);

  if (isLogged === null) navigate("/");
}
