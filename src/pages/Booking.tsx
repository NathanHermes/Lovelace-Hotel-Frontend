import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table";

import { getAll, deleteById, save, update } from "../api/reservas/reservas";
import { useNavigate } from "react-router-dom";
import { validateAuth } from "../utils/validateAuth";

export function Booking() {
  const [bookings, useBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    validateAuth(navigate);

    getAll().then((res) => {
      const transformedData = res.data.map((item: any) => {
        return {
          id: item.id,
          client: `${item.client.name} ${item.client.surname}`,
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

  const addBooking = (newValue: any) => {
    let data = {
      idClient: newValue.Hóspede,
      idRoom: newValue.Quarto,
      startingDate: newValue.Início,
      finalDate: newValue.Fim,
    }

    save(data)
    .then((res: any) => {
      window.location.reload();
    })
    .catch((err: any) => {
      alert(err.response.data);
    });
  }

    const editBooking = (newValue: any) => {      
      let data = {
        idClient: newValue.Hóspede,
        idRoom: newValue.Quarto,
        startingDate: newValue.Início,
        finalDate: newValue.Fim,
      }

      update(newValue.id, data)
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
    "Quarto",
    "Início",
    "Fim",
  ];

  return (
    <>
      <Navbar pathActive={"/booking"} />
      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header title="Reserva" inputs={_columnTitles} handleAdd={addBooking}/>
        <Table
          title="Reserva"
          columnTitles={_columnTitles}
          data={bookings}
          deleteFunction={deleteBooking}
          editFunction={editBooking}
        />
      </main>
    </>
  );
}
