import { formatDate } from '@angular/common';
export class Hotel {
  id: number;
  img: string;
  name: string;
  email: string;
  arriveDate: string;
  departDate: string;
  gender: string;
  mobile: string;
  roomType: string;
  payment: string;
  constructor(hotel) {
    {
      this.id = hotel.id || this.getRandomID();
      this.img = hotel.avatar || 'assets/images/user/user1.jpg';
      this.name = hotel.name || '';
      this.email = hotel.email || '';
      this.arriveDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.departDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.gender = hotel.gender || '';
      this.mobile = hotel.mobile || '';
      this.roomType = hotel.roomType || '';
      this.payment = hotel.payment || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      // tslint:disable-next-line: no-bitwise
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
