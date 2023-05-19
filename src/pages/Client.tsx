import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table";

import { getAll, deleteById, save } from "../api/hospedes/hospedes";
import { useNavigate } from "react-router-dom";
import { validateAuth } from "../utils/validateAuth";

export function Client() {
  const [clients, useClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    validateAuth(navigate);

    getAll().then((res) => {
      const transformedData = res.data.map((item: any) => {
        return {
          id: item.id,
          name: `${item.name} ${item.surname}`,
          cpf: item.cpf,
          email: item.email,
          phone: item.phoneNumber,
        };
      });

      useClients(transformedData);
    });
  }, []);

  const deleteClient = (id: string) => {
    deleteById(id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const addClient = (newValue: any) => {
    let data = {
      name: newValue.Nome,
      surname: newValue.Sobrenome,
      cpf: newValue.CPF,
      email: newValue.Email,
      phoneNumber: newValue.Telefone,
    };

    save(data)
      .then((res: any) => {
        window.location.reload();
      })
      .catch((err: any) => {
        console.log(err);

        alert(err.response.data);
      });
  };

  const _columnTitles = ["ID", "Nome", "CPF", "Email", "Telefone"];
  const _inputs = ["ID", "Nome", "Sobrenome", "CPF", "Email", "Telefone"];

  return (
    <>
      <Navbar pathActive={"/client"} />
      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header title="Hóspede" inputs={_inputs} handleAdd={addClient} />
        <Table
          title="Hóspede"
          columnTitles={_columnTitles}
          data={clients}
          deleteFunction={deleteClient}
        />
      </main>
    </>
  );
}
