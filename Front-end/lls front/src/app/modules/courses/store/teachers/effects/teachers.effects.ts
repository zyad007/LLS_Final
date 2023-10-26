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
  AssignTeacherSuccessResponse,
  Teacher,
  TeacherGetResponse,
  Teachers,
} from '../../../models/teachers';
import { TeacherActions } from '../action/teachers-type';
import {
  selectTeacherList,
  selectTeacherState,
} from '../selectors/teachers.selectors';

@Injectable()
export class TeacherPageEffects {
  teacherEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActions.loadTeacherPage),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectTeacherList(action.id)))
        )
      ),
      exhaustMap(([payload, Teachers]) => {
        return !Teachers
          ? this.TeacherService.get<TeacherGetResponse>(
              `/api/Course/${payload.id}/Teacher?page=1`
            ).pipe(
              map(
                (
                  res: TeacherGetResponse
                ): { res: Teachers; id: string | number } => {
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
          return TeacherActions.TeacherpageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return TeacherActions.TeacherPageLoaded({
          Teachers: res?.res,
        });
      })
    )
  );
  TeacherNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActions.loadTeacherNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectTeacherState)),
          map(
            ([payload, Teachers]): [
              {
                pagination: number;
                id: string | number;
              },
              Teacher[] | undefined
            ] => {
              return [
                payload,
                Teachers[action.id][action.pagination]?.data?.result,
              ];
            }
          )
        )
      ),
      exhaustMap(([payload, Teachers]) => {
        let url = `/api/Course/${payload.id}/Teacher/?page=${payload.pagination}`;
        return !Teachers
          ? this.TeacherService.get<TeacherGetResponse>(url).pipe(
              map(
                (
                  res: TeacherGetResponse
                ): {
                  Teachers: TeacherGetResponse;
                  id: string | number;
                  currntPage: number;
                } => {
                  return {
                    Teachers: res,
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
          return TeacherActions.TeacherpageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        if (!res.Teachers) {
          res = {
            Teachers: null,
            id: res.id,
            currntPage: res.currntPage,
          };
        }
        return TeacherActions.TeacherNextLoaded(res);
      })
    )
  );
  TeacherSubmitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActions.sumbitTeacher),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectTeacherList(action.courseId)))
        )
      ),
      exhaustMap(([payload]) =>
        this.TeacherService.postRequest<AssignTeacherSuccessResponse>(
          `/api/Course/${payload.courseId}/Teacher?userIdd=${payload.userId}`,
          {}
        ).pipe(
          map((res): [any, AssignTeacherSuccessResponse] => [payload, res]),
          catchError((error) => of({ error }))
        )
      ),
      // tap((res): any => {
      //   if (!('error' in res)) {
      //     const [payload, data] = res;
      //     this.store.dispatch(loadAllTeacherStudent({ id: payload?.courseId }));
      //   }
      // }),
      map((res): any => {
        if (!('error' in res)) {
          const [id, Teachers] = res;
          return TeacherActions.TeacherSubmited({
            Teachers: Teachers?.data,
            courseId: id?.courseId,
          });
        }
        let errorMessage = 'UnKnown Error';
        if (res.error.status === 400) {
          errorMessage = 'Teacher is already assigned to the course';
        }
        return TeacherActions.TeacherpageFail({
          error: res.error,
          errorMessage: errorMessage,
        });
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
  res: TeacherGetResponse,
  key: string | number,
  pageNumber: number
) {
  let ProjectDict: Teachers = {
    [key]: { [pageNumber]: res, currentPage: pageNumber },
  };
  return ProjectDict;
}
