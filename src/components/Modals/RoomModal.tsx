import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Room } from "../../pages/Room";
import SelectDemo from "../Select";

interface ModalProps {
  isEdit: boolean;
  rowId?: string;
}

export function RoomModal({ isEdit, rowId }: ModalProps) {
  let data: any = {};

  const handleActionClick = (event: any) => {
    event.preventDefault();

    inputs.map((input) => {
      data[input] = document.getElementById(input)?.value;
    });

    delete data.ID;

    if (isEdit === true) {
      data.id = rowId;
    }

    action(data);
  };

  return (
    <Dialog.Root>
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

        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-50 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-zinc-900 mb-8 text-base font-medium font-Inter">
            {isEdit === false ? "Cadastar" : "Editar"} Quarto
          </Dialog.Title>

          <fieldset className="flex flex-col gap-1 items-start justify-center ">
            <label className="text-base text-zinc-900" htmlFor="dailyValue">
              Diária
            </label>
            <input
              id="dailyValue"
              className="border-2 border-zinc-500 flex items-center justify-center outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 placeholder:text-zinc-500"
              placeholder="Informe o valor da diária"
              type="number"
            />
          </fieldset>

          <SelectDemo />

          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                className="bg-green-500 text-zinc-900 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none"
                onClick={handleActionClick}
              >
                Salvar
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
