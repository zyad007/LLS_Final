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
import { Lab, LabsGetResponse } from '../../../models/lab';
import { LabsPageActions } from '../action/lab-type';
import { selectLabsList, selectLabsState } from '../selector/lab.selectors';

@Injectable()
export class LabsPageEffects {
  LabsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LabsPageActions.loadLabsPage),
      withLatestFrom(this.store.select(selectLabsList)),
      exhaustMap(([type, state]) => {
        return !state
          ? this.productServices
              .get<LabsGetResponse>('/api/Active-Lab/?page=1')
              .pipe(
                map(
                  (
                    res: LabsGetResponse
                  ): { Labs: LabsGetResponse; currentPage: number } => {
                    return {
                      currentPage: 1,
                      Labs: res,
                    };
                  }
                ),
                catchError((error) => of({ error }))
              )
          : of(null);
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return LabsPageActions.LabsPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        return LabsPageActions.LabsPageLoaded(res);
      })
    )
  );

  LabsNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LabsPageActions.loadLabsNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectLabsState)),
          map(
            ([payload, Labs]): [
              {
                pagination: number;
              },
              Lab[] | undefined
            ] => {
              return [payload, Labs[action.pagination]?.data?.result];
            }
          )
        )
      ),
      exhaustMap(([payload, Labs]) => {
        let url = `/api/Active-Lab/?page=${payload.pagination}`;
        return !Labs
          ? this.productServices.get<LabsGetResponse>(url).pipe(
              map(
                (
                  res: LabsGetResponse
                ): {
                  Labs: LabsGetResponse;
                  currentPage: number;
                } => {
                  return {
                    Labs: res,
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
          return LabsPageActions.LabsPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        if (!res.Labs) {
          res = {
            Labs: null,
            currentPage: res.currentPage,
          };
        }
        return LabsPageActions.LabsNextLoaded(res);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productServices: HttpService,
    private store: Store
  ) {}
}
