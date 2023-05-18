import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table";

import { getAll, deleteById } from "../api/hospedes/hospedes";

export function Client() {
  const [clients, useClients] = useState([]);

  useEffect(() => {
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

  const _columnTitles = ["ID", "Nome", "CPF", "Email", "Telefone"];

  return (
    <>
      <Navbar pathActive={"/client"} />
      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header title="Hóspede" inputs={_columnTitles} />
        <Table
          columnTitles={_columnTitles}
          data={clients}
          deleteFunction={deleteClient}
        />
      </main>
    </>
  );
}
