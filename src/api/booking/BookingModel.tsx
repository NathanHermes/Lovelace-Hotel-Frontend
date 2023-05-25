import { ClientModel } from "../client/ClientModel";
import { RoomModel } from "../room/RoomModel";

export interface BookingModel {
  id?: string;
  idClient: string;
  idRoom: string;
  startingDate: string;
  finalDate: string;
}

export interface RecieveBookingModel {
  id: string;
  client: ClientModel;
  room: RoomModel;
  startingDate: string;
  finalDate: string;
}
