import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table";

import { getAll } from "../api/quartos/quartos";

export function Room() {
  const [rooms, useRooms] = useState([]);

  useEffect(() => {
    getAll().then((res) => {
      const transformedData = res.data.map((item: any) => {
        return {
          id: item.id,
          dailyValue: item.dailyValue,
          roomType: item.roomType,
          bedType: item.bedType,
        }
      })
      
      useRooms(transformedData);
    });
  }, []);

  const _columnTitles = ["ID", "Diária", "Tipo de quarto", "Tipo de cama"];

  return (
    <>
      <Navbar pathActive={"/room"} />
      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header title="Quarto" />
        <Table columnTitles={_columnTitles} data={rooms}/>
      </main>
    </>
  );
}
