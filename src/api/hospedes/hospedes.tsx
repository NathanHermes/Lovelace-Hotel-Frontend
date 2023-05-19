import API from "../connection.tsx";

import {Hospede} from "./HospedeModel.tsx";

export async function save(client: any) {
    await API.post('/client/save', {
        ...client
    })
}

export async function update(id: string ,client: any) {
    await API.put(`/client/update/${id}`, {
        ...client
    })
}

export async function findById(id: string) {
    await API.get(`/client/findBy/${id}`)
}

export async function findByName(name: string, surname: string) {
    await API.get(`/client/findByName/${name}/${surname}`)
}

export async function deleteById(id: string) {
    await API.delete(`/client/delete/${id}`)
}

export async function getAll() {
    return await API.get(`/client/getAll`)
}