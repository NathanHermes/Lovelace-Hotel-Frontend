import React, { useState, ChangeEvent } from "react";

import { useNavigate } from "react-router-dom";

import { Funcionario } from "../api/funcionarios/FuncionarioModel";
import { login } from "../api/funcionarios/funcionarios";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    const funcionario = {
      username,
      password
    }

    login(funcionario)
    .then((res) => {
      localStorage.setItem('isLogged', "true");
      navigate("/client")
    })
    .catch((err) => {
      alert(err.response.data);
    })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xl">
        <div className="flex">
          <div className="w-2/3">
            <h1 className="text-3xl font-bold mb-8">Login</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Digite seu username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Senha
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {/* Adicione validação de senha aqui, se necessário */}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleLogin}
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/3 flex items-center justify-center p-4">
            <p className="text-lg text-gray-800">
              Desfrute de uma estadia extraordinária no nosso hotel!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
