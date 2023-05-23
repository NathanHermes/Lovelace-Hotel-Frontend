import { api } from "../connection.tsx";

import { Hospede } from "./HospedeModel.tsx";

export async function save(client: any) {
  await api.post("/client/save", {
    ...client,
  });
}

export async function update(id: string, client: any) {
  await api.put(`/client/update/${id}`, {
    ...client,
  });
}

export async function findById(id: string) {
  await api.get(`/client/findBy/${id}`);
}

export async function findByName(name: string, surname: string) {
  await api.get(`/client/findByName/${name}/${surname}`);
}

export async function deleteById(id: string) {
  await api.delete(`/client/delete/${id}`);
}

export async function getAll() {
  return await api.get(`/client/getAll`);
}
