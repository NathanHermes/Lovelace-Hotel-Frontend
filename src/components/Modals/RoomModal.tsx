import { converteBedTypeInStringToBedTypeInEnum } from "../../utils/enumConverter";
import { Cross2Icon, PlusIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { BedType, RoomModel, RoomType } from "../../api/room/RoomModel";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ModalProps {
  action: (room: RoomModel) => void;
  isEdit: boolean;
  room?: RoomModel;
}

const createRoomFormSchema = z.object({
  dailyValue: z
    .string()
    .nonempty("Esse campo é obrigatório.")
    .refine((_dailyValue) => {
      const _dailyValueInt = parseInt(_dailyValue);
      return _dailyValueInt > 0;
    }, "Preço da diária inválido."),
  roomType: z
    .string()
    .toUpperCase()
    .refine((_roomType) => {
      return _roomType !== "SELECIONE UM TIPO";
    }, "Esse campo é obrigatório."),
  bedType: z
    .string()
    .toUpperCase()
    .refine((_bedType) => {
      return _bedType !== "SELECIONE UM TIPO";
    }, "Esse campo é obrigatório."),
});

type CreateRoomFormData = z.infer<typeof createRoomFormSchema>;

export function RoomModal({ action, isEdit, room }: ModalProps) {
  const [open, setOpen] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomFormSchema),
  });

  useEffect(() => {
    if (isEdit && room != undefined) {
      const bedType = converteBedTypeInStringToBedTypeInEnum(room.bedType);
      const roomType = converteBedTypeInStringToBedTypeInEnum(room.roomType);

      setValue("dailyValue", `${room.dailyValue}`);
      setValue("bedType", bedType);
      setValue("roomType", roomType);
    }
  }, [isEdit, room, setValue]);

  function saveRoom(data: CreateRoomFormData) {
    const _room: RoomModel = {
      dailyValue: parseInt(data.dailyValue),
      bedType: data.bedType.replace(" ", "_"),
      roomType: data.roomType as RoomType,
    };

    if (isEdit && room != undefined) _room.id = room.id;

    reset();
    action(_room);
    setOpen(false);
  }

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
            <PlusIcon /> Add Quarto
          </button>
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[#18181b99] data-[state=open]:animate-overlayShow fixed inset-0" />

        <Dialog.Content className="bg-zinc-50 fixed flex flex-col gap-6 max-w-[384px] p-8 rounded-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full">
          <Dialog.Title className="text-zinc-900 text-lg font-bold font-Inter">
            {isEdit === false ? "Cadastar" : "Editar"} Quarto
          </Dialog.Title>

          <form
            onSubmit={handleSubmit(saveRoom)}
            className="flex flex-col gap-3 items-center justify-center w-full"
          >
            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="dailyValue"
              >
                Diária
              </label>

              <input
                id="dailyValue"
                className="bg-zinc-50 border-2 border-zinc-300 outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 placeholder:text-zinc-500"
                placeholder="Informe o valor da diária"
                type="number"
                {...register("dailyValue")}
              />

              {errors.dailyValue && (
                <span className="font-medium text-base text-red-500">
                  {errors.dailyValue.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="bedType"
              >
                Tipo da cama
              </label>

              <select
                id="bedType"
                {...register("bedType")}
                className="bg-zinc-50 border-2 border-zinc-300 cursor-pointer outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 placeholder:text-zinc-500"
              >
                <option
                  value={BedType.UNDEFINED}
                  className="bg-zinc-50 text-base text-zinc-500"
                >
                  {BedType.UNDEFINED}
                </option>

                <option
                  value={BedType.SOLTEIRO}
                  className="bg-zinc-50 text-base text-zinc-500"
                >
                  {BedType.SOLTEIRO}
                </option>

                <option
                  value={BedType.DUPLO_SOLTEIRO}
                  className="bg-zinc-50 text-base text-zinc-500"
                >
                  {BedType.DUPLO_SOLTEIRO}
                </option>

                <option
                  value={BedType.CASAL}
                  className="bg-zinc-50 text-base text-zinc-500"
                >
                  {BedType.CASAL}
                </option>
              </select>

              {errors.bedType && (
                <span className="font-medium text-base text-red-500">
                  {errors.bedType.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="roomType"
              >
                Tipo do quarto
              </label>

              <select
                id="roomType"
                {...register("roomType")}
                className="bg-zinc-50 border-2 border-zinc-300 cursor-pointer outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 placeholder:text-zinc-500"
              >
                <option
                  value={RoomType.UNDEFINED}
                  className="bg-zinc-50 text-base text-zinc-500"
                >
                  {RoomType.UNDEFINED}
                </option>

                <option
                  value={RoomType.STANDARD}
                  className="bg-zinc-50 text-base text-zinc-500"
                >
                  {RoomType.STANDARD}
                </option>

                <option
                  value={RoomType.MASTER}
                  className="bg-zinc-50 text-base text-zinc-500"
                >
                  {RoomType.MASTER}
                </option>

                <option
                  value={RoomType.DELUXE}
                  className="bg-zinc-50 text-base text-zinc-500"
                >
                  {RoomType.DELUXE}
                </option>
              </select>

              {errors.roomType && (
                <span className="font-medium text-base text-red-500">
                  {errors.roomType.message}
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
}
