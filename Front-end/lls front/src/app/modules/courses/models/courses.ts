export interface CoursesGetResponse {
  data: Courses;
  status: boolean;
  responceTime: string;
}
export interface CourseOnePage {
  [key: number]: CoursesGetResponse;
  currentPage: number;
}
export interface Course {
  name: string;
  idd: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  numberOfStudents: number;
  numberOfExp: number;
}
export interface Courses {
  result: Course[];
  next: string | null;
  pervious: string | null;
  count: number;
}
export interface CoursePayload {
  name: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
}
export interface CourseOneGetResponse {
  data: Course;
  message: string;
  responceTime: string;
  status: boolean;
}

export interface CoursesUpdatePayload extends CoursePayload {
  id: number;
  index: number;
}
