import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusIcon, Pencil2Icon } from "@radix-ui/react-icons";

interface ModalProps {
  title: string;
  isEdit: boolean;
  inputs: Array<string>;
  add: (object: any) => any
}

export function Modal({ title, isEdit, inputs, add }: ModalProps) {
  const handleClick = (e: any) => {
    e.preventDefault();
    
    let data: any = {}

    inputs.map((input) => {
      data[input] = document.getElementById(input)?.value
    })

    if (!isEdit) {delete data.ID}
    add(data)
  }

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
            <PlusIcon /> Add {title}
          </button>
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[#18181b99] data-[state=open]:animate-overlayShow fixed inset-0" />

        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-50 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-zinc-900 mb-8 text-base font-medium font-Inter">
            {isEdit === false ? "Cadastar" : "Editar"}{" "}
            <span className="lowercase">{title}</span>
          </Dialog.Title>

          {inputs.map((input, index) => {
            return (
              input !== "ID" && (
                <fieldset
                  key={index}
                  className="mb-[15px] flex items-center gap-5"
                >
                  <label
                    className="text-zinc-900 w-[90px] text-right text-[15px]"
                    htmlFor={input}
                  >
                    {input}
                  </label>
                  <input
                    className="text-zinc-900 inline-flex border-2 border-zinc-500 outline-0 focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-base leading-none"
                    id={input}
                  />
                </fieldset>
              )
            );
          })}

          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="bg-green-500 text-zinc-900 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none" onClick={handleClick}>
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
