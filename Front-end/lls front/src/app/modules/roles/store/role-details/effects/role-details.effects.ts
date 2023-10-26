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
import { RoleDetailsGetResponse } from '../../../models/role-details';
import { RoleDetailsActions } from '../action/role-details-type';
import { selectRoleDetailsLoaded } from '../selectors/role-details.selectors';

@Injectable()
export class RoleDetailsEffects {
  RoleDetailsEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleDetailsActions.loadRoleDetail),
      concatMap((action) =>
        of(action.id).pipe(
          withLatestFrom(this.store.select(selectRoleDetailsLoaded(action.id))),
          map(([id, loaded]): [string, boolean] => [id, loaded])
        )
      ),
      exhaustMap(([id, loaded]) =>
        loaded
          ? of([id, null])
          : this.RoleServices.get(`/api/Role/${id}`).pipe(
              map((res): [string, RoleDetailsGetResponse] => [id, res]),
              catchError((error) => of({ error }))
            )
      ),
      map(([id, RoleDetails]: any) => {
        return RoleDetailsActions.RoleDetailLoaded({
          id,
          RoleDetails: RoleDetails,
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private RoleServices: HttpService,
    private store: Store
  ) {}
}
