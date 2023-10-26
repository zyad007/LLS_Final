export interface RolesGetResponse {
  data: Roles;
  status: boolean;
  responceTime: string;
}
export interface RoleOnePage {
  [key: number]: RolesGetResponse;
  currentPage: number;
}
export interface Role {
  // concurrencyStamp: string;
  id: string;
  name: string;
  lastLogIn: string;
  update: string;
  // normalizedName: string;
}
export interface Roles {
  result: Role[];
  next: string | null;
  pervious: string | null;
  count: number;
}
export interface RolePayload {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  academicYear: string;
  city: string;
  gender: string;
  role: string;
  password: string;
}
export interface RoleOneGetResponse {
  data: RolePayload;
  message: string;
  responceTime: string;
  status: boolean;
}

export interface RolesUpdatePayload extends RolePayload {
  id: number;
  index: number;
}
