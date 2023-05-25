import { RoomModel } from "../../api/room/RoomModel";
import { Cross2Icon, PlusIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BookingModel } from "../../api/booking/BookingModel";
import { findAllClients } from "../../api/client/Client";
import { findAllRooms } from "../../api/room/Room";
import { ClientModel } from "../../api/client/ClientModel";
import dayjs from "dayjs";

interface ModalProps {
  action: (booking: BookingModel) => void;
  isEdit: boolean;
  booking?: BookingModel;
}

let startingDate: string;

const bookingFormSchema = z.object({
  idClient: z
    .string()
    .nonempty("Esse campo é obrigatório.")
    .refine((_idClient) => {
      return _idClient !== "UNDEFINED";
    }, "Esse campo é obrigatório."),
  idRoom: z
    .string()
    .nonempty("Esse campo é obrigatório.")
    .refine((_idRoom) => {
      return _idRoom !== "UNDEFINED";
    }, "Esse campo é obrigatório."),
  startingDate: z
    .string()
    .nonempty("Esse campo é obrigatório.")
    .refine((_startingDate) => {
      startingDate = _startingDate;
      return dayjs(_startingDate).isAfter(new Date());
    }, "Data inválida."),
  finalDate: z
    .string()
    .nonempty("Esse campo é obrigatório.")
    .refine((_finalDate) => {
      return dayjs(_finalDate).isAfter(startingDate);
    }, "Data inválida."),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

export const BookingModal = ({ action, isEdit, booking }: ModalProps) => {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [rooms, setRooms] = useState([]);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
  });

  useEffect(() => {
    loadClientsAndRooms();
  }, []);

  useEffect(() => {
    if (isEdit && booking !== undefined) {
      setValue("idClient", booking.idClient);
      setValue("idRoom", booking.idRoom);
      setValue("startingDate", booking.startingDate);
      setValue("finalDate", booking.finalDate);
    }
  }, [isEdit, booking, setValue]);

  const loadClientsAndRooms = () => {
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

    findAllRooms().then((response) => {
      const roomsData = response.data.map((room: RoomModel) => {
        return {
          id: room.id,
          dailyValue: room.dailyValue,
          bedType: room.bedType,
          roomType: room.roomType,
        };
      });

      setRooms(roomsData);
    });
  };

  const saveBooking = (data: BookingFormData) => {
    const _booking: BookingModel = {
      idClient: data.idClient,
      idRoom: data.idRoom,
      startingDate: data.startingDate,
      finalDate: data.finalDate,
    };

    if (isEdit && booking != undefined) _booking.id = booking.id;

    reset();
    action(_booking);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {isEdit === true ? (
        <Dialog.Trigger asChild>
          <button className="bg-green-500 p-2 rounded-md">
            <Pencil2Icon width={20} height={20} className="text-zinc-900" />
          </button>
        </Dialog.Trigger>
      ) : (
        <Dialog.Trigger asChild>
          <button className="bg-amber-500 flex gap-2 items-center justify-center px-3 py-2 rounded-lg font-bold whitespace-nowrap">
            <PlusIcon /> Add Reserva
          </button>
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[#18181b99] data-[state=open]:animate-overlayShow fixed inset-0" />

        <Dialog.Content className="bg-zinc-50 fixed flex flex-col gap-6 max-w-[384px] p-8 rounded-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full">
          <Dialog.Title className="text-zinc-900 text-lg font-bold font-Inter">
            {isEdit === false ? "Cadastar" : "Editar"} Reserva
          </Dialog.Title>

          <form
            onSubmit={handleSubmit(saveBooking)}
            className="flex flex-col gap-3 items-center justify-center w-full"
          >
            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="idClient"
              >
                Hóspede
              </label>

              <select
                id="idClient"
                {...register("idClient")}
                className="bg-zinc-50 border-2 border-zinc-300 cursor-pointer outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 placeholder:text-zinc-500"
              >
                <option
                  value="UNDEFINED"
                  className="bg-zinc-50 text-base text-zinc-500"
                >
                  Selecione um hóspede
                </option>

                {clients.map((client: ClientModel) => {
                  return (
                    <option
                      key={client.id}
                      value={client.id}
                      className="bg-zinc-50 text-base text-zinc-500"
                    >
                      {`${client.name} ${client.surname}`}
                    </option>
                  );
                })}
              </select>

              {errors.idClient && (
                <span className="font-medium text-base text-red-500">
                  {errors.idClient.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="idRoom"
              >
                Quarto
              </label>

              <select
                id="idRoom"
                {...register("idRoom")}
                className="bg-zinc-50 border-2 border-zinc-300 cursor-pointer outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 placeholder:text-zinc-500"
              >
                <option
                  value="UNDEFINED"
                  className="bg-zinc-50 text-base text-zinc-500"
                >
                  Selecione um quarto
                </option>

                {rooms.map((room: RoomModel) => {
                  return (
                    <option
                      key={room.id}
                      value={room.id}
                      className="bg-zinc-50 text-base text-zinc-500"
                    >
                      {`${room.bedType} - ${room.roomType}`}
                    </option>
                  );
                })}
              </select>

              {errors.idRoom && (
                <span className="font-medium text-base text-red-500">
                  {errors.idRoom.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="startingDate"
              >
                Entrada
              </label>

              <input
                id="startingDate"
                className="bg-zinc-50 border-2 border-zinc-300 outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 placeholder:text-zinc-500"
                type="date"
                {...register("startingDate")}
              />

              {errors.startingDate && (
                <span className="font-medium text-base text-red-500">
                  {errors.startingDate.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="finalDate"
              >
                Saída
              </label>

              <input
                id="finalDate"
                className="bg-zinc-50 border-2 border-zinc-300 outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 placeholder:text-zinc-500"
                type="date"
                {...register("finalDate")}
              />

              {errors.finalDate && (
                <span className="font-medium text-base text-red-500">
                  {errors.finalDate.message}
                </span>
              )}
            </fieldset>

            <button
              type="submit"
              className="bg-green-500 font-bold items-center justify-center mt-3 py-2 rounded-lg text-zinc-900 w-full"
            >
              Salvar
            </button>
          </form>

          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon height={20} width={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
