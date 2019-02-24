export interface ReservationModel {
  name: string;
  surname: string;
  email: string;
  phone: string;
  occasions: string;
  message: string;
  date: {year: number, month: number, day: number};
  restaurantId: string;
  guestsCount: number;
  startTime: {hour: number, minute: number};
  endTime: {hour: number, minute: number};
}
