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
  GradeBookGetResponse,
  GradingBook,
  GradingOnePage,
} from '../../../models/grade-book';
import { GradingActions } from '../action/grade-book-type';
import {
  selectGradingList,
  selectGradingState,
} from '../selector/grade-book.selectors';

@Injectable()
export class GradingPageEffects {
  GradingEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GradingActions.loadGradingPage),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectGradingList(action.idd)))
        )
      ),
      exhaustMap(([payload, Gradings]) => {
        return !Gradings
          ? this.GradingService.get<GradeBookGetResponse>(
              `/api/Course/${payload.idd}/Experiment/${payload.expIdd}/Grade-Book?page=1`
            ).pipe(
              map(
                (
                  res: GradeBookGetResponse
                ): { res: GradingOnePage; id: string | number } => {
                  return {
                    res: mapResult(res, payload.idd, 1),
                    id: payload.idd,
                  };
                }
              ),
              catchError((error) => of({ error }))
            )
          : of(null);
      }),
      map((res: any) => {
        if (res && 'error' in res) {
          return GradingActions.GradingPageFail({
            error: res.error,
            errorMessage: '',
          });
        }

        return GradingActions.GradingPageLoaded({
          Grading: res?.res,
        });
      })
    )
  );
  GradingNextEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GradingActions.loadGradingNext),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(selectGradingState)),
          map(
            ([payload, Gradings]): [
              {
                pagination: number;
                id: string | number;
                expIdd: string;
              },
              GradingBook[] | undefined
            ] => {
              return [
                payload,
                Gradings[action.expIdd][action.pagination]?.data?.result,
              ];
            }
          )
        )
      ),
      exhaustMap(([payload, Gradings]) => {
        let url = `/api/Course/${payload.id}/Experiment/${payload.expIdd}/Grade-Book/?page=${payload.pagination}`;
        // if (payload.id != 'all') url += `&${payload.filter}=${payload.id}`;
        return !Gradings
          ? this.GradingService.get<GradeBookGetResponse>(url).pipe(
              map(
                (
                  res: GradeBookGetResponse
                ): {
                  Gradings: GradeBookGetResponse;
                  id: string | number;
                  currntPage: number;
                  expIdd: string;
                } => {
                  return {
                    Gradings: res,
                    id: payload.id,
                    expIdd: payload.expIdd,
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
          return GradingActions.GradingPageFail({
            error: res.error,
            errorMessage: '',
          });
        }
        if (!res.Gradings) {
          res = {
            Gradings: null,
            id: res.id,
            expIdd: res.expIdd,
            currntPage: res.currntPage,
          };
        }
        return GradingActions.GradingNextLoaded(res);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private GradingService: HttpService,
    private store: Store
  ) {}
}
function mapResult(
  res: GradeBookGetResponse,
  key: string | number,
  pageNumber: number
) {
  let ProjectDict: GradingOnePage = {
    [key]: { [pageNumber]: res, currentPage: pageNumber },
  };
  return ProjectDict;
}
