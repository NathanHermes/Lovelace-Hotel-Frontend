import API from "../connection.tsx";

import {Quarto} from "./QuartoModel.tsx";

export async function save(room: Quarto) {
    API.post('/room/save', {
        ...room
    })
}

export async function update(id: number ,room: Quarto) {
    API.put(`/room/update/${id}`, {
        ...room
    })
}

export async function findById(id: number) {
    API.get(`/room/findBy/${id}`)
}

export async function deleteById(id: number) {
    API.delete(`/room/delete/${id}`)
}

export async function getAll() {
    return API.get(`/room/getAll`)
}