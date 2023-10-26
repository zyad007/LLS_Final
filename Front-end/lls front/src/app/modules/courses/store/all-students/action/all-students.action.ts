import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AllStudentGetResponse, AllStudents } from '../../../models/all-student';
export const loadAllStudentNext = createAction(
  '[AllStudentComponent] load  AllStudent next ',
  props<{
    pagination: number;
    id: string | number;
  }>()
);
export const AllStudentNextLoaded = createAction(
  '[AllStudentComponent]  all AllStudent next Loaded',
  props<{
    data: AllStudentGetResponse;
    id: string | number;
    currntPage: number;
  }>()
);
export const loadAllStudent = createAction(
  '[AllStudentComponent] load all AllStudent ',
  props<{ id: string }>()
);
export const AllStudentLoaded = createAction(
  '[AllStudentComponent]  all AllStudent Loaded',
  props<{ data: AllStudents }>()
);
export const AllStudentFail = createAction(
  '[TeacherListComponent] Teacher All student  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
// export const AllStudentUpdated = createAction(
//   '[TeacherEffect]  all Teacher  Updated',
//   props<{ data: AllStudent }>()
// );
