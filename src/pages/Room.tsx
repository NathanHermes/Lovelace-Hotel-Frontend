import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table";

import { getAll, deleteById } from "../api/quartos/quartos";
import { useNavigate } from "react-router-dom";
import { validateAuth } from "../utils/validateAuth";

export function Room() {
  const [rooms, useRooms]: Array<any> = useState([]);
  const navigate = useNavigate();

  const [dailyValuem, useDailyValue] = useState("");

  const arrayDale = [[dailyValuem, useDailyValue]];

  useEffect(() => {
    validateAuth(navigate);

    getAll().then((res) => {
      const transformedData = res.data.map((item: any) => {
        return {
          id: item.id,
          dailyValue: item.dailyValue,
          roomType: item.roomType,
          bedType: item.bedType,
        };
      });

      useRooms(transformedData);
    });
  }, []);

  const deleteRoom = (id: string) => {
    deleteById(id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const _columnTitles = ["ID", "Diária", "Tipo de quarto", "Tipo de cama"];

  return (
    <>
      <Navbar pathActive={"/room"} />
      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header title="Quarto" inputs={_columnTitles} />
        <Table
          title="Quarto"
          columnTitles={_columnTitles}
          data={rooms}
          deleteFunction={deleteRoom}
        />
      </main>
    </>
  );
}
