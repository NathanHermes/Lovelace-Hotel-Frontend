import { BedType, RoomType } from "../api/quartos/RoomModel";

export function converteBedTypeInStringToBedTypeInEnum(enumAsString: string) {
  switch (enumAsString) {
    case "CASAL": return BedType.CASAL
    case "DUPLO_SOLTEIRO": return BedType.DUPLO_SOLTEIRO
    case "SOLTEIRO": return BedType.SOLTEIRO
    case "DELUXE": return RoomType.DELUXE
    case "MASTER": return RoomType.MASTER
    case "STANDARD": return RoomType.STANDARD
    default:
      return BedType.UNDEFINED || RoomType.UNDEFINED
  }
}