import { api } from "../connection.tsx";

export async function save(booking: any) {
  await api.post("/booking/save", {
    ...booking,
  });
}

export async function update(id: string, booking: any) {
  await api.put(`/booking/update/${id}`, {
    ...booking,
  });
}

export async function findById(id: string) {
  await api.get(`/booking/findBy/${id}`);
}

export async function deleteById(id: string) {
  await api.delete(`/booking/delete/${id}`);
}

export async function getAll() {
  return await api.get(`/booking/getAll`);
}
