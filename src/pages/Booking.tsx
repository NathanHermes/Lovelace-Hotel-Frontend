import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table";

export function Booking() {
  const _columnTitles = ["Nome", "CPF", "E-mail", "Telefone"];

  return (
    <>
      <Navbar pathActive={"/"} />
      <main>
        <Header />
        <Table columnTitles={_columnTitles} />
      </main>
    </>
  );
}
