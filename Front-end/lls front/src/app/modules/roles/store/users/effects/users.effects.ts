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
import { User, UsersGetResponse } from '../../../models/users';
import { UsersPageActions } from '../action/users-type';
import { selectUsersList, selectUsersState } from '../selector/users.selectors';

@Injectable()
export class UsersPageEffects {
  UsersListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersPageActions.loadUsersPage),
      withLatestFrom(this.store.select(selectUsersList)),
      exhaustMap(([type, state]) => {
        return !state
          ? this.productServices
              .get<UsersGetResponse>('/api/User/?page=1')
              .pipe(
                map(
                  (
                    res: UsersGetResponse
                  ): { Users: UsersGetResponse; currentPage: number } => {
                    return {
                      currentPage: 1,
                      Users: res,
                    };
                  }
                ),
                catchError((error) => of({ error }))
              )
          : of(null);
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return UsersPageActions.UsersPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return UsersPageActions.UsersPageLoaded(res);
      })
    )
  );

  UsersNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersPageActions.loadUsersNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectUsersState)),
          map(
            ([payload, Users]): [
              {
                pagination: number;
              },
              User[] | undefined
            ] => {
              return [payload, Users[action.pagination]?.data?.result];
            }
          )
        )
      ),
      exhaustMap(([payload, Users]) => {
        let url = `/api/User/?page=${payload.pagination}`;
        return !Users
          ? this.productServices.get<UsersGetResponse>(url).pipe(
              map(
                (
                  res: UsersGetResponse
                ): {
                  Users: UsersGetResponse;
                  currentPage: number;
                } => {
                  return {
                    Users: res,
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
          return UsersPageActions.UsersPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        if (!res.Users) {
          res = {
            Users: null,
            currentPage: res.currentPage,
          };
        }
        return UsersPageActions.UsersNextLoaded(res);
      })
    )
  );
  UsersUsSubmitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersPageActions.sumbitUsers),
      exhaustMap((payload) =>
        this.productServices
          .postRequest('/api/User/', payload.payload)
          .pipe(catchError((error) => of({ error })))
      ),
      map((res) => {
        // this.productServices.formSpinner = false;
        if (!res.error) {
          return UsersPageActions.UsersSubmited({ data: res.data });
        }
        let errorMessage = 'UnKnown Error';
        return UsersPageActions.UsersPageFail({
          error: res.error,
          errorMessage: errorMessage,
        });
      })
    )
  );
  UserEditEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersPageActions.editUsers),
      concatMap((action) =>
        of(action).pipe(withLatestFrom(this.store.select(selectUsersList)))
      ),
      exhaustMap(([payload]) =>
        this.productServices
          .putRequest<User>(`/api/User/${payload.id}/`, payload.payload)
          .pipe(
            map((res): [any, any] => [payload, res]),
            catchError((error) => of({ error }))
          )
      ),
      map((res): any => {
        if (!('error' in res)) {
          const [id, Users] = res;
          console.log(res);

          return UsersPageActions.UsersEdited({
            User: Users.data,
            UserId: id.id,
          });
        }
        let errorMessage = 'UnKnown Error';
        if (res.error.status === 400) {
          errorMessage = 'User is already assigned to the User';
        }
        return UsersPageActions.UsersPageFail({
          error: res.error,
          errorMessage: errorMessage,
        });
      })
    )
  );
  deleteYourUserEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersPageActions.deleteYourUser),
      exhaustMap((action) => {
        return this.productServices
          .deleteReq(`/api/User/${action.UserId}`)
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
          return UsersPageActions.UsersPageFail({
            error: res.error,
            errorMessage: errorMessage,
          });
        }
        return UsersPageActions.yourUserDeleted({
          ...res.action,
        });
      })
    )
  );
  constructor(
    private actions$: Actions,
    private productServices: HttpService,
    private store: Store
  ) {}
}
