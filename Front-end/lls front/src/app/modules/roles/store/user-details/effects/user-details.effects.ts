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
import { UserDetailsGetResponse } from '../../../models/user-details';
import { UserDetailsActions } from '../action/user-details-type';
import { selectUserDetailsLoaded } from '../selectors/user-details.selectors';

@Injectable()
export class UserDetailsEffects {
  UserDetailsEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDetailsActions.loadUserDetail),
      concatMap((action) =>
        of(action.id).pipe(
          withLatestFrom(this.store.select(selectUserDetailsLoaded(action.id))),
          map(([id, loaded]): [string, boolean] => [id, loaded])
        )
      ),
      exhaustMap(([id, loaded]) =>
        loaded
          ? of([id, null])
          : this.UserServices.get(`/api/User/${id}`).pipe(
              map((res): [string, UserDetailsGetResponse] => [id, res]),
              catchError((error) => of({ error }))
            )
      ),
      map(([id, UserDetails]: any) => {
        return UserDetailsActions.UserDetailLoaded({
          id,
          UserDetails: UserDetails,
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private UserServices: HttpService,
    private store: Store
  ) {}
}
