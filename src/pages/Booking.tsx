import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table";

import { getAll } from "../api/reservas/reservas";

export function Booking() {
  const [bookings, useBookings] = useState([]);

  // useEffect(() => {
  //   getAll().then((res) => {
  //     useBookings(res.data);
  //   });
  // }, []);

  const _columnTitles = ["Nome", "CPF", "E-mail", "Telefone"];

  return (
    <>
      <Navbar pathActive={"/"} />
      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header title="Reserva" />
        <Table columnTitles={_columnTitles} data={bookings} />
      </main>
    </>
  );
}
