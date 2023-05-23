import { api } from "../connection.tsx";

import { Funcionario } from "./FuncionarioModel.tsx";

export async function register(funcionario: Funcionario) {
  await api.post("/attendant/register", {
    ...funcionario,
  });
}

export async function login(funcionario: Funcionario) {
  await api.post("/attendant/login", {
    ...funcionario,
  });
}
