export interface PermissionsGetResponse {
  data: Permissions;
  status: boolean;
  responceTime: string;
}
export interface PermissionOnePage {
  [key: number]: PermissionsGetResponse;
  currentPage: number;
}
export interface Permission {
  idd: string;
  email: string;
  firstName: string;
  lastname: string;
  role: string;
}
export interface Permissions {
  result: Permission[];
  next: string | null;
  pervious: string | null;
  count: number;
}
export interface PermissionPayload {
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
export interface PermissionOneGetResponse {
  data: PermissionPayload;
  message: string;
  responceTime: string;
  status: boolean;
}

export interface PermissionsUpdatePayload extends PermissionPayload {
  id: number;
  index: number;
}
