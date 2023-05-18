import { faker } from "@faker-js/faker";
import { RiDeleteBinLine } from "react-icons/Ri";
import { HiOutlinePencilAlt } from "react-icons/Hi";

interface Person {
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

type ColumnTitleProps = {
  columnTitles: Array<string>;
  data: Array<any>;
};

export function Table({ columnTitles, data }: ColumnTitleProps) {
  const mockBookings: Person[] = [];

  for (let i = 0; i < 10; i++) {
    const person: Person = {
      name: faker.person.fullName(),
      cpf: faker.string.numeric(11),
      email: faker.internet.email(),
      phone: faker.phone.number("+55 ## #####-####"),
    };

    mockBookings.push(person);
  }

  return (
    <table className="w-full">
      <thead className="w-full bg-amber-100">
        <tr className="w-full items-center">
          {columnTitles.map((title, index) => {
            return index === 0 ? (
              <td className="px-3 py-3 font-bold rounded-tl-lg">{title}</td>
            ) : (
              <td className="px-3 font-bold py-3">{title}</td>
            );
          })}
          <td className="rounded-tr-lg font-bold">Ações</td>
        </tr>
      </thead>

      <tbody className="w-full py-3">
        {mockBookings.map((booking) => {
          return (
            <tr key={booking.cpf} className="w-full ">
              {Object.entries(booking).map((column) => {
                return <td className="p-3">{column}</td>;
              })}
              <td className="p-3 space-x-2">
                <button className="bg-green-500 p-2">
                  <HiOutlinePencilAlt size={18} className="text-zinc-900" />
                </button>
                <button className="bg-red-500 p-2">
                  <RiDeleteBinLine size={18} className="text-zinc-900" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
