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

export async function findBy(id: number) {
    API.get(`/room/findBy/${id}`)
}

export async function deleteBy(id: number) {
    API.get(`/room/delete/${id}`)
}

export async function getAll() {
    return API.get(`/room/getAll`)
}