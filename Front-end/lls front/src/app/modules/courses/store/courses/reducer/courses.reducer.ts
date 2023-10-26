import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { CourseOnePage } from '../../../models/courses';
import { CoursesPageActions } from '../action/course-type';

export const initState: CourseOnePage = {
  currentPage: 1,
};
export const CoursesPageReducer = createReducer(
  initState,
  on(CoursesPageActions.CoursesPageLoaded, (state, action) =>
    action.Courses
      ? {
          ...state,
          [action.currentPage]: action.Courses,
          currentPage: action.currentPage,
        }
      : state
  ),

  on(CoursesPageActions.CoursesNextLoaded, (state, action) => {
    if (action.Courses) {
      return {
        ...state,
        [action.currentPage]: action.Courses,
        currentPage: action.currentPage,
      };
    } else {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
  }),
  on(CoursesPageActions.CoursesEdited, (state, action) => {
    const newDict = cloneDeep(state);
    const index = newDict?.[state.currentPage]?.data?.result?.findIndex(
      (val) => {
        return val.idd === action.Course.idd;
      }
    )!;
    let data = newDict?.[state?.currentPage]?.data?.result.splice(
      index,
      1,
      action.Course
    )!;
    return action
      ? {
          ...state,
          ...newDict,
        }
      : state;
  }),
  on(CoursesPageActions.yourCourseDeleted, (state, action) => {
    const newDict = cloneDeep(state);
    newDict[state.currentPage].data.result = newDict?.[
      state?.currentPage
    ]?.data?.result?.filter((val) => {
      return val.idd !== action.CourseId;
    });
    return {
      ...state,
      ...newDict,
    };
  }),
  on(CoursesPageActions.CoursesSubmited, (state, action) => {
    const newDict = cloneDeep(state);
    newDict?.[state?.currentPage]?.data?.result.push(action.data);
    return action
      ? {
          ...state,
          ...newDict,
        }
      : state;
  })
);
