import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  Student,
  StudentGetResponse,
  Students,
} from '../../../models/students';

export const loadStudentPage = createAction(
  '[StudentPageComponent] load Student page ',
  props<{ id: string }>()
);
export const StudentPageLoaded = createAction(
  '[StudentListComponent] Student page  Loaded',
  props<{ Students: Students }>()
);

export const loadStudentNext = createAction(
  '[StudentListComponent] load Student  next',
  props<{
    pagination: number;
    id: string | number;
  }>()
);
export const StudentNextLoaded = createAction(
  '[StudentListComponent] Student  next  Loaded',
  props<{
    Students: StudentGetResponse;
    id: string | number;
    currntPage: number;
  }>()
);
export const StudentpageFail = createAction(
  '[StudentListComponent] Student page  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);

export const sumbitStudent = createAction(
  '[StudentComponent] Student  submit action',
  props<{ courseId: string; userIdds: any }>()
);
export const StudentSubmited = createAction(
  '[StudentEffect] Student  submit data success ',
  props<{
    courseId: string;
    Students: Student[];
  }>()
);
