import { Injectable } from '@angular/core';
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
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Role, RolesGetResponse } from '../../../models/roles';
import { RolesPageActions } from '../action/roles-type';
import { selectRolesList, selectRolesState } from '../selector/roles.selectors';

@Injectable()
export class RolesPageEffects {
  RolesListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesPageActions.loadRolesPage),
      withLatestFrom(this.store.select(selectRolesList)),
      exhaustMap(([type, state]) => {
        return !state
          ? this.productServices
              .get<RolesGetResponse>('/api/Role/?page=1')
              .pipe(
                map(
                  (
                    res: RolesGetResponse
                  ): { Roles: RolesGetResponse; currentPage: number } => {
                    return {
                      currentPage: 1,
                      Roles: res,
                    };
                  }
                ),
                catchError((error) => of({ error }))
              )
          : of(null);
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return RolesPageActions.RolesPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return RolesPageActions.RolesPageLoaded(res);
      })
    )
  );

  RolesNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesPageActions.loadRolesNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectRolesState)),
          map(
            ([payload, Roles]): [
              {
                pagination: number;
              },
              Role[] | undefined
            ] => {
              return [payload, Roles[action.pagination]?.data?.result];
            }
          )
        )
      ),
      exhaustMap(([payload, Roles]) => {
        let url = `/api/Role/?page=${payload.pagination}`;
        return !Roles
          ? this.productServices.get<RolesGetResponse>(url).pipe(
              map(
                (
                  res: RolesGetResponse
                ): {
                  Roles: RolesGetResponse;
                  currentPage: number;
                } => {
                  return {
                    Roles: res,
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
          return RolesPageActions.RolesPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        if (!res.Roles) {
          res = {
            Roles: null,
            currentPage: res.currentPage,
          };
        }
        return RolesPageActions.RolesNextLoaded(res);
      })
    )
  );
  RolesUsSubmitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesPageActions.sumbitRoles),
      exhaustMap((payload) =>
        this.productServices
          .postRequest('/api/Role/', payload.payload)
          .pipe(catchError((error) => of({ error })))
      ),
      map((res) => {
        // this.productServices.formSpinner = false;
        if (!res.error) {
          return RolesPageActions.RolesSubmited({ data: res.data });
        }
        let errorMessage = 'UnKnown Error';
        return RolesPageActions.RolesPageFail({
          error: res.error,
          errorMessage: errorMessage,
        });
      })
    )
  );
  RoleEditEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesPageActions.editRoles),
      concatMap((action) =>
        of(action).pipe(withLatestFrom(this.store.select(selectRolesList)))
      ),
      exhaustMap(([payload]) =>
        this.productServices
          .putRequest<Role>(`/api/Role/${payload.id}/`, payload.payload)
          .pipe(
            map((res): [any, any] => [payload, res]),
            catchError((error) => of({ error }))
          )
      ),
      tap((res: any) => {
        console.log(res);
        // if (res.payload.name === 'admin') {
        //   this.localStorage.setLocal('Permissions', res[1].data.permissions);
        //   this.localStorage.getLocal('Permissions');
        //   window.location.reload();
        // }
      }),
      map((res): any => {
        if (!('error' in res)) {
          const [id, Roles] = res;
          return RolesPageActions.RolesEdited({
            Role: Roles.data,
            RoleId: id.id,
          });
        }
        let errorMessage = 'UnKnown Error';
        if (res.error.status === 400) {
          errorMessage = 'Role is already assigned to the Role';
        }
        return RolesPageActions.RolesPageFail({
          error: res.error,
          errorMessage: errorMessage,
        });
      })
    )
  );
  deleteYourRoleEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesPageActions.deleteYourRole),
      exhaustMap((action) => {
        return this.productServices
          .deleteReq(`/api/Role/${action.RoleId}`)
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
          return RolesPageActions.RolesPageFail({
            error: res.error,
            errorMessage: errorMessage,
          });
        }
        return RolesPageActions.yourRoleDeleted({
          ...res.action,
        });
      })
    )
  );
  constructor(
    private actions$: Actions,
    private productServices: HttpService,
    private store: Store,
    private localStorage: LocalStorageService
  ) {}
}
