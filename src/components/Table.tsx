import { RiDeleteBinLine } from "react-icons/ri";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MouseEventHandler } from "react";

type ColumnTitleProps = {
  columnTitles: Array<string>;
  data: Array<any>;
  deleteFunction: (id: string) => any;
};

export function Table({ columnTitles, data, deleteFunction }: ColumnTitleProps) {
  const deleteRow = (e: any, id: string) => {
    e.preventDefault();
    deleteFunction(id);
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
        {data.map((item) => {
          return (
            <tr key={item.id} className="w-full ">

            {Object.keys(item).map((key) => {
              return (
                <td className="p-3">{item[key]}</td>
              );
            })}

              <td className="p-3 space-x-2">
                <button className="bg-green-500 p-2">
                  <HiOutlinePencilAlt size={18} className="text-zinc-900" />
                </button>

                <button className="bg-red-500 p-2" onClick={(e) => deleteRow(e, item.id)}>
                  <RiDeleteBinLine size={18} className="text-zinc-900" />
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}
