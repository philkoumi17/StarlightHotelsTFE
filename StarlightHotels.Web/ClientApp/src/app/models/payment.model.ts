export class Payment
{
  orderId: number;
  amount: number;
  shaSign?: string;
  reservationId?: number;
  applicationUserId?: string;
  dateReservation: Date;
}
