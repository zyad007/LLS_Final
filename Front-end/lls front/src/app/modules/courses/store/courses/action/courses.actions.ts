import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  Course,
  CoursePayload,
  CoursesGetResponse,
} from '../../../models/courses';

export const loadCoursesPage = createAction(
  '[CoursesPageComponent] load Courses page '
);
export const CoursesPageLoaded = createAction(
  '[CoursesPageComponent] Courses page Loaded',
  props<{ Courses: CoursesGetResponse; currentPage: number }>()
);

export const loadCoursesNext = createAction(
  '[CoursesPageComponent] load Courses next',
  props<{
    pagination: number;
  }>()
);
export const CoursesNextLoaded = createAction(
  '[effect] Courses  next  Loaded',
  props<{
    Courses: CoursesGetResponse;
    currentPage: number;
  }>()
);
export const CoursesPageFail = createAction(
  '[effect] Courses page  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
export const sumbitCourses = createAction(
  '[CoursesComponent] Courses  submit action',
  props<{ payload: CoursePayload }>()
);
export const CoursesSubmited = createAction(
  '[CoursesEffect] Courses  submit data success ',
  props<{ data: Course }>()
);
export const editCourses = createAction(
  '[CoursesComponent] Courses  edit action',
  props<{ payload: CoursePayload; id: string }>()
);
export const CoursesEdited = createAction(
  '[CoursesEffect] Courses  edit data success ',
  props<{ Course: Course; CourseId: string | any }>()
);
export const deleteYourCourse = createAction(
  '[effect] delete your Course ',
  props<{ CourseId: any }>()
);
export const yourCourseDeleted = createAction(
  '[effect]  your Course deleted ',
  props<{ CourseId: any }>()
);
