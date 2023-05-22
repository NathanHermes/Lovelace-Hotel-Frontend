import { RoomModel } from "../api/room/RoomModel";
import { TrashIcon } from "@radix-ui/react-icons";
import { RoomModal } from "./Modals/RoomModal";

type TableProps = {
  title: Titles;
  columnTitles: Array<string>;
  data: Array<any>;
  editFunction: (object: any) => void;
  deleteFunction: (id: string) => void;
};

export enum Titles {
  BOOKING = "Reserva",
  CLIENT = "Hóspede",
  ROOM = "Quarto",
}

export function Table({
  title,
  columnTitles,
  data,
  editFunction,
  deleteFunction,
}: TableProps) {
  function setEditModal(object: object) {
    switch (title) {
      case Titles.BOOKING:
        break;
      case Titles.CLIENT:
        break;
      case Titles.ROOM:
        return (
          <RoomModal
            action={editFunction}
            isEdit={true}
            room={object as RoomModel}
          />
        );
      default:
        break;
    }
  }

  return (
    <table className="flex flex-col items-center justify-center rounded-lg w-full">
      <thead className="bg-amber-100 flex items-center justify-between rounded-t-lg w-full">
        <tr className="flex items-center justify-center w-full">
          {columnTitles.map((title, index) => {
            return index === 0 ? (
              <td
                key={index}
                className="flex font-bold items-center justify-start p-3 max-w-[200px] rounded-tl-lg w-full"
              >
                {title}
              </td>
            ) : (
              <td
                key={index}
                className="flex font-bold items-center justify-start p-3 w-full"
              >
                {title}
              </td>
            );
          })}
          <td className="flex h-full items-center justify-center max-w-[120px] rounded-tr-lg font-bold w-full">
            Ações
          </td>
        </tr>
      </thead>

      <tbody className="flex flex-col items-center justify-center py-3 w-full">
        {data.map((item) => {
          return (
            <tr
              key={item["id"]}
              className="flex items-center justify-center w-full"
            >
              {Object.keys(item).map((key, index) => {
                return key === "id" ? (
                  <td
                    key={index}
                    className="flex items-center justify-start p-3 max-w-[200px] text-zinc-500"
                  >
                    <p className="truncate">{item[key]}</p>
                  </td>
                ) : (
                  <td
                    key={index}
                    className="flex items-center justify-start p-3 text-zinc-500 w-full"
                  >
                    {item[key]}
                  </td>
                );
              })}

              <td className="flex gap-3 items-center justify-center max-w-[120px] p-3 w-full">
                {setEditModal(item)}

                <button
                  className="bg-red-500 p-2 rounded-md"
                  onClick={() => deleteFunction(item["id"])}
                >
                  <TrashIcon height={20} width={20} className="text-zinc-900" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
