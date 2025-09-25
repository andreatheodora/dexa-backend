export class UserResponseDto {
  constructor(user: any) {
    this.document_no = user.u_document_no;
    this.email = user.u_email;
    this.name = user.u_name;
    this.position = user.u_position ?? null;
    this.division = user.u_division ?? null;
    this.salary_gross = user.u_salary_gross ?? null;
    this.address_line1 = user.u_address_line1 ?? null;
    this.address_line2 = user.u_address_line2 ?? null;
    this.city = user.u_city ?? null;
    this.province = user.u_province ?? null;
    this.postal_code = user.u_postal_code ?? null;
    this.created_at = user.u_created_at;
    this.updated_at = user.u_updated_at ?? null;
    this.is_hr = user.u_is_hr;
    this.is_deleted = user.u_is_deleted;
  }

  document_no: string;
  email: string;
  name: string;
  position?: string;
  division?: string;
  salary_gross?: number;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  created_at: Date;
  updated_at?: Date;
  is_hr: boolean;
  is_deleted: boolean;
}
