import { TrashIcon } from "@radix-ui/react-icons";
import { Modal } from "./Modal";

type TableProps = {
  title: string;
  columnTitles: Array<string>;
  data: Array<any>;
  deleteFunction: (id: string) => any;
  editFunction: (object: any) => any;
};

export function Table({
  title,
  columnTitles,
  data,
  deleteFunction,
  editFunction
}: TableProps) {
  const deleteRow = (e: any, id: string) => {
    e.preventDefault();
    deleteFunction(id);
  };

  const editRow = (newValue: any) => {
    editFunction(newValue);
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
                return <td className="p-3">{item[key]}</td>;
              })}

              <td className="p-3 space-x-2">
                <Modal title={title} isEdit={true} inputs={columnTitles} add={editRow} rowId={item.id}/>

                <button
                  className="bg-red-500 p-2 rounded-md"
                  onClick={(e) => deleteRow(e, item.id)}
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
