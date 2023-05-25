import { Cross2Icon, PlusIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { ClientModel } from "../../api/client/ClientModel";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";

interface ModalProps {
  action: (client: ClientModel) => void;
  isEdit: boolean;
  client?: ClientModel;
}

const clientFormSchema = z.object({
  name: z.string().nonempty("Esse campo é obrigatório."),
  surname: z.string().nonempty("Esse campo é obrigatório."),
  cpf: z
    .string()
    .nonempty("Esse campo é obrigatório.")
    .refine((_cpf) => {
      const clearCpf = _cpf.replace(/[_.-]/g, "");
      return clearCpf.length === 11;
    }, "Informe um cpf válido."),
  email: z
    .string()
    .nonempty("Esse campo é obrigatório.")
    .email("Informe um email válido."),
  phoneNumber: z
    .string()
    .nonempty("Esse campo é obrigatório.")
    .refine((_phoneNumber) => {
      const clearphoneNumber = _phoneNumber.replace(/[_() -]/g, "");
      return clearphoneNumber.length === 11;
    }, "Informe um telefone válido."),
});

type ClientFormData = z.infer<typeof clientFormSchema>;

export const ClientModal = ({ action, isEdit, client }: ModalProps) => {
  const [open, setOpen] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
  });

  useEffect(() => {
    if (isEdit && client !== undefined) {
      setValue("name", client.name);
      setValue("surname", client.surname);
      setValue("cpf", client.cpf);
      setValue("email", client.email);
      setValue("phoneNumber", client.phoneNumber);
    }
  }, [isEdit, client, setValue]);

  function saveClient(data: ClientFormData) {
    const _client: ClientModel = {
      name: data.name,
      surname: data.surname,
      cpf: data.cpf,
      email: data.email,
      phoneNumber: data.phoneNumber,
    };

    if (isEdit && client != undefined) _client.id = client.id;

    reset();
    action(_client);
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
            <PlusIcon /> Add Hóspede
          </button>
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[#18181b99] data-[state=open]:animate-overlayShow fixed inset-0" />

        <Dialog.Content className="bg-zinc-50 fixed flex flex-col gap-6 max-w-[384px] p-8 rounded-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full">
          <Dialog.Title className="text-zinc-900 text-lg font-bold font-Inter">
            {isEdit === false ? "Cadastar" : "Editar"} Hóspede
          </Dialog.Title>

          <form
            onSubmit={handleSubmit(saveClient)}
            className="flex flex-col gap-3 items-center justify-center w-full"
          >
            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="name"
              >
                Nome
              </label>

              <input
                id="name"
                className="bg-zinc-50 border-2 border-zinc-300 outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 placeholder:text-zinc-500"
                placeholder="ex.: Alan"
                type="text"
                {...register("name")}
              />

              {errors.name && (
                <span className="font-medium text-base text-red-500">
                  {errors.name.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="surname"
              >
                Sobrenome
              </label>

              <input
                id="surname"
                className="bg-zinc-50 border-2 border-zinc-300 outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 placeholder:text-zinc-500"
                placeholder="ex.: Turing"
                type="text"
                {...register("surname")}
              />

              {errors.surname && (
                <span className="font-medium text-base text-red-500">
                  {errors.surname.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="cpf"
              >
                CPF
              </label>

              <InputMask
                id="cpf"
                mask="999.999.999-99"
                className="bg-zinc-50 border-2 border-zinc-300 outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 placeholder:text-zinc-500"
                placeholder="ex.: 953.985.050-92"
                type="text"
                {...register("cpf")}
              />

              {errors.cpf && (
                <span className="font-medium text-base text-red-500">
                  {errors.cpf.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="email"
              >
                Email
              </label>

              <input
                id="email"
                className="bg-zinc-50 border-2 border-zinc-300 outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 placeholder:text-zinc-500"
                placeholder="ex.: turing.alan@dev.com"
                type="email"
                {...register("email")}
              />

              {errors.email && (
                <span className="font-medium text-base text-red-500">
                  {errors.email.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="phoneNumber"
              >
                Telefone
              </label>

              <InputMask
                id="phoneNumber"
                mask="(99) 99999-9999"
                className="bg-zinc-50 border-2 border-zinc-300 outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 placeholder:text-zinc-500"
                placeholder="ex.: +55 54 7917-0578"
                type="text"
                {...register("phoneNumber")}
              />

              {errors.phoneNumber && (
                <span className="font-medium text-base text-red-500">
                  {errors.phoneNumber.message}
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
