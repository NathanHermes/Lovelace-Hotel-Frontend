import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";

export function Client() {
  return (
    <>
      <Navbar pathActive={"/client"} />
      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header title="Hóspede" />
        {/* <Table columnTitles={_columnTitles} /> */}
      </main>
    </>
  );
}
