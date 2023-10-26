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
import { ExperimentDetailsGetResponse } from '../../../models/experiment-details';
import { ExperimentDetailsActions } from '../action/experiment-details-type';
import { selectExperimentDetailsLoaded } from '../selectors/experiment-details.selectors';

@Injectable()
export class ExperimentDetailsEffects {
  ExperimentDetailsEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExperimentDetailsActions.loadExperimentDetail),
      concatMap((action) =>
        of(action.id).pipe(
          withLatestFrom(
            this.store.select(selectExperimentDetailsLoaded(action.id))
          ),
          map(([id, loaded]): [string, boolean] => [id, loaded])
        )
      ),
      exhaustMap(([id, loaded]) =>
        loaded
          ? of([id, null])
          : this.ExperimentServices.get(`/api/Experiment/${id}/`).pipe(
              map((res): [string, ExperimentDetailsGetResponse] => [id, res]),
              catchError((error) => of({ error }))
            )
      ),
      map(([id, ExperimentDetails]: any) => {
        return ExperimentDetailsActions.ExperimentDetailLoaded({
          id,
          ExperimentDetails: ExperimentDetails,
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private ExperimentServices: HttpService,
    private store: Store
  ) {}
}
