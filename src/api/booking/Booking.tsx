import { api } from "../connection.tsx";
import { BookingModel } from "./BookingModel.tsx";

export async function findAllBookings() {
  return await api.get(`/booking/getAll`);
}

export async function findById(id: string) {
  await api.get(`/booking/findBy/${id}`);
}

export async function save(booking: BookingModel) {
  await api.post("/booking/save", {
    ...booking,
  });
}

export async function update(booking: BookingModel) {
  await api.put(`/booking/update/${booking.id}`, {
    ...booking,
  });
}

export async function deleteById(id: string) {
  await api.delete(`/booking/delete/${id}`);
}
