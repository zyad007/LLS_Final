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
import { CompletedExperiment, CompletedExperimentGetResponse } from '../../models/completed-experiment';
import { CompletedExperimentActions } from '../action/completed-experiment-type';
import { selectCompletedExperimentList, selectCompletedExperimentState } from '../selector/completed-experiment.selectors';

@Injectable()
export class CompletedExperimentEffects {
  CompletedExperimentListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompletedExperimentActions.loadCompletedExperiments),
      withLatestFrom(this.store.select(selectCompletedExperimentList)),
      exhaustMap(([type, state]) => {
        return !state
          ? this.productServices
              .get<CompletedExperimentGetResponse>(
                '/api/Student/Completed-Experiments/?page=1'
              )
              .pipe(
                map(
                  (
                    res: CompletedExperimentGetResponse
                  ): {
                    CompletedExperiment: CompletedExperimentGetResponse;
                    currentPage: number;
                  } => {
                    return {
                      currentPage: 1,
                      CompletedExperiment: res,
                    };
                  }
                ),
                catchError((error) => of({ error }))
              )
          : of(null);
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return CompletedExperimentActions.CompletedExperimentPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return CompletedExperimentActions.CompletedExperimentPageLoaded(res);
      })
    )
  );

  CompletedExperimentNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompletedExperimentActions.loadCompletedExperimentNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectCompletedExperimentState)),
          map(
            ([payload, CompletedExperiment]): [
              {
                pagination: number;
              },
              CompletedExperiment[] | undefined
            ] => {
              return [
                payload,
                CompletedExperiment[action.pagination]?.data?.result,
              ];
            }
          )
        )
      ),
      exhaustMap(([payload, CompletedExperiment]) => {
        let url = `/api/Student/Completed-Experiments/?page=${payload.pagination}`;
        return !CompletedExperiment
          ? this.productServices.get<CompletedExperimentGetResponse>(url).pipe(
              map(
                (
                  res: CompletedExperimentGetResponse
                ): {
                  CompletedExperiment: CompletedExperimentGetResponse;
                  currentPage: number;
                } => {
                  return {
                    CompletedExperiment: res,
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
          return CompletedExperimentActions.CompletedExperimentPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        if (!res.CompletedExperiment) {
          res = {
            CompletedExperiment: null,
            currentPage: res.currentPage,
          };
        }
        return CompletedExperimentActions.CompletedExperimentNextLoaded(res);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productServices: HttpService,
    private store: Store
  ) {}
}
