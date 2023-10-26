import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memoize } from 'lodash';
import { CourseDetailsState } from '../reducers/course-details.reducers';

export const selectCourseDetailsState =
  createFeatureSelector<CourseDetailsState>('CourseDetails');
export const selectCourseDetailsContent = memoize((id: string) =>
  createSelector(selectCourseDetailsState, (state) => state?.CourseDetails[id])
);
export const selectCourseDetailsLoaded = memoize((id: string) =>
  createSelector(
    selectCourseDetailsState,
    (state) => state?.CourseDetails[id]?.loaded
  )
);
