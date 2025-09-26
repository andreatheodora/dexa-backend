export class AttendanceResponseDto {
  constructor(attendance: any) {
    this.document_no = attendance.a_document_no;
    this.date = attendance.a_date;
    this.month = attendance.a_month;
    this.year = attendance.a_year;
    this.tap_in = attendance.a_tap_in;
    this.tap_out = attendance.a_tap_out ?? null;
    this.image_url = attendance.a_image_url ?? null;
    this.user_document_no = attendance.user.u_document_no;
    this.name = attendance.user.u_name ?? null;
  }
  document_no: string;
  name?: string;
  date: number;
  month: number;
  year: number;
  tap_in: string;
  tap_out?: string;
  image_url?: string;
  user_document_no: string;
}
