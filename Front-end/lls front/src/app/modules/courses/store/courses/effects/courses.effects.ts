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
import { Course, CoursesGetResponse } from '../../../models/courses';
import { CoursesPageActions } from '../action/course-type';
import {
  selectCoursesList,
  selectCoursesState,
} from '../selector/courses.selectors';

@Injectable()
export class CoursesPageEffects {
  coursesListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesPageActions.loadCoursesPage),
      withLatestFrom(this.store.select(selectCoursesList)),
      exhaustMap(([type, state]) => {
        return !state
          ? this.productServices
              .get<CoursesGetResponse>('/api/Course/?page=1')
              .pipe(
                map(
                  (
                    res: CoursesGetResponse
                  ): { Courses: CoursesGetResponse; currentPage: number } => {
                    return {
                      currentPage: 1,
                      Courses: res,
                    };
                  }
                ),
                catchError((error) => of({ error }))
              )
          : of(null);
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return CoursesPageActions.CoursesPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return CoursesPageActions.CoursesPageLoaded(res);
      })
    )
  );

  CoursesNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesPageActions.loadCoursesNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectCoursesState)),
          map(
            ([payload, Courses]): [
              {
                pagination: number;
              },
              Course[] | undefined
            ] => {
              return [payload, Courses[action.pagination]?.data?.result];
            }
          )
        )
      ),
      exhaustMap(([payload, Courses]) => {
        let url = `/api/Course/?page=${payload.pagination}`;
        return !Courses
          ? this.productServices.get<CoursesGetResponse>(url).pipe(
              map(
                (
                  res: CoursesGetResponse
                ): {
                  Courses: CoursesGetResponse;
                  currentPage: number;
                } => {
                  return {
                    Courses: res,
                    currentPage: payload.pagination,
                  };
                }
              ),
              catchError((error) => of({ error }))
            )
          : of({ currentPage: payload.pagination });
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return CoursesPageActions.CoursesPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        if (!res.Courses) {
          res = {
            Courses: null,
            currentPage: res.currentPage,
          };
        }
        return CoursesPageActions.CoursesNextLoaded(res);
      })
    )
  );
  CoursesUsSubmitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesPageActions.sumbitCourses),
      exhaustMap((payload) =>
        this.productServices
          .postRequest('/api/Course/', payload.payload)
          .pipe(catchError((error) => of({ error })))
      ),
      map((res) => {
        // this.productServices.formSpinner = false;
        if (!res.error) {
          return CoursesPageActions.CoursesSubmited({ data: res.data });
        }
        let errorMessage = 'UnKnown Error';
        return CoursesPageActions.CoursesPageFail({
          error: res.error,
          errorMessage: errorMessage,
        });
      })
    )
  );
  CourseEditEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesPageActions.editCourses),
      concatMap((action) =>
        of(action).pipe(withLatestFrom(this.store.select(selectCoursesList)))
      ),
      exhaustMap(([payload]) =>
        this.productServices
          .putRequest<Course>(`/api/Course/${payload.id}/`, payload.payload)
          .pipe(
            map((res): [any, any] => [payload, res]),
            catchError((error) => of({ error }))
          )
      ),
      map((res): any => {
        if (!('error' in res)) {
          const [id, Courses] = res;
          return CoursesPageActions.CoursesEdited({
            Course: Courses.data,
            CourseId: id.id,
          });
        }
        let errorMessage = 'UnKnown Error';
        if (res.error.status === 400) {
          errorMessage = 'Course is already assigned to the course';
        }
        return CoursesPageActions.CoursesPageFail({
          error: res.error,
          errorMessage: errorMessage,
        });
      })
    )
  );
  deleteYourCourseEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesPageActions.deleteYourCourse),
      exhaustMap((action) => {
        return this.productServices
          .deleteReq(`/api/Course/${action.CourseId}`)
          .pipe(
            map((res) => {
              return {
                res,
                action,
              };
            }),
            catchError((error) => of({ error }))
          );
      }),
      map((res) => {
        if ('error' in res) {
          let errorMessage = 'UnKnown Error';
          return CoursesPageActions.CoursesPageFail({
            error: res.error,
            errorMessage: errorMessage,
          });
        }
        return CoursesPageActions.yourCourseDeleted({
          ...res.action,
        });
      })
    )
  );
  constructor(
    private actions$: Actions,
    private productServices: HttpService,
    private store: Store
  ) {}
}
