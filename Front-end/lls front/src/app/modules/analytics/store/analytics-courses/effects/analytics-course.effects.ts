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
  AnalyticeCourse,
  AnalyticsCourseGetResponse,
} from '../../../models/analytics-course';
import { AnalyticsCourseActions } from '../action/analytics-course-type';
import {
  selectAnalyticsCourseList,
  selectAnalyticsCourseState,
} from '../selector/analytics-course.selectors';

@Injectable()
export class AnalyticsCourseEffects {
  AnalyticsCourseListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalyticsCourseActions.loadAnalyticsCourse),
      withLatestFrom(this.store.select(selectAnalyticsCourseList)),
      exhaustMap(([type, state]) => {
        return !state
          ? this.productServices
              .get<AnalyticsCourseGetResponse>('/api/Analytics/Course')
              .pipe(
                map(
                  (
                    res: AnalyticsCourseGetResponse
                  ): {
                    Analytics: AnalyticsCourseGetResponse;
                    currentPage: number;
                  } => {
                    return {
                      currentPage: 1,
                      Analytics: res,
                    };
                  }
                ),
                catchError((error) => of({ error }))
              )
          : of(null);
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return AnalyticsCourseActions.AnalyticsCourseFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return AnalyticsCourseActions.AnalyticsCourseLoaded(res);
      })
    )
  );

  AnalyticsNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalyticsCourseActions.loadAnalyticsCourseNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectAnalyticsCourseState)),
          map(
            ([payload, Analytics]): [
              {
                pagination: number;
              },
              AnalyticeCourse[] | undefined
            ] => {
              return [payload, Analytics[action.pagination]?.data?.result];
            }
          )
        )
      ),
      exhaustMap(([payload, Analytics]) => {
        let url = `/api/Analytics/Course/?page=${payload.pagination}`;
        return !Analytics
          ? this.productServices.get<AnalyticsCourseGetResponse>(url).pipe(
              map(
                (
                  res: AnalyticsCourseGetResponse
                ): {
                  Analytics: AnalyticsCourseGetResponse;
                  currentPage: number;
                } => {
                  return {
                    Analytics: res,
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
          return AnalyticsCourseActions.AnalyticsCourseFail({
            error: res.error,
            errorMessage: '',
          });
        }
        if (!res.Analytics) {
          res = {
            Analytics: null,
            currentPage: res.currentPage,
          };
        }
        return AnalyticsCourseActions.AnalyticsCourseNextLoaded(res);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productServices: HttpService,
    private store: Store
  ) {}
}
