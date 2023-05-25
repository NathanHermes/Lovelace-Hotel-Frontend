import { useEffect, useState } from "react";
import { Header, PageNames } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Table, Titles } from "../components/Table";
import {
  save,
  update,
  deleteById,
  findAllBookings,
} from "../api/booking/Booking";
import { useNavigate } from "react-router-dom";
import { validateAuth } from "../utils/validateAuth";
import { BookingModel, RecieveBookingModel } from "../api/booking/BookingModel";
import toast, { Toaster } from "react-hot-toast";

export const Booking = () => {
  const _columnTitles = ["ID", "Hóspede", "Quarto", "Início", "Fim"];
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    validateAuth(navigate);
    loadBookings();
  }, [navigate]);

  const loadBookings = () => {
    findAllBookings().then((response) => {
      const bookingsData = response.data.map((booking: RecieveBookingModel) => {
        return {
          id: booking.id,
          idClient: booking.client.id,
          client: `${booking.client.name} ${booking.client.surname}`,
          idRoom: booking.room.id,
          room: `${booking.room.bedType} - ${booking.room.roomType}`,
          startingDate: booking.startingDate,
          finalDate: booking.finalDate,
        };
      });

      setBookings(bookingsData);
    });
  };

  const createBooking = (booking: BookingModel) => {
    save(booking)
      .then(() => {
        toast.success("Reserva cadastrada.");
        loadBookings();
      })
      .catch((err: any) => {
        toast.error(err.response.data);
        loadBookings();
      });
  };

  const editBooking = (booking: BookingModel) => {
    update(booking)
      .then(() => {
        toast.success("Reserva atualizada.");
        loadBookings();
      })
      .catch((error: any) => {
        toast.error(error.response.data);
        loadBookings();
      });
  };

  const deleteBooking = (id: string) => {
    deleteById(id)
      .then(() => {
        toast.success("Reserva apagada.");
        loadBookings();
      })
      .catch((err) => {
        toast.error(err.response.data);
        loadBookings();
      });
  };

  return (
    <>
      <Navbar pathActive={"/booking"} />

      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header
          title={PageNames.BOOKING}
          inputs={_columnTitles}
          modalAction={createBooking}
        />

        <Table
          title={Titles.BOOKING}
          columnTitles={_columnTitles}
          data={bookings}
          editFunction={editBooking}
          deleteFunction={deleteBooking}
        />
      </main>

      <Toaster />
    </>
  );
};
