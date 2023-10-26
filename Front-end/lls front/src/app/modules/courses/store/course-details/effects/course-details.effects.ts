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
import { CourseDetailsGetResponse } from '../../../models/courses-details';
import { CourseDetailsActions } from '../action/course-details-type';
import { selectCourseDetailsLoaded } from '../selectors/course-details.selectors';

@Injectable()
export class CourseDetailsEffects {
  CourseDetailsEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseDetailsActions.loadCourseDetail),
      concatMap((action) =>
        of(action.id).pipe(
          withLatestFrom(this.store.select(selectCourseDetailsLoaded(action.id))),
          map(([id, loaded]): [string, boolean] => [id, loaded])
        )
      ),
      exhaustMap(([id, loaded]) =>
        loaded
          ? of([id, null])
          : this.CourseServices.get(`/api/Course/${id}/`).pipe(
              map((res): [string, CourseDetailsGetResponse] => [id, res]),
              catchError((error) => of({ error }))
            )
      ),
      map(([id, CourseDetails]: any) => {
        return CourseDetailsActions.CourseDetailLoaded({
          id,
          CourseDetails: CourseDetails,
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private CourseServices: HttpService,
    private store: Store
  ) {}
}
