import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table";

export function Booking() {
  const _columnTitles = ["Nome", "CPF", "E-mail", "Telefone"];

  return (
    <>
      <Navbar pathActive={"/"} />
      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header title="Reserva" />
        <Table columnTitles={_columnTitles} />
      </main>
    </>
  );
}
