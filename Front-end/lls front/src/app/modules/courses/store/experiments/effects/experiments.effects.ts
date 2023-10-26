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
  Experiment,
  ExperimentGetResponse,
  Experiments,
} from '../../../models/experiment';
import { ExperimentActions } from '../action/experiments-type';
import {
  selectExperimentList,
  selectExperimentState,
} from '../selectors/experiments.selectors';

@Injectable()
export class ExperimentPageEffects {
  experimentEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentActions.loadExperimentPage),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectExperimentList(action.id)))
        )
      ),
      exhaustMap(([payload, experiments]) => {
        return !experiments
          ? this.experimentService
              .get<ExperimentGetResponse>(
                `/api/Course/${payload.id}/Experiment?page=1`
              )
              .pipe(
                map(
                  (
                    res: ExperimentGetResponse
                  ): { res: Experiments; id: string | number } => {
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
          return ExperimentActions.ExperimentpageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return ExperimentActions.ExperimentPageLoaded({
          experiments: res?.res,
        });
      })
    )
  );
  experimentNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentActions.loadExperimentNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectExperimentState)),
          map(
            ([payload, experiments]): [
              {
                pagination: number;
                id: string | number;
              },
              Experiment[] | undefined
            ] => {
              return [
                payload,
                experiments[action.id][action.pagination]?.data?.result,
              ];
            }
          )
        )
      ),
      exhaustMap(([payload, experiments]) => {
        let url = `/api/Course/${payload.id}/Experiment/?page=${payload.pagination}`;
        // if (payload.id != 'all') url += `&${payload.filter}=${payload.id}`;
        return !experiments
          ? this.experimentService.get<ExperimentGetResponse>(url).pipe(
              map(
                (
                  res: ExperimentGetResponse
                ): {
                  experiments: ExperimentGetResponse;
                  id: string | number;
                  currntPage: number;
                } => {
                  return {
                    experiments: res,
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
          return ExperimentActions.ExperimentpageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        if (!res.experiments) {
          res = {
            experiments: null,
            id: res.id,
            currntPage: res.currntPage,
          };
        }
        return ExperimentActions.ExperimentNextLoaded(res);
      })
    )
  );
  ExperimentAssignEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentActions.assignExperiment),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(selectExperimentList(action.courseId))
          )
        )
      ),
      exhaustMap(([payload]) =>
        this.experimentService
          .postRequest<any>(
            `/api/Course/${payload.courseId}/Experiment`,
            payload.payload
          )
          .pipe(
            map((res): [any, any] => [payload, res]),
            catchError((error) => of({ error }))
          )
      ),

      map((res): any => {
        if (!('error' in res)) {
          const [id, Experiments] = res;
          return ExperimentActions.Experimentassigned({
            Experiments: Experiments?.data,
            courseId: id?.courseId,
          });
        }
        let errorMessage = 'UnKnown Error';

        if (res.error.status === 400) {
          errorMessage = 'Experiment is already assigned to the course';
        }
        return ExperimentActions.ExperimentpageFail({
          error: res.error,
          errorMessage: errorMessage,
        });
      })
    )
  );
  constructor(
    private actions$: Actions,
    private experimentService: HttpService,
    private store: Store
  ) {}
}
function mapResult(
  res: ExperimentGetResponse,
  key: string | number,
  pageNumber: number
) {
  let ProjectDict: Experiments = {
    [key]: { [pageNumber]: res, currentPage: pageNumber },
  };
  return ProjectDict;
}
