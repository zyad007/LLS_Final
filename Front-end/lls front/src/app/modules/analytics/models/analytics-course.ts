export interface AnalyticsCourseGetResponse {
  data: AnalyticsCourse;
  status: boolean;
  responceTime: string;
}
export interface AnalyticCourseOnePage {
  [key: number]: AnalyticsCourseGetResponse;
  currentPage: number;
}
export interface AnalyticeCourse {
  idd: string;
  startDate: string;
  endDate: string;
  name: string;
  numberOfExp: number;
  numberOfStudents: number;
  description: string;
  code: string;
}
export interface AnalyticsCourse {
  result: AnalyticeCourse[];
  next: string | null;
  pervious: string | null;
  count: number;
}
export interface AnalyticeCoursePayload {
  name: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
}
export interface AnalyticeCourseOneGetResponse {
  data: AnalyticeCoursePayload;
  message: string;
  responceTime: string;
  status: boolean;
}

export interface AnalyticsCourseUpdatePayload extends AnalyticeCoursePayload {
  id: number;
  index: number;
}
