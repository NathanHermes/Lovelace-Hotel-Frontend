import API from "../connection.tsx";

import {Quarto} from "./QuartoModel.tsx";

export async function save(room: Quarto) {
    await API.post('/room/save', {
        ...room
    })
}

export async function update(id: string ,room: Quarto) {
    await API.put(`/room/update/${id}`, {
        ...room
    })
}

export async function findById(id: string) {
    await API.get(`/room/findBy/${id}`)
}

export async function deleteById(id: string) {
    await API.delete(`/room/delete/${id}`)
}

export async function getAll() {
    return await API.get(`/room/getAll`)
}