export interface RoomModel {
  id?: string;
  dailyValue: number;
  bedType: string;
  roomType: string;
}

export enum BedType {
  UNDEFINED = "Selecione um tipo",
  CASAL = "Casal",
  DUPLO_SOLTEIRO = "Duplo solteiro",
  SOLTEIRO = "Solteiro",
}

export enum RoomType {
  UNDEFINED = "Selecione um tipo",
  DELUXE = "Deluxe",
  MASTER = "Master",
  STANDARD = "Standard",
}
