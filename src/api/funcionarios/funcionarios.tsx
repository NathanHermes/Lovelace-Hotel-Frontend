import API from "../connection.tsx";

import {Funcionario} from "./FuncionarioModel.tsx";

export async function register(funcionario: Funcionario) {
    API.post('/attendant/register', {
        ...funcionario
    })
}

export async function login(funcionario: Funcionario) {
    API.post('/attendant/login', {
        ...funcionario
    })
}