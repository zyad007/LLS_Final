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
  AllStudent,
  AllStudentGetResponse,
  AllStudents,
} from '../../../models/all-student';
import { AllStudentsActions } from '../action/all-students-type';
import {
  selectAllStudentsState,
  selectAllStudentUnAssigned,
} from '../selectors/all-students.selectors';

@Injectable()
export class AllStudentsEffects {
  allStudentEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllStudentsActions.loadAllStudent),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(selectAllStudentUnAssigned(action.id))
          )
        )
      ),
      exhaustMap(([payload, Students]) => {
        return this.StudentService.get<AllStudentGetResponse>(
          `/api/User?courseidd=${payload.id}&page=1&role=student`
        ).pipe(
          map(
            (
              res: AllStudentGetResponse
            ): { res: AllStudents; id: string | number } => {
              return {
                res: mapResult(res, payload.id, 1, ''),
                id: payload.id,
              };
            }
          ),
          catchError((error) => of({ error }))
        );
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return AllStudentsActions.AllStudentFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return AllStudentsActions.AllStudentLoaded({
          data: res?.res,
        });
      })
    )
  );
  AllStudentsNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllStudentsActions.loadAllStudentNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectAllStudentsState)),
          map(
            ([payload, Students]): [
              {
                pagination: number;
                id: string | number;
              },
              AllStudent[] | undefined
            ] => {
              return [
                payload,
                Students[action.id][action.pagination]?.data?.result,
              ];
            }
          )
        )
      ),
      exhaustMap(([payload, Students]) => {
        let url = `/api/User?courseidd=${payload.id}&page=${payload.pagination}&role=student`;
        return !Students
          ? this.StudentService.get<AllStudentGetResponse>(url).pipe(
              map(
                (
                  res: AllStudentGetResponse
                ): {
                  data: AllStudentGetResponse;
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
          return AllStudentsActions.AllStudentFail({
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
        return AllStudentsActions.AllStudentNextLoaded(res);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private StudentService: HttpService,
    private store: Store
  ) {}
}
function mapResult(
  res: AllStudentGetResponse,
  key: string | number,
  pageNumber: number,
  message: string
) {
  let ProjectDict: AllStudents = {
    [key]: { [pageNumber]: res, currentPage: pageNumber, message },
  };
  return ProjectDict;
}
