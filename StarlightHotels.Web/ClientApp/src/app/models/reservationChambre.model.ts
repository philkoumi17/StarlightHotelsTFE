import { Reservation } from './reservation.model';
import { Formule } from './formule.model';
import { Chambre } from './chambre.model';

export class ReservationChambre
{
  id?: number;
  nbAdultes: number;
  nbEnfants: number;
  dateArrivee: Date;
  dateDepart: Date;
  litSup: boolean;
  montantTotal: number;
  formule: Formule;
  chambre: Chambre;
  reservation: Reservation;
}
