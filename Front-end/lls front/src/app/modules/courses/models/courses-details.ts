import { Course } from './courses';

export interface CourseDetailsGetResponse {
  data: Course;
  loaded: boolean;
  status: boolean;
  responceTime: string;
}
export interface CourseDetailsResponse {
  [key: string]: CourseDetailsGetResponse;
}

