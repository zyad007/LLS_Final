import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import {
  CourseDetailsGetResponse,
  CourseDetailsResponse,
} from '../../../models/courses-details';
import { CourseDetailsActions } from '../action/course-details-type';

export interface CourseDetailsState {
  CourseDetails: CourseDetailsResponse;
}
export const initState: CourseDetailsState = {
  CourseDetails: {},
};

export const CourseDetailsReducer = createReducer(
  initState,
  on(CourseDetailsActions.CourseDetailLoaded, (state, action) => {
    const newDictionrey: { [key: string]: CourseDetailsGetResponse } =
      cloneDeep(state.CourseDetails);
    newDictionrey[action.id] = { ...action.CourseDetails, loaded: true };
    return action.CourseDetails
      ? {
          ...state,
          CourseDetails: newDictionrey,
        }
      : { ...state };
  })
);
