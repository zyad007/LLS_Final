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
import { AnalyticDetailsGetResponse } from '../../../models/analytics-ero';
import { AnalyticDetailsActions } from '../action/analtics-ero-type';
import { selectAnalyticDetailsLoaded } from '../selectors/analtics-ero.selectors';

@Injectable()
export class AnalyticDetailsEffects {
  AnalyticDetailsEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalyticDetailsActions.loadAnalyticDetail),
      concatMap((action) =>
        of(action.id).pipe(
          withLatestFrom(
            this.store.select(selectAnalyticDetailsLoaded(action.id))
          ),
          map(([id, loaded]): [string, boolean] => [id, loaded])
        )
      ),
      exhaustMap(([id, loaded]) =>
        loaded
          ? of([id, null])
          : this.AnalyticServices.get(`/api/Analytics/ERO/?expIdd=${id}`).pipe(
              map((res): [string, AnalyticDetailsGetResponse] => [id, res]),
              catchError((error) => of({ error }))
            )
      ),
      map(([id, AnalyticDetails]: any) => {
        return AnalyticDetailsActions.AnalyticDetailLoaded({
          id,
          AnalyticDetails: AnalyticDetails,
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private AnalyticServices: HttpService,
    private store: Store
  ) {}
}
