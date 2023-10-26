export interface UsersGetResponse {
  data: Users;
  status: boolean;
  responceTime: string;
}
export interface UserOnePage {
  [key: number]: UsersGetResponse;
  currentPage: number;
}
export interface User {
  idd: string;
  email: string;
  firstName: string;
  lastname: string;
  role: string;
  lastLogIn: string;
  update: string;
}
export interface Users {
  result: User[];
  next: string | null;
  pervious: string | null;
  count: number;
}
export interface UserPayload {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  academicYear: string;
  city: string;
  gender: string;
  role: string;
  password?: string;
  imgURL: string;
}
export interface UserOneGetResponse {
  data: UserPayload;
  message: string;
  responceTime: string;
  status: boolean;
}

export interface UsersUpdatePayload extends UserPayload {
  id: number;
  index: number;
}
