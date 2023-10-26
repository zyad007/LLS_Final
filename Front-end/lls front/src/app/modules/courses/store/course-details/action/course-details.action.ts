import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CourseDetailsGetResponse } from '../../../models/courses-details';
import { ExperimentGetResponse } from '../../../models/experiment';

export const loadCourseDetail = createAction(
  '[CourseDetail Component] load Course detail ',
  props<{ id: string }>()
);
export const CourseDetailLoaded = createAction(
  '[CourseDetail Effect] Course Detail  Loaded',
  props<{ CourseDetails: CourseDetailsGetResponse; id: string }>()
);
export const CourseDetailFail = createAction(
  '[CourseDetail Effect] Course Detail  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);

