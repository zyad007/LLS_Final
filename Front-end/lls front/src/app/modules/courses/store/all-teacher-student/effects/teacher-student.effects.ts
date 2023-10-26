import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  of,
  withLatestFrom,
} from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import {
  Teacher,
  TeacherGetResponse,
  Teachers,
} from '../../../models/teachers';
import { TeachersStudentsGetResponse, TeachersStudentss, TeacherStudent } from '../../../models/teachers-students';
import { TeacherStudentActions } from '../action/teacher-student-type';
import { selectTeacherListStudentList, selectTeacherStudentState } from '../selectors/teacher-student.selectors';


@Injectable()
export class TeacherStudentEffects {
  teacherStudentEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherStudentActions.loadAllTeacherStudent),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectTeacherListStudentList(action.id)))
        )
      ),
      // User?page=1&role=teacher
      exhaustMap(([payload, Teachers]) => {
        return !Teachers
          ? this.TeacherService.get<TeachersStudentsGetResponse>(
              `/api/User?courseidd=${payload.id}&page=1&role=teacher`
            ).pipe(
              map(
                (
                  res: TeachersStudentsGetResponse
                ): { res: TeachersStudentss; id: string | number } => {
                  return {
                    res: mapResult(res, payload.id, 1, ''),
                    id: payload.id,
                  };
                }
              ),
              catchError((error) => of({ error }))
            )
          : of(null);
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return TeacherStudentActions.AllTeacherStudentFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return TeacherStudentActions.AllTeacherStudentLoaded({
          data: res?.res,
        });
      })
    )
  );
  TeacherStudentNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherStudentActions.loadAllTeacherStudentNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectTeacherStudentState)),
          map(
            ([payload, TeachersStudents]): [
              {
                pagination: number;
                id: string | number;
              },
              TeacherStudent[] | undefined
            ] => {
              return [
                payload,
                TeachersStudents[action.id][action.pagination]?.data?.result,
              ];
            }
          )
        )
      ),
      exhaustMap(([payload, TeachersStudents]) => {
        let url = `/api/User?courseidd=${payload.id}&page=${payload.pagination}&role=teacher`;
        return !TeachersStudents
          ? this.TeacherService.get<TeachersStudentsGetResponse>(url).pipe(
              map(
                (
                  res: TeachersStudentsGetResponse
                ): {
                  data: TeachersStudentsGetResponse;
                  id: string | number;
                  currntPage: number;
                } => {
                  return {
                    data: res,
                    id: payload.id,
                    currntPage: payload.pagination,
                  };
                }
              ),
              catchError((error) => of({ error }))
            )
          : of({ id: payload.id, currntPage: payload.pagination });
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return TeacherStudentActions.AllTeacherStudentFail({
            error: res.error,
            errorMessage: '',
          });
        }
        if (!res.data) {
          res = {
            data: null,
            id: res.id,
            currntPage: res.currntPage,
          };
        }
        return TeacherStudentActions.AllTeacherStudentNextLoaded(res);
      })
    )
  );
 
  constructor(
    private actions$: Actions,
    private TeacherService: HttpService,
    private store: Store
  ) {}
}
function mapResult(
  res: TeachersStudentsGetResponse,
  key: string | number,
  pageNumber: number,
  message: string
) {
  let ProjectDict: TeachersStudentss = {
    [key]: { [pageNumber]: res, currentPage: pageNumber, message },
  };
  return ProjectDict;
}
