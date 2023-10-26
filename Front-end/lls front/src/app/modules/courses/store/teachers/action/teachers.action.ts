import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  AssignTeacherSuccessResponse,
  Teacher,
  TeacherGetResponse,
  Teachers,
} from '../../../models/teachers';

export const loadTeacherPage = createAction(
  '[TeacherPageComponent] load Teacher page ',
  props<{ id: string }>()
);
export const TeacherPageLoaded = createAction(
  '[TeacherListComponent] Teacher page  Loaded',
  props<{ Teachers: Teachers }>()
);

export const loadTeacherNext = createAction(
  '[TeacherListComponent] load Teacher  next',
  props<{
    pagination: number;
    id: string | number;
  }>()
);
export const TeacherNextLoaded = createAction(
  '[TeacherListComponent] Teacher  next  Loaded',
  props<{
    Teachers: TeacherGetResponse;
    currntPage: number;
    id: string | number;
  }>()
);
export const TeacherpageFail = createAction(
  '[TeacherListComponent] Teacher page  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
export const sumbitTeacher = createAction(
  '[TeacherComponent] Teacher  submit action',
  props<{ courseId: string; userId: string }>()
);
export const TeacherSubmited = createAction(
  '[TeacherEffect] Teacher  submit data success ',
  props<{
    courseId: string;
    Teachers: any;
  }>()
);
