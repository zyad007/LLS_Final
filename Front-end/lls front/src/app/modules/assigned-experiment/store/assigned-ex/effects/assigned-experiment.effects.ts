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
  AssignedExperiment,
  AssignedExperimentGetResponse,
} from '../../../models/assigned-experiment';
import { AssignedExperimentActions } from '../action/assigned-experiment-type';
import {
  selectAssignedExperimentList,
  selectAssignedExperimentState,
} from '../selector/assigned-experiment.selectors';

@Injectable()
export class AssignedExperimentEffects {
  AssignedExperimentListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssignedExperimentActions.loadAssignedExperiments),
      withLatestFrom(this.store.select(selectAssignedExperimentList)),
      exhaustMap(([type, state]) => {
        return !state
          ? this.productServices
              .get<AssignedExperimentGetResponse>('/api/Student/Assigned-Experiments/?page=1')
              .pipe(
                map(
                  (
                    res: AssignedExperimentGetResponse
                  ): {
                    AssignedExperiment: AssignedExperimentGetResponse;
                    currentPage: number;
                  } => {
                    return {
                      currentPage: 1,
                      AssignedExperiment: res,
                    };
                  }
                ),
                catchError((error) => of({ error }))
              )
          : of(null);
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return AssignedExperimentActions.AssignedExperimentPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return AssignedExperimentActions.AssignedExperimentPageLoaded(res);
      })
    )
  );

  AssignedExperimentNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssignedExperimentActions.loadAssignedExperimentNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectAssignedExperimentState)),
          map(
            ([payload, AssignedExperiment]): [
              {
                pagination: number;
              },
              AssignedExperiment[] | undefined
            ] => {
              return [
                payload,
                AssignedExperiment[action.pagination]?.data?.result,
              ];
            }
          )
        )
      ),
      exhaustMap(([payload, AssignedExperiment]) => {
        let url = `/api/Student/Assigned-Experiments/?page=${payload.pagination}`;
        return !AssignedExperiment
          ? this.productServices.get<AssignedExperimentGetResponse>(url).pipe(
              map(
                (
                  res: AssignedExperimentGetResponse
                ): {
                  AssignedExperiment: AssignedExperimentGetResponse;
                  currentPage: number;
                } => {
                  return {
                    AssignedExperiment: res,
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
          return AssignedExperimentActions.AssignedExperimentPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        if (!res.AssignedExperiment) {
          res = {
            AssignedExperiment: null,
            currentPage: res.currentPage,
          };
        }
        return AssignedExperimentActions.AssignedExperimentNextLoaded(res);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productServices: HttpService,
    private store: Store
  ) {}
}
