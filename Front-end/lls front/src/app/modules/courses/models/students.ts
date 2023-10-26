export interface StudentGetResponse {
  data: StudentResonse;
  status: boolean;
  responceTime: string;
}
export interface StudentResonse {
  result: Student[];
  count: number;
  next: string | null;
  pervious: string | null;
}
export interface Student {
  idd: string;
  firstName: string;
  lastname: string;
  email: string;
  role: string;
  lastLogIn: string;
  update: string;
}
export interface Students {
  [key: string | number]: {
    [key: number]: StudentGetResponse;
    currentPage: number;
  };
}
export interface AssignStudentSuccessResponse {
  data: Student[];
  message?: string;
  responceTime: string;
  status: boolean;
}
