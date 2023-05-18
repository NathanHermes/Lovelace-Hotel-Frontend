import API from "../connection.tsx";

import {Funcionario} from "./FuncionarioModel.tsx";

export async function register(funcionario: Funcionario) {
    await API.post('/attendant/register', {
        ...funcionario
    })
}

export async function login(funcionario: Funcionario) {
    await API.post('/attendant/login', {
        ...funcionario
    })
}