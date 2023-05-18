import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";

export function Room() {
  return (
    <>
      <Navbar pathActive={"/room"} />
      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header title="Quarto" />
        {/* <Table columnTitles={_columnTitles} /> */}
      </main>
    </>
  );
}
