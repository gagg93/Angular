export interface Reservation {
  id: number;
  user_id: number;
  vehicle_id: number;
  res_begin: Date;
  res_end: Date;
  approved: boolean;
}
