import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { PermissionsGetResponse } from '../../../models/permissions';
import { PermissionsPageActions } from '../action/permissions-type';
import { selectPermissionsList } from '../selector/permissions.selectors';

@Injectable()
export class PermissionsPageEffects {
  PermissionsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionsPageActions.loadPermissionsPage),
      withLatestFrom(this.store.select(selectPermissionsList)),
      exhaustMap(([type, state]) => {
        return !state
          ? this.productServices
              .get<PermissionsGetResponse>('/api/Role/All-Permissions/?page=1')
              .pipe(
                map(
                  (
                    res: PermissionsGetResponse
                  ): {
                    Permissions: PermissionsGetResponse;
                    currentPage: number;
                  } => {
                    return {
                      currentPage: 1,
                      Permissions: res,
                    };
                  }
                ),
                catchError((error) => of({ error }))
              )
          : of(null);
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return PermissionsPageActions.PermissionsPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        console.log(res);

        return PermissionsPageActions.PermissionsPageLoaded(res);
      })
    )
  );

  // PermissionsNextEffect$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(PermissionsPageActions.loadPermissionsNext),
  //     concatMap((action) =>
  //       of(action).pipe(
  //         withLatestFrom(this.store.select(selectPermissionsState)),
  //         map(
  //           ([payload, Permissions]): [
  //             {
  //               pagination: number;
  //             },
  //             [] | undefined
  //           ] => {
  //             return [payload, Permissions[action.pagination]?.data];
  //           }
  //         )
  //       )
  //     ),
  //     exhaustMap(([payload, Permissions]) => {
  //       let url = `/api/Role/All-Permissions/?page=${payload.pagination}`;
  //       return !Permissions
  //         ? this.productServices.get<PermissionsGetResponse>(url).pipe(
  //             map(
  //               (
  //                 res: PermissionsGetResponse
  //               ): {
  //                 Permissions: PermissionsGetResponse;
  //                 currentPage: number;
  //               } => {
  //                 return {
  //                   Permissions: res,
  //                   currentPage: payload.pagination,
  //                 };
  //               }
  //             ),
  //             catchError((error) => of({ error }))
  //           )
  //         : of({ currentPage: payload.pagination });
  //     }),
  //     map((res: any) => {
  //       if (res && 'error' in res) {
  //         return PermissionsPageActions.PermissionsPageFail({
  //           error: res.error,
  //           errorMessage: '',
  //         });
  //       }
  //       if (!res.Permissions) {
  //         res = {
  //           Permissions: null,
  //           currentPage: res.currentPage,
  //         };
  //       }
  //       return PermissionsPageActions.PermissionsNextLoaded(res);
  //     })
  //   )
  // );
  // PermissionsUsSubmitEffect$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(PermissionsPageActions.sumbitPermissions),
  //     exhaustMap((payload) =>
  //       this.productServices
  //         .postRequest('/api/Permission/', payload.payload)
  //         .pipe(catchError((error) => of({ error })))
  //     ),
  //     map((res) => {
  //       // this.productServices.formSpinner = false;
  //       if (!res.error) {
  //         return PermissionsPageActions.PermissionsPageLoaded(res);
  //       }
  //       let errorMessage = 'UnKnown Error';
  //       return PermissionsPageActions.PermissionsPageFail({
  //         error: res.error,
  //         errorMessage: errorMessage,
  //       });
  //     })
  //   )
  // );
  // PermissionEditEffect$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(PermissionsPageActions.editPermissions),
  //     concatMap((action) =>
  //       of(action).pipe(
  //         withLatestFrom(this.store.select(selectPermissionsList))
  //       )
  //     ),
  //     exhaustMap(([payload]) =>
  //       this.productServices
  //         .putRequest<Permission>(
  //           `/api/Permission/${payload.id}/`,
  //           payload.payload
  //         )
  //         .pipe(
  //           map((res): [any, any] => [payload, res]),
  //           catchError((error) => of({ error }))
  //         )
  //     ),
  //     map((res): any => {
  //       if (!('error' in res)) {
  //         const [id, Permissions] = res;
  //         return PermissionsPageActions.PermissionsEdited({
  //           Permission: Permissions.data,
  //           PermissionId: id.id,
  //         });
  //       }
  //       let errorMessage = 'UnKnown Error';
  //       if (res.error.status === 400) {
  //         errorMessage = 'Permission is already assigned to the Permission';
  //       }
  //       return PermissionsPageActions.PermissionsPageFail({
  //         error: res.error,
  //         errorMessage: errorMessage,
  //       });
  //     })
  //   )
  // );
  // deleteYourPermissionEffects$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(PermissionsPageActions.deleteYourPermission),
  //     exhaustMap((action) => {
  //       return this.productServices
  //         .deleteReq(`/api/Permission/?idd=${action.PermissionId}`)
  //         .pipe(
  //           map((res) => {
  //             return {
  //               res,
  //               action,
  //             };
  //           }),
  //           catchError((error) => of({ error }))
  //         );
  //     }),
  //     map((res) => {
  //       if ('error' in res) {
  //         let errorMessage = 'UnKnown Error';
  //         return PermissionsPageActions.PermissionsPageFail({
  //           error: res.error,
  //           errorMessage: errorMessage,
  //         });
  //       }
  //       return PermissionsPageActions.yourPermissionDeleted({
  //         ...res.action,
  //       });
  //     })
  //   )
  // );
  constructor(
    private actions$: Actions,
    private productServices: HttpService,
    private store: Store
  ) {}
}
