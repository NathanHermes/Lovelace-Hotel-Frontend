import API from "../connection.tsx";

import {Reserva} from "./ReservaModel.tsx";

export async function save(booking: any) {
    await API.post('/booking/save', {
        ...booking
    })
}

export async function update(id: string ,booking: any) {
    await API.put(`/booking/update/${id}`, {
        ...booking
    })
}

export async function findById(id: string) {
    await API.get(`/booking/findBy/${id}`)
}

export async function deleteById(id: string) {
    await API.delete(`/booking/delete/${id}`)
}

export async function getAll() {
    return await API.get(`/booking/getAll`)
}