import { Reservation } from "./reservation.model";

export class Facture
{
  id?: number;
  date: Date;
  montantTotal: number;
  reservationId?: number;
  reservation?: Reservation;
}
