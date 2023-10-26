import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { TeacherGetResponse, Teachers } from '../../../models/teachers';
import { TeachersStudentsGetResponse, TeachersStudentss } from '../../../models/teachers-students';



export const loadAllTeacherStudentNext = createAction(
  '[AllTeacherStudentComponent] load  Teacher student next ',
  props<{
    pagination: number;
    id: string | number;
  }>()
);
export const AllTeacherStudentNextLoaded = createAction(
  '[AllTeacherStudentComponent]  all Teacher and student next Loaded',
  props<{
    data: TeachersStudentsGetResponse;
    id: string | number;
    currntPage: number;
  }>()
);
export const loadAllTeacherStudent = createAction(
  '[AllTeacherStudentComponent] load all Teacher student ',
  props<{ id: string }>()
);
export const AllTeacherStudentLoaded = createAction(
  '[AllTeacherStudentComponent]  all Teacher student Loaded',
  props<{ data: TeachersStudentss }>()
);
export const AllTeacherStudentFail = createAction(
  '[TeacherListComponent] Teacher All student  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
// export const AllTeacherStudentUpdated = createAction(
//   '[TeacherEffect]  all Teacher  Updated',
//   props<{ data: TeachersStudentss }>()
// );