import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { RoomModal } from "./Modals/RoomModal";
import { ClientModal } from "./Modals/ClientModal";
import { BookingModal } from "./Modals/BookingModal";
import { useState } from "react";

interface HeaderProps {
  title: PageNames;
  inputs?: Array<string>;
  modalAction: (object: any) => void;
  searchFunction?: (fullname: string, researched: boolean) => void;
}

export enum PageNames {
  BOOKING = "Reserva",
  CLIENT = "Hóspede",
  ROOM = "Quarto",
}

export function Header({ title, modalAction, searchFunction }: HeaderProps) {
  const [fullname, setFullname] = useState("");
  const [researched, setResearched] = useState(false);

  function setModal() {
    switch (title) {
      case PageNames.BOOKING:
        return <BookingModal isEdit={false} action={modalAction} />;
      case PageNames.CLIENT:
        return <ClientModal isEdit={false} action={modalAction} />;
      case PageNames.ROOM:
        return <RoomModal isEdit={false} action={modalAction} />;
      default:
        break;
    }
  }

  const search = (event: any) => {
    event.preventDefault();
    setResearched(!researched);

    if (researched) {
      setFullname("");
    }
    if (searchFunction) {
      searchFunction(fullname, researched);
    }
  };

  return (
    <header className="flex items-end justify-center w-full">
      <div className="flex flex-col gap-3 items-start justify-center w-full">
        <h1 className="font-black text-xl">{title}s</h1>

        <p className="text-base text-zinc-700">
          Gerencie {title === "Reserva" ? "todas as" : "todos os"}{" "}
          <span className="lowercase">{title}s</span> existentes ou adicione{" "}
          {title === "Reserva" ? "novas" : "novos"}{" "}
          <span className="lowercase">{title}s</span>.
        </p>
      </div>

      <div className="flex gap-5 items-center justify-end">
        {title === "Hóspede" && (
          <div className="flex items-center justify-center">
            <div className="border-s-2 border-y-2 border-zinc-300 flex items-center justify-center py-2 px-3 rounded-s-lg">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Busque aqui"
                value={fullname}
                onChange={(event) => setFullname(event.target.value)}
                className="bg-zinc-50 outline-0 placeholder-zinc-500 rounded-lg text-zinc-900"
              />
            </div>

            <button
              type="submit"
              className="border-e-2 border-y-2 border-zinc-300 p-2.5 rounded-e-lg"
              onClick={(event) => search(event)}
            >
              {researched ? (
                <Cross2Icon width={20} height={20} className="text-red-500" />
              ) : (
                <MagnifyingGlassIcon
                  width={20}
                  height={20}
                  className="text-zinc-500"
                />
              )}
            </button>
          </div>
        )}

        {setModal()}
      </div>
    </header>
  );
}
