import { useEffect, useState } from "react";
import { Header, PageNames } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Table, Titles } from "../components/Table";

import {
  deleteById,
  save,
  update,
  findAllClients,
  findByName,
} from "../api/client/Client";
import { useNavigate } from "react-router-dom";
import { validateAuth } from "../utils/validateAuth";
import { ClientModel } from "../api/client/ClientModel";
import toast, { Toaster } from "react-hot-toast";

export const Client = () => {
  const _columnTitles = ["ID", "Nome", "Sobrenome", "CPF", "Email", "Telefone"];
  const [clients, setClients] = useState(Array<any>);
  const navigate = useNavigate();

  useEffect(() => {
    validateAuth(navigate);
    loadClients();
  }, [navigate]);

  const loadClients = () => {
    findAllClients().then((response) => {
      const clientsData = response.data.map((client: ClientModel) => {
        return {
          id: client.id,
          name: client.name,
          surname: client.surname,
          cpf: client.cpf,
          email: client.email,
          phoneNumber: client.phoneNumber,
        };
      });

      setClients(clientsData);
    });
  };

  const search = async (fullname: string, researched: boolean) => {
    if (researched) return loadClients();

    if (fullname.length === 0 || fullname === " ") {
      return toast("Nome inválido.\nTente novamente.", {
        icon: "⚠️",
      });
    }

    const indexOfLastWhiteSpace = fullname.lastIndexOf(" ");
    if (indexOfLastWhiteSpace < 0) {
      return toast("Sobrenome inválido.\nTente novamente.", {
        icon: "⚠️",
      });
    }

    const name = fullname.substring(0, indexOfLastWhiteSpace);
    const surname = fullname.substring(indexOfLastWhiteSpace + 1);
    if (surname.length === 0 || surname === " ") {
      return toast("Sobrenome inválido.\nTente novamente.", {
        icon: "⚠️",
      });
    }

    await findByName(name, surname)
      .then((response: any) => {
        setClients([response.data]);
      })
      .catch((error: any) => {
        loadClients();

        if (error.response.status === 400) {
          toast.error("Hóspede não encontrado.\nTente novamente.");
        } else {
          console.log(error);
        }
      });
  };

  const createClient = (client: ClientModel) => {
    save(client)
      .then(() => {
        toast.success("Hóspede cadastrado.");
        loadClients();
      })
      .catch(() => {
        toast.error(
          "Não foi possivel cadastrar o hóspede.\nTente novamente mais tarde."
        );
      });
  };

  const updateClient = (client: ClientModel) => {
    update(client)
      .then(() => {
        toast.success("Hóspede atualizado.");
        loadClients();
      })
      .catch(() => {
        toast.error(
          "Não foi possivel atualizar o hóspede.\nTente novamente mais tarde."
        );
      });
  };

  const deleteClient = (id: string) => {
    deleteById(id)
      .then(() => {
        toast.success("Hóspede apagado.");
        loadClients();
      })
      .catch(() => {
        toast.error(
          "Não foi possivel apagar o hóspede.\nTente novamente mais tarde."
        );
      });
  };

  return (
    <>
      <Navbar pathActive={"/client"} />
      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header
          title={PageNames.CLIENT}
          modalAction={createClient}
          searchFunction={search}
        />

        <Table
          title={Titles.CLIENT}
          columnTitles={_columnTitles}
          data={clients}
          editFunction={updateClient}
          deleteFunction={deleteClient}
        />
      </main>

      <Toaster position="top-right" />
    </>
  );
};
