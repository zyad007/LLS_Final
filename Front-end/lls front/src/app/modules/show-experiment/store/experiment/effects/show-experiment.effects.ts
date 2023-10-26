import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  of,
  tap,
  withLatestFrom,
} from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import {
  Experiment,
  ShowExperimentGetResponse,
} from '../../../models/show-experiment';
// import { Experiment } from '../../models/show-experiment';
import { ExperimentsActions } from '../action/show-experiment-type';
import {
  selectExperimentList,
  selectExperimentsShList,
  selectExperimentsShState,
} from '../selector/show-experiment.selectors';

@Injectable()
export class ShExperimentsEffects {
  experimentsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.loadShExperiments),
      withLatestFrom(this.store.select(selectExperimentsShList)),
      exhaustMap(([type, state]) => {
        return !state
          ? this.productServices
              .get<ShowExperimentGetResponse>('/api/Experiment/?page=1')
              .pipe(
                map(
                  (
                    res: ShowExperimentGetResponse
                  ): {
                    ShExperiments: ShowExperimentGetResponse;
                    currentPage: number;
                  } => {
                    return {
                      currentPage: 1,
                      ShExperiments: res,
                    };
                  }
                ),
                catchError((error) => of({ error }))
              )
          : of(null);
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return ExperimentsActions.ShExperimentsFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return ExperimentsActions.ShExperimentsLoaded(res);
      })
    )
  );

  experimentsNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.loadShExperimentsNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectExperimentsShState)),
          map(
            ([payload, Experiments]): [
              {
                pagination: number;
              },
              Experiment[] | undefined
            ] => {
              return [payload, Experiments[action.pagination]?.data?.result];
            }
          )
        )
      ),
      exhaustMap(([payload, Experiments]) => {
        let url = `/api/Experiment?page=${payload.pagination}`;
        return !Experiments
          ? this.productServices.get<ShowExperimentGetResponse>(url).pipe(
              map(
                (
                  res: ShowExperimentGetResponse
                ): {
                  ShExperiments: ShowExperimentGetResponse;
                  currentPage: number;
                } => {
                  return {
                    ShExperiments: res,
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
          return ExperimentsActions.ShExperimentsFail({
            error: res.error,
            errorMessage: '',
          });
        }
        if (!res.ShExperiments) {
          res = {
            ShExperiments: null,
            currentPage: res.currentPage,
          };
        }
        return ExperimentsActions.ShExperimentsNextLoaded(res);
      })
    )
  );
  ExperimentsUsSubmitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.sumbitShExperiments),
      exhaustMap((payload) =>
        this.productServices
          .postRequest('/api/Experiment/', payload.payload)
          .pipe(catchError((error) => of({ error })))
      ),
      tap((res) => {
        // localStorage.setItem('experiment', JSON.stringify(res));
        console.log(res);

        this.router.navigate(['/auth-tool', res.data.idd]);
        // this.router.navigate(['/user/show-ex']);
      }),
      map((res) => {
        // this.productServices.formSpinner = false;
        if (!res.error) {
          return ExperimentsActions.ShExperimentsSubmited({ data: res?.data });
        }
        let errorMessage = 'UnKnown Error';
        return ExperimentsActions.ShExperimentsFail({
          error: res.error,
          errorMessage: errorMessage,
        });
      })
    )
  );
  ExperimentEditEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.editShExperiments),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectExperimentList(action.id)))
        )
      ),
      exhaustMap(([payload]) =>
        this.productServices
          .putRequest<Experiment>(
            `/api/Experiment/${payload.id}/`,
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
          return ExperimentsActions.ShExperimentsEdited({
            Experiment: Experiments.data,
            ExperimentId: id.id,
          });
        }
        let errorMessage = 'UnKnown Error';
        if (res.error.status === 400) {
          errorMessage = 'Experiment is already assigned to the course';
        }
        return ExperimentsActions.ShExperimentsFail({
          error: res.error,
          errorMessage: errorMessage,
        });
      })
    )
  );
  deleteYourExperimentEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentsActions.deleteYourExperiment),
      exhaustMap((action) => {
        return this.productServices
          .deleteReq(`/api/Experiment/${action.ExperimentId}`)
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
          return ExperimentsActions.ShExperimentsFail({
            error: res.error,
            errorMessage: errorMessage,
          });
        }
        return ExperimentsActions.yourExperimentDeleted({
          ...res.action,
        });
      })
    )
  );
  constructor(
    private actions$: Actions,
    private productServices: HttpService,
    private store: Store,
    private router: Router
  ) {}
}
