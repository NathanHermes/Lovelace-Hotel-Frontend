import API from "../connection.tsx";

import {Hospede} from "./HospedeModel.tsx";

export async function save(client: Hospede) {
    API.post('/client/save', {
        ...client
    })
}

export async function update(id: number ,client: Hospede) {
    API.put(`/client/update/${id}`, {
        ...client
    })
}

export async function findById(id: number) {
    API.get(`/client/findBy/${id}`)
}

export async function findByName(name: string, surname: string) {
    API.get(`/client/findByName/${name}/${surname}`)
}

export async function deleteById(id: number) {
    API.delete(`/client/delete/${id}`)
}

export async function getAll() {
    return API.get(`/client/getAll`)
}