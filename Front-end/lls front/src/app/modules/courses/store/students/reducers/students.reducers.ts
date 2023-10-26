import { createReducer, on } from '@ngrx/store';
import { Students } from '../../../models/students';
import { StudentActions } from '../action/students-type';

export const initState: Students = {};
export const StudentPageReducer = createReducer(
  initState,
  on(StudentActions.StudentPageLoaded, (state, action) =>
    action
      ? {
          ...state,
          ...action.Students,
        }
      : state
  ),
  on(StudentActions.StudentNextLoaded, (state, action) => {
    if (action.Students) {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.currntPage]: action.Students,
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
  on(StudentActions.StudentSubmited, (state, action): any => {
    let currentPage: any = 1;
    try {
      currentPage = state[action.courseId].currentPage;
    } catch {
      currentPage = 1;
    }

    return action
      ? {
          ...state,
          [action.courseId]: {
            ...state[action.courseId],
            [currentPage]: {
              ...state?.[action.courseId]?.[currentPage],
              data: {
                ...state?.[action.courseId]?.[currentPage]?.data,
                result: [
                  ...state?.[action.courseId]?.[currentPage].data.result,
                  ...action.Students,
                ],
              },
            },
          },
        }
      : state;
  })
);
