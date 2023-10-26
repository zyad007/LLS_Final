import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Teachers } from '../../../models/teachers';
import { TeacherActions } from '../action/teachers-type';

export const initState: Teachers = {};
export const TeacherPageReducer = createReducer(
  initState,
  on(TeacherActions.TeacherPageLoaded, (state, action) =>
    action
      ? {
          ...state,
          ...action.Teachers,
        }
      : state
  ),
  on(TeacherActions.TeacherNextLoaded, (state, action) => {
    if (action.Teachers) {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.currntPage]: action.Teachers,
          currentPage: action.currntPage,
        },
      };
    } else {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          currentPage: action.currntPage,
        },
      };
    }
  }),
  on(TeacherActions.TeacherSubmited, (state, action) => {
    const newDict = cloneDeep({ ...state });
     newDict?.[action?.courseId]?.[
      state[action.courseId].currentPage
    ]?.data?.result.push(action.Teachers);
    return action
      ? {
          ...state,
        ...newDict,
        }
      : state;
  })
);
