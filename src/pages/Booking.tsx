import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table";

import { getAll, deleteById } from "../api/reservas/reservas";

export function Booking() {
  const [bookings, useBookings] = useState([]);

  useEffect(() => {
    getAll().then((res) => {
      const transformedData = res.data.map((item: any) => {
        return {
          id: item.id,
          client: `${item.client.name} ${item.client.surname}`,
          dailyValue: item.room.dailyValue,
          room: item.room.id,
          start: item.startingDate,
          end: item.finalDate,
        };
      });

      useBookings(transformedData);
    });
  }, []);

  const deleteBooking = (id: string) => {
    deleteById(id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const _columnTitles = [
    "ID",
    "Hóspede",
    "Diária",
    "ID Quarto",
    "Início",
    "Fim",
  ];

  return (
    <>
      <Navbar pathActive={"/"} />
      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header title="Reserva" inputs={_columnTitles} />
        <Table
          columnTitles={_columnTitles}
          data={bookings}
          deleteFunction={deleteBooking}
        />
      </main>
    </>
  );
}
