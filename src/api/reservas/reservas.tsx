import API from "../connection.tsx";

import {Reserva} from "./ReservaModel.tsx";

export async function save(booking: Reserva) {
    API.post('/booking/save', {
        ...booking
    })
}

export async function update(id: number ,booking: Reserva) {
    API.put(`/booking/update/${id}`, {
        ...booking
    })
}

export async function findById(id: number) {
    API.get(`/booking/findBy/${id}`)
}

export async function deleteById(id: number) {
    API.delete(`/booking/delete/${id}`)
}

export async function getAll() {
    return API.get(`/booking/getAll`)
}