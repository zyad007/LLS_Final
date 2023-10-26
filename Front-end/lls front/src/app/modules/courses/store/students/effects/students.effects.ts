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
  AssignStudentSuccessResponse,
  Student,
  StudentGetResponse,
  Students,
} from '../../../models/students';
import { StudentActions } from '../action/students-type';
import {
  selectStudentList,
  selectStudentState,
} from '../selectors/students.selectors';

@Injectable()
export class StudentPageEffects {
  studentEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.loadStudentPage),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectStudentList(action.id)))
        )
      ),
      exhaustMap(([payload, Students]) => {
        return !Students
          ? this.StudentService.get<StudentGetResponse>(
              `/api/Course/${payload.id}/Students?page=1`
            ).pipe(
              map(
                (
                  res: StudentGetResponse
                ): { res: Students; id: string | number } => {
                  return {
                    res: mapResult(res, payload.id, 1),
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
          return StudentActions.StudentpageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return StudentActions.StudentPageLoaded({
          Students: res?.res,
        });
      })
    )
  );
  StudentNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.loadStudentNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectStudentState)),
          map(
            ([payload, Students]): [
              {
                pagination: number;
                id: string | number;
              },
              Student[] | undefined
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
        let url = `/api/Course/${payload.id}/Students/?page=${payload.pagination}`;
        // if (payload.id != 'all') url += `&${payload.filter}=${payload.id}`;
        return !Students
          ? this.StudentService.get<StudentGetResponse>(url).pipe(
              map(
                (
                  res: StudentGetResponse
                ): {
                  Students: StudentGetResponse;
                  id: string | number;
                  currntPage: number;
                } => {
                  return {
                    Students: res,
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
          return StudentActions.StudentpageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        if (!res.Students) {
          res = {
            Students: null,
            id: res.id,
            currntPage: res.currntPage,
          };
        }
        return StudentActions.StudentNextLoaded(res);
      })
    )
  );
  StudentSubmitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.sumbitStudent),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectStudentList(action.courseId)))
        )
      ),
      exhaustMap(([payload]) =>
        this.StudentService.postRequest<AssignStudentSuccessResponse>(
          `/api/Course/${payload.courseId}/Students`,
          payload.userIdds
        ).pipe(
          map((res): [any, AssignStudentSuccessResponse] => [payload, res]),
          catchError((error) => of({ error }))
        )
      ),
      // tap((res): any => {
      //   if (!('error' in res)) {
      //     const [payload, data] = res;
      //     this.store.dispatch(loadAllStudentStudent({ id: payload?.courseId }));
      //   }
      // }),
      map((res): any => {
        if (!('error' in res)) {
          // const [id, Students] = res;
          let Students: any = res[1];
          let course: any = res[0];

          Students = Students.map((student: any) => student.data);
          return StudentActions.StudentSubmited({
            Students: Students,
            courseId: course.courseId,
          });
        }
        let errorMessage = 'UnKnown Error';
        if (res.error.status === 400) {
          errorMessage = 'Student is already assigned to the course';
        }
        return StudentActions.StudentpageFail({
          error: res.error,
          errorMessage: errorMessage,
        });
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
  res: StudentGetResponse,
  key: string | number,
  pageNumber: number
) {
  let ProjectDict: Students = {
    [key]: { [pageNumber]: res, currentPage: pageNumber },
  };
  return ProjectDict;
}
