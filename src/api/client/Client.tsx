import { ClientModel } from "./ClientModel.tsx";
import { api } from "../connection.tsx";

export async function findAllClients() {
  return await api.get(`/client/getAll`);
}

export async function findById(id: string) {
  await api.get(`/client/findBy/${id}`);
}

export async function findByName(name: string, surname: string) {
  return await api.get(`/client/findByName/${name}/${surname}`);
}

export async function save(client: ClientModel) {
  await api.post("/client/save", {
    ...client,
  });
}

export async function update(client: ClientModel) {
  await api.put(`/client/update/${client.id}`, {
    ...client,
  });
}

export async function deleteById(id: string) {
  await api.delete(`/client/delete/${id}`);
}
