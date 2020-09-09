import { Client } from "./client.model";
import { Etat } from "./etat.model";

export class Reservation
{
  id?: number;
  clientId?: number;
  client?: Client;
  dateReservation: Date;
  prixTotal: number;
  etatId?: number;
  etat?: Etat;
}
