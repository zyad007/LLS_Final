export interface TeacherGetResponse {
  data: TeacherResonse;
  status: boolean;
  responceTime: string;
}
export interface TeacherResonse {
  result: Teacher[];
  count: number;
  next: string | null;
  pervious: string | null;
}
export interface Teacher {
  idd: string;
  firstName: string;
  lastname: string;
  email: string;
  role: string;
  lastLogIn: string;
  update: string;
  // academicYear: string;
  // city: string;
  // gender: string;
}
export interface Teachers {
  [key: string | number]: {
    [key: number]: TeacherGetResponse;
    currentPage: number;
  };
}
export interface AssignTeacherSuccessResponse {
  data: Teacher;
  message?: string;
  responceTime: string;
  status: boolean;
}
