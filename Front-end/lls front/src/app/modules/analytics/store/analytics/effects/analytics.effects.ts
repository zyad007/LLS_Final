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
import { Analytice, AnalyticsGetResponse } from '../../../models/analytics';
import { AnalyticsPageActions } from '../action/analytics-type';
import {
  selectAnalyticsList,
  selectAnalyticsState,
} from '../selector/analytics.selectors';

@Injectable()
export class AnalyticsPageEffects {
  AnalyticsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalyticsPageActions.loadAnalyticsPage),
      withLatestFrom(this.store.select(selectAnalyticsList)),
      exhaustMap(([type, state]) => {
        return !state
          ? this.productServices
              .get<AnalyticsGetResponse>('/api/Analytics/Experiment')
              .pipe(
                map(
                  (
                    res: AnalyticsGetResponse
                  ): {
                    Analytics: AnalyticsGetResponse;
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
          return AnalyticsPageActions.AnalyticsPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return AnalyticsPageActions.AnalyticsPageLoaded(res);
      })
    )
  );

  AnalyticsNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalyticsPageActions.loadAnalyticsNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectAnalyticsState)),
          map(
            ([payload, Analytics]): [
              {
                pagination: number;
              },
              Analytice[] | undefined
            ] => {
              return [payload, Analytics[action.pagination]?.data?.result];
            }
          )
        )
      ),
      exhaustMap(([payload, Analytics]) => {
        let url = `/api/Analytics/Experiment/?page=${payload.pagination}`;
        return !Analytics
          ? this.productServices.get<AnalyticsGetResponse>(url).pipe(
              map(
                (
                  res: AnalyticsGetResponse
                ): {
                  Analytics: AnalyticsGetResponse;
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
          return AnalyticsPageActions.AnalyticsPageFail({
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
        return AnalyticsPageActions.AnalyticsNextLoaded(res);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productServices: HttpService,
    private store: Store
  ) {}
}
